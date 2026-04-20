import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import Services from './pages/Services';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Certificates from './pages/Certificates';
import About from './pages/About';
import Contact from './pages/Contact';

// 🔥 NEW AUTH PAGES
import Login from './pages/Login';
import Register from './pages/Register';

// Admin / Owner Pages
import AdminLogin from './pages/AdminLogin';
import OwnerLogin from './pages/OwnerLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import OwnerDashboard from './pages/owner/OwnerDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
          <Route path="/courses/:category" element={<PublicLayout><Courses /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/certificates" element={<PublicLayout><Certificates /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* 🔥 AUTH ROUTES (WITH NAVBAR) */}
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

          {/* ADMIN ROUTES */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* OWNER ROUTES */}
          <Route path="/owner-login" element={<OwnerLogin />} />
          <Route path="/owner/*" element={<OwnerDashboard />} />

        </Routes>

      </div>
    </Router>
  );
}

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </>
);

export default App;