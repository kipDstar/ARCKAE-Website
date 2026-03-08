import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopOnMount from "./ScrollToTopOnMount";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTopOnMount />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}