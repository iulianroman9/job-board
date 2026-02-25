import "./Contact.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../utils/supabase";

function Contact() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let basicErrors = {};

    if (!formData.email) {
      basicErrors.email = "Email is required.";
    }
    if (formData.subject.length < 10 || formData.subject.length > 50) {
      basicErrors.subject = "Subject must be between 10 and 50 characters.";
    }
    if (formData.message.length < 10 || formData.message.length > 300) {
      basicErrors.message = "Message must be between 10 and 300 characters.";
    }

    if (Object.keys(basicErrors).length > 0) {
      setErrors(basicErrors);
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setFormData({ email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setServerError(err.message);
    }
  };

  return (
    <div className="contact-page">
      <nav className="contact-nav">
        <button onClick={handleGoBack} className="contact-back-btn">
          &larr; Go Back
        </button>
      </nav>

      <div className="contact-container">
        <h2>Message us</h2>
        <p className="contact-subtitle">Have a question? Send us a message!</p>

        {status === "success" && (
          <div className="alert success">
            Your message has been sent successfully! We will get back to you
            soon.
          </div>
        )}

        {status === "error" && (
          <div className="alert error">
            Failed to send message: {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="Brief description"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? "input-error" : ""}
            />
            {errors.subject && (
              <div className="error-text">{errors.subject}</div>
            )}
            <div className="char-count">{formData.subject.length}/50</div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? "input-error" : ""}
            />
            {errors.message && (
              <div className="error-text">{errors.message}</div>
            )}
            <div className="char-count">{formData.message.length}/300</div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
