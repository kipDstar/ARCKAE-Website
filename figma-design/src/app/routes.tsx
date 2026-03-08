import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import WeAlsoProvide from "./pages/WeAlsoProvide";
import Destinations from "./pages/Destinations";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import StudyOptions from "./pages/StudyOptions";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "we-also-provide", Component: WeAlsoProvide },
      { path: "destinations", Component: Destinations },
      { path: "location", Component: Location },
      { path: "contact", Component: Contact },
      { path: "faq", Component: FAQ },
      { path: "study-options", Component: StudyOptions },
      { path: "*", Component: NotFound },
    ],
  },
]);