import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, Bell, User, LogOut, CheckCircle, Calendar, Clock, 
  MapPin, Phone, Star, AlertCircle, Coins, DollarSign
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import SkoopaLogo from "@/components/SkoopaLogo";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

// Simplified MaidDashboard component
const MaidDashboard = () => {
  const navigate = useNavigate();
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
    toast({
      title: checked ? "You are now available" : "You are now unavailable",
      description: checked ? "You will receive new job requests" : "You will not receive new job requests",
    });
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
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center justify-between">
          <SkoopaLogo />
          <Link to="/maid/notifications" className="relative p-2">
            <Bell size={28} className="text-charcoal" />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-coral text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
          </Link>
        </div>
      </div>

      {/* Maid Profile Card */}
      <div className="p-4 bg-gradient-to-r from-azure/20 to-white">
        <div className="bg-white rounded-xl shadow-md border border-smoke p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-2 border-coral">
              <AvatarImage src={maidData.image} alt={maidData.name} />
              <AvatarFallback>{maidData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-charcoal">{maidData.name}</h2>
              <div className="flex items-center gap-1 text-lg">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span className="font-bold text-amber-500">{maidData.rating}</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Coins className="w-4 h-4 text-gold" />
                <span className="text-gold font-medium">{maidData.skoops} Skoops</span>
                <span className="text-sapphire bg-azure/20 px-2 py-0.5 rounded-full text-xs font-medium">Level {maidData.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Large Availability Toggle */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md border border-smoke overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-coral/20 to-coral/5 border-b border-smoke">
            <h3 className="text-xl font-bold text-center text-sapphire">Your Availability</h3>
          </div>
          <div className="p-6 flex flex-col items-center">
            <div className="text-lg mb-2 font-medium">
              {isAvailable ? "You are AVAILABLE for work" : "You are NOT AVAILABLE for work"}
            </div>
            <div className="my-4 flex items-center gap-4">
              <span className={`text-lg ${!isAvailable ? "font-bold text-red-600" : "text-steel"}`}>
                Unavailable
              </span>
              <Switch 
                checked={isAvailable} 
                onCheckedChange={handleAvailabilityToggle}
                className="scale-150 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              />
              <span className={`text-lg ${isAvailable ? "font-bold text-green-600" : "text-steel"}`}>
                Available
              </span>
            </div>
            <p className={`text-center text-sm ${isAvailable ? "text-green-600" : "text-red-600"}`}>
              {isAvailable 
                ? "Customers can now book you for jobs" 
                : "You will not receive any new job requests"}
            </p>
          </div>
        </div>
      </div>

      {/* Skoops Explanation */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md border border-smoke overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-gold/20 to-gold/5 border-b border-smoke">
            <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <Coins className="w-5 h-5 text-gold" />
              <span className="text-charcoal">Skoops Rewards</span>
            </h3>
          </div>
          <div className="p-4">
            <div className="bg-gold/10 p-3 rounded-lg mb-4">
              <p className="text-center font-medium">You have {maidData.skoops} Skoops</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500 w-7 h-7 flex-shrink-0" />
                <p className="text-steel text-base">Earn more Skoops with good customer reviews</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500 w-7 h-7 flex-shrink-0" />
                <p className="text-steel text-base">High attendance gives you bonus Skoops</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500 w-7 h-7 flex-shrink-0" />
                <p className="text-steel text-base">Stay loyal to get monthly Skoop rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Jobs */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md border border-smoke overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-sapphire/20 to-sapphire/5 border-b border-smoke">
            <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-sapphire" />
              <span className="text-sapphire">Today's Jobs</span>
            </h3>
          </div>
          
          {upcomingJobs.length > 0 ? (
            <div className="divide-y divide-smoke">
              {upcomingJobs.map((job) => (
                <div key={job.id} className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-charcoal">{job.customerName}</h4>
                    <div className="bg-coral/10 text-coral px-3 py-1 rounded-full text-lg font-bold">
                      {job.amount}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-6 h-6 text-steel" />
                    <div className="text-lg">{job.time}</div>
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-steel flex-shrink-0 mt-1" />
                    <div className="text-steel text-lg">{job.address}</div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-sapphire hover:bg-sapphire/90 text-white text-lg py-6 font-bold" onClick={() => navigate(`/maid/job/${job.id}`)}>
                      Get Directions
                    </Button>
                    <Button variant="outline" className="flex-1 border-sapphire text-sapphire text-lg py-6 font-bold">
                      <Phone className="w-5 h-5 mr-2" /> Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-smoke mx-auto mb-4" />
              <p className="text-xl text-steel">No jobs scheduled for today</p>
            </div>
          )}
        </div>
      </div>

      {/* Earnings Card */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md border border-smoke overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-coral/20 to-coral/5 border-b border-smoke">
            <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <DollarSign className="w-5 h-5 text-coral" />
              <span className="text-coral">Your Earnings</span>
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-smoke p-4">
                <p className="text-center text-sm text-steel mb-1">Today</p>
                <p className="text-xl font-bold text-center text-charcoal">{maidData.earnings.today}</p>
              </div>
              <div className="bg-white rounded-xl border border-smoke p-4">
                <p className="text-center text-sm text-steel mb-1">Week</p>
                <p className="text-xl font-bold text-center text-charcoal">{maidData.earnings.week}</p>
              </div>
              <div className="bg-white rounded-xl border border-smoke p-4">
                <p className="text-center text-sm text-steel mb-1">Month</p>
                <p className="text-xl font-bold text-center text-charcoal">{maidData.earnings.month}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="p-4 pt-8">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => navigate("/maid/profile")}
            variant="outline" 
            className="py-8 text-lg font-medium border-2"
          >
            <User className="w-6 h-6 mr-2" /> My Profile
          </Button>
          <Button 
            onClick={handleLogout}
            variant="destructive" 
            className="py-8 text-lg font-medium"
          >
            <LogOut className="w-6 h-6 mr-2" /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaidDashboard;
