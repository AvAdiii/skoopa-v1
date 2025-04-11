
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import MaidHeader from "@/components/maid/MaidHeader";
import MaidProfile from "@/components/maid/MaidProfile";
import AvailabilityToggle from "@/components/maid/AvailabilityToggle";
import TodaysJobs from "@/components/maid/TodaysJobs";
import EarningsCard from "@/components/maid/EarningsCard";
import BottomActions from "@/components/maid/BottomActions";

// Simplified MaidDashboard component
const MaidDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [maidData, setMaidData] = useState({
    name: "Lakshmi Devi",
    rating: 4.8,
    level: 3,
    jobsCompleted: 124,
    skoops: 230,
    earnings: {
      today: "₹650",
      week: "₹3,250",
      month: "₹12,500"
    },
    image: "https://ui-avatars.com/api/?name=Lakshmi+Devi&background=FFC0CB&color=800080&size=256"
  });
  
  const [upcomingJobs, setUpcomingJobs] = useState([
    {
      id: "1",
      customerName: "Rahul Sharma",
      address: "123, Green Valley Apartments, Koramangala, Bengaluru",
      time: "10:00 AM",
      date: "Today",
      amount: "₹350",
    },
    {
      id: "2",
      customerName: "Priya Patel",
      address: "45, Sunrise Residency, Indiranagar, Bengaluru",
      time: "2:30 PM",
      date: "Today",
      amount: "₹450",
    }
  ]);
  
  useEffect(() => {
    // Get maid data from localStorage if available
    const storedMaid = localStorage.getItem("skoopa-maid");
    if (storedMaid) {
      try {
        const maid = JSON.parse(storedMaid);
        if (maid && maid.skoops) {
          setMaidData(prev => ({
            ...prev,
            skoops: maid.skoops || 230,
            level: maid.skoop_level || 3
          }));
        }
      } catch (error) {
        console.error("Error parsing maid data:", error);
      }
    }
  }, []);
  
  // Handle availability toggle
  const handleAvailabilityToggle = (checked: boolean) => {
    setIsAvailable(checked);
  };
  
  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("skoopa-maid");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    // Redirect to login page
    window.location.href = "/maid-login";
  };

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <MaidHeader 
        notificationCount={3} 
        skoops={maidData.skoops} 
        level={maidData.level}
      />

      {/* Maid Profile Card */}
      <MaidProfile 
        name={maidData.name}
        rating={maidData.rating}
        skoops={maidData.skoops}
        level={maidData.level}
        image={maidData.image}
      />
      
      {/* Large Availability Toggle */}
      <AvailabilityToggle 
        initialAvailability={isAvailable} 
        onToggle={handleAvailabilityToggle}
      />

      {/* Today's Jobs */}
      <TodaysJobs jobs={upcomingJobs} />

      {/* Earnings Card */}
      <EarningsCard earnings={maidData.earnings} />

      {/* Bottom Action Buttons */}
      <BottomActions onLogout={handleLogout} />
    </div>
  );
};

export default MaidDashboard;
