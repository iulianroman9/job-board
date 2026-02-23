import { createBrowserRouter } from "react-router";
import App from "./App";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";

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
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
]);

export default router;
