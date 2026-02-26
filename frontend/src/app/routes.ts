import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Tours } from "./pages/Tours";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Root } from "./pages/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "tours", Component: Tours },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "profile", Component: Profile },
    ],
  },
]);
