import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import MaidDashboard from "./pages/maid/MaidDashboard";
import MaidLogin from "./pages/MaidLogin";
import EditLocation from "./pages/EditLocation";
import Notifications from "./pages/Notifications";
import MaidNotifications from "./pages/maid/MaidNotifications";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import Service from "./pages/Service";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/maid" element={<MaidDashboard />} />
            <Route path="/maid-login" element={<MaidLogin />} />
            <Route path="/edit-location" element={<EditLocation />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/maid/notifications" element={<MaidNotifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/search" element={<Search />} />
            <Route path="/service/:serviceId" element={<Service />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
