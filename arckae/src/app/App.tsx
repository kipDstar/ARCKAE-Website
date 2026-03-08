import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Destinations from './pages/Destinations';
import Location from './pages/Location';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import StaffGate from './pages/StaffGate';
import StaffLogin from './pages/StaffLogin';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/staff" element={<StaffGate />} />
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
