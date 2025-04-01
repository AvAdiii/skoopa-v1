
import { ArrowLeft, ChevronRight, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerBottomNav from "@/components/CustomerBottomNav";
import SkoopaLogo from "@/components/SkoopaLogo";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const ProfileSection = ({ children, title }: { children: React.ReactNode, title?: string }) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {title && (
        <h2 className="text-sm font-medium text-steel mb-2 uppercase tracking-wider">{title}</h2>
      )}
      <Card className="overflow-hidden bg-gradient-to-br from-white to-azure/20 shadow-md">
        <CardContent className="p-0">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProfileItem = ({ icon, label, value, onClick }: { icon: React.ReactNode, label: string, value?: string, onClick?: () => void }) => {
  return (
    <motion.button 
      className="w-full flex items-center justify-between p-4 border-b border-smoke/50 last:border-b-0 hover:bg-azure/10 transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(211,231,255,0.2)" }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-azure to-coral/20 flex items-center justify-center text-sapphire shadow-sm">
          {icon}
        </div>
        <div className="text-left">
          <p className="text-charcoal font-medium">{label}</p>
          {value && <p className="text-sm text-steel">{value}</p>}
        </div>
      </div>
      <ChevronRight size={18} className="text-coral" />
    </motion.button>
  );
};

const Profile = () => {
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("skoopa-user");
    
    // Force page reload to ensure App.tsx picks up the logout state change
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-azure/10 pb-24">
      {/* Header */}
      <motion.div 
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm p-4 border-b border-smoke/50 shadow-sm"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sapphire hover:text-coral transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold bg-gradient-to-r from-sapphire to-coral bg-clip-text text-transparent">Profile</h1>
          </div>
          <Link to="/" className="text-coral hover:text-sapphire transition-colors">
            <Settings size={22} />
          </Link>
        </div>
      </motion.div>

      <div className="p-5">
        {/* User Profile Card */}
        <motion.div 
          className="mb-6 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-24 bg-indian-pattern opacity-10 rounded-t-lg"></div>
          <Card className="bg-gradient-to-br from-white to-azure/20 border-none shadow-lg">
            <CardContent className="pt-6 pb-6 px-4">
              <div className="flex flex-col items-center relative">
                <div className="absolute top-0 right-0">
                  <button className="text-coral hover:text-sapphire p-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </button>
                </div>
                
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg mb-4 bg-gradient-to-br from-azure to-coral/40">
                  <AvatarFallback className="bg-gradient-to-br from-azure to-coral/40 text-sapphire text-2xl font-bold">
                    RK
                  </AvatarFallback>
                </Avatar>
                
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-charcoal mb-1">Ravi Kumar</h2>
                  <p className="text-steel">+91 98765 43210</p>
                  
                  <motion.button 
                    className="mt-4 py-2 px-5 rounded-full bg-gradient-to-r from-coral to-coral/80 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit Profile
                  </motion.button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Section */}
        <ProfileSection title="Account Settings">
          <ProfileItem 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
              <path d="M2 12h2"/>
              <path d="M20 12h2"/>
              <path d="M12 2v2"/>
              <path d="M12 20v2"/>
            </svg>}
            label="My Addresses"
            value="2 saved addresses"
            onClick={() => console.log("Addresses")}
          />
          <ProfileItem 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>}
            label="Favorite Maids"
            value="3 favorites"
            onClick={() => console.log("Favorites")}
          />
          <ProfileItem 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6Z"/>
              <path d="M3 6h2"/>
              <path d="M19 6h2"/>
              <path d="M5 12H1"/>
              <path d="M23 12h-4"/>
              <path d="m7 3 1.5 1.5"/>
              <path d="M15.5 4.5 17 3"/>
            </svg>}
            label="Payment Methods"
            value="UPI, Credit Card"
            onClick={() => console.log("Payment")}
          />
        </ProfileSection>

        {/* Support Section */}
        <ProfileSection title="Help & Information">
          <ProfileItem 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>}
            label="Help & Support"
            onClick={() => console.log("Help")}
          />
          <ProfileItem 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 17v.01"/>
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            </svg>}
            label="About Skoopa"
            onClick={() => console.log("About")}
          />
        </ProfileSection>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button 
            className="w-full flex items-center justify-center gap-2 py-3.5 mt-6 rounded-lg bg-gradient-to-r from-red-500/90 to-red-400/90 text-white font-medium shadow-md hover:shadow-lg"
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </motion.button>
        </motion.div>

        {/* App version */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center bg-white/50 px-3 py-1.5 rounded-full shadow-sm">
            <SkoopaLogo variant="icon" className="w-5 h-5 mr-2" />
            <span className="text-xs text-steel">Version 1.0.0</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Profile;
