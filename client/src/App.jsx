import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext";
import { SiteSettingsProvider } from "./context/SiteSettingsContext";

import PublicHeader from "./components/PublicHeader";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import DestinationsPage from "./pages/DestinationsPage";
import OffersPage from "./pages/OffersPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import MyAccount from "./pages/MyAccount";
import DestinationDetails from "./pages/DestinationDetails";
import ExperienceDetails from "./pages/ExperienceDetails";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import NotFoundPage from "./pages/NotFoundPage";

function AppLayout() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="app">
      {!isAdminPage && <PublicHeader />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />

        <Route path="/experiences/:id" element={<ExperienceDetails />} />

        <Route path="/offers" element={<OffersPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <SiteSettingsProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </SiteSettingsProvider>
    </LanguageProvider>
  );
}

export default App;
