import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import Landing from "./components/Home";
import Jobs from "./components/Jobs";
import Contact from "./components/Contact";
import JobDetails from "./components/JobDetails";
import Login from "./components/Login";
import Admin from "./components/Admin";
import store from "./store/store";

const adminMiddleware = () => {
  const state = store.getState();
  const { isAdmin } = state.auth;

  if (!isAdmin) {
    return redirect("/jobs");
  }
};

const loginMiddleware = () => {
  const state = store.getState();
  const { isLoggedIn, isAdmin } = state.auth;

  if (isLoggedIn) {
    if (isAdmin) {
      return redirect("/admin");
    } else {
      return redirect("/jobs");
    }
  }

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Landing,
      },
      {
        path: "jobs",
        Component: Jobs,
      },
      {
        path: "/jobs/:id",
        Component: JobDetails,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "/admin",
        Component: Admin,
        loader: adminMiddleware,
      },
      {
        path: "/login",
        Component: Login,
        loader: loginMiddleware,
      },
      {
        path: "*",
        element: <div className="error-message">404 not found.</div>,
      },
    ],
  },
]);

export default router;
