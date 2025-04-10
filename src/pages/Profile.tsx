
import { ArrowLeft, ChevronRight, LogOut, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomerBottomNav from "@/components/CustomerBottomNav";
import SkoopaLogo from "@/components/SkoopaLogo";
import { toast } from "@/hooks/use-toast";

const ProfileSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-lg border border-smoke overflow-hidden mb-4">
      {children}
    </div>
  );
};

const ProfileItem = ({ icon, label, value, onClick }: { icon: React.ReactNode, label: string, value?: string, onClick?: () => void }) => {
  return (
    <button 
      className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-azure flex items-center justify-center text-sapphire">
          {icon}
        </div>
        <div className="text-left">
          <p className="text-charcoal font-medium">{label}</p>
          {value && <p className="text-sm text-steel">{value}</p>}
        </div>
      </div>
      <ChevronRight size={18} className="text-steel" />
    </button>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("skoopa-user");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    // Redirect to login page
    window.location.href = "/login";
  };

  // Get user data
  const getUserData = () => {
    try {
      const userData = localStorage.getItem("skoopa-user");
      if (userData) {
        return JSON.parse(userData);
      }
    } catch (error) {
      console.error("Error parsing user data", error);
    }
    return { firstName: "Guest", lastName: "", phoneNumber: "" };
  };

  const user = getUserData();
  
  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  
  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sapphire">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-lg font-bold text-sapphire">Profile</h1>
          </div>
          <button 
            onClick={handleSettings}
            className="text-coral"
          >
            <Settings size={22} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* User Profile */}
        <div className="flex flex-col items-center py-6 bg-white rounded-lg border border-smoke mb-6">
          <div className="w-20 h-20 rounded-full bg-azure flex items-center justify-center text-sapphire mb-3">
            <User size={36} />
          </div>
          <h2 className="text-xl font-bold text-charcoal">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-steel">{user.phoneNumber}</p>
          <button 
            className="mt-3 py-1.5 px-4 rounded-full border border-coral text-coral text-sm font-medium hover:bg-coral/5 transition-colors"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </div>

        {/* Account Section */}
        <ProfileSection>
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
            onClick={() => navigate("/my-addresses")}
          />
          <ProfileItem 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>}
            label="Favorite Maids"
            value="3 favorites"
            onClick={() => navigate("/favorite-maids")}
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
            onClick={() => navigate("/add-payment-method")}
          />
        </ProfileSection>

        {/* Support Section */}
        <ProfileSection>
          <ProfileItem 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>}
            label="Help & Support"
            onClick={() => navigate("/help-support")}
          />
          <ProfileItem 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 17v.01"/>
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            </svg>}
            label="About Skoopa"
            onClick={() => navigate("/about")}
          />
        </ProfileSection>

        {/* Logout */}
        <button 
          className="w-full flex items-center justify-center gap-2 py-3 mt-6 bg-white rounded-lg border border-red-300 text-red-500 font-medium hover:bg-red-50 transition-colors"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        {/* App version */}
        <div className="flex flex-col items-center mt-8 gap-1">
          <div className="flex items-center">
            <SkoopaLogo variant="icon" className="w-6 h-6 mr-2" />
            <span className="text-sm text-steel">Made in India</span>
          </div>
          <span className="text-xs text-steel">Created with ❤️ in Hyderabad</span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Profile;
