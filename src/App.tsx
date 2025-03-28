
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
        setIsLoggedIn(userData.isLoggedIn);
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

    // Hide splash screen after a delay
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // If splash screen is showing, only render that
  if (showSplash) {
    return <SplashScreen />;
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
