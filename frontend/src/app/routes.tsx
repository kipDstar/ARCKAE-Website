import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import WeAlsoProvide from "./pages/WeAlsoProvide";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import StaffGate from "./pages/StaffGate";
import StaffLogin from "./pages/StaffLogin";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "we-also-provide", Component: WeAlsoProvide },
      { path: "location", Component: Location },
      { path: "contact", Component: Contact },
      { path: "faq", Component: FAQ },
      { path: "staff", Component: StaffGate },
      { path: "login", Component: StaffLogin },
      { path: "dashboard", Component: Dashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);