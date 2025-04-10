
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import SplashScreen from "./components/SplashScreen";
import Login from "./pages/Login";
import MaidLogin from "./pages/MaidLogin";
import MaidDashboard from "./pages/maid/MaidDashboard";
import ServiceBooking from "./pages/ServiceBooking";
import Bookings from "./pages/Bookings";
import Chat from "./pages/Chat";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import EditLocation from "./pages/EditLocation";
import AddPaymentMethod from "./pages/AddPaymentMethod";

// New placeholder pages for Profile section actions
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import MyAddresses from "./pages/MyAddresses";
import FavoriteMaids from "./pages/FavoriteMaids";
import HelpSupport from "./pages/HelpSupport";
import AboutSkoopa from "./pages/AboutSkoopa";

// New placeholder pages for Bookings actions
import RescheduleBooking from "./pages/RescheduleBooking";
import TrackBooking from "./pages/TrackBooking";
import ReviewBooking from "./pages/ReviewBooking";

// New placeholder pages for premium maids and other pages
import PremiumMaids from "./pages/PremiumMaids";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("skoopa-user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(!!userData.isLoggedIn);
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // If splash screen is showing, only render that
  if (showSplash) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" />
          <SplashScreen onFinish={handleSplashFinish} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path="/maid-login" element={<MaidLogin />} />
            
            {/* Protected customer routes */}
            <Route path="/" element={isLoggedIn ? <Index /> : <Navigate to="/login" />} />
            <Route path="/bookings" element={isLoggedIn ? <Bookings /> : <Navigate to="/login" />} />
            <Route path="/payments" element={isLoggedIn ? <Payments /> : <Navigate to="/login" />} />
            <Route path="/chat" element={isLoggedIn ? <Chat /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
            <Route path="/service/:serviceType" element={isLoggedIn ? <ServiceBooking /> : <Navigate to="/login" />} />
            
            {/* New routes */}
            <Route path="/edit-location" element={isLoggedIn ? <EditLocation /> : <Navigate to="/login" />} />
            <Route path="/add-payment-method" element={isLoggedIn ? <AddPaymentMethod /> : <Navigate to="/login" />} />
            <Route path="/edit-profile" element={isLoggedIn ? <EditProfile /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
            <Route path="/my-addresses" element={isLoggedIn ? <MyAddresses /> : <Navigate to="/login" />} />
            <Route path="/favorite-maids" element={isLoggedIn ? <FavoriteMaids /> : <Navigate to="/login" />} />
            <Route path="/help-support" element={isLoggedIn ? <HelpSupport /> : <Navigate to="/login" />} />
            <Route path="/about" element={isLoggedIn ? <AboutSkoopa /> : <Navigate to="/login" />} />
            <Route path="/reschedule-booking/:id" element={isLoggedIn ? <RescheduleBooking /> : <Navigate to="/login" />} />
            <Route path="/track-booking/:id" element={isLoggedIn ? <TrackBooking /> : <Navigate to="/login" />} />
            <Route path="/review-booking/:id" element={isLoggedIn ? <ReviewBooking /> : <Navigate to="/login" />} />
            <Route path="/premium-maids" element={isLoggedIn ? <PremiumMaids /> : <Navigate to="/login" />} />
            
            {/* Maid interface routes */}
            <Route path="/maid" element={<MaidDashboard />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
