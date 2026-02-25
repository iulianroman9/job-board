import { createBrowserRouter } from "react-router";
import App from "./App";
import Landing from "./components/Home";
import Jobs from "./components/Jobs";
import Contact from "./components/Contact";
import JobDetails from "./components/JobDetails";
import Login from "./components/Login";

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
        element: <div>Admin Portal</div>,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);

export default router;
