
import { useState } from "react";
import { ArrowLeft, Bell, Calendar, Home, MapPin, User, ChevronRight, Phone, Clock, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SkoopaLogo from "@/components/SkoopaLogo";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// MaidDashboard component
const MaidDashboard = () => {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentTab, setCurrentTab] = useState<"jobs" | "earnings" | "profile">("jobs");
  
  // Fix for the type error - making sure the image property is a string, not string[]
  const maidProfile = {
    name: "Lakshmi Devi",
    rating: 4.8,
    level: 3,
    jobsCompleted: 124,
    earnings: {
      today: "₹650",
      week: "₹3,250",
      month: "₹12,500"
    },
    // Using a placeholder image
    image: "https://ui-avatars.com/api/?name=Lakshmi+Devi&background=FFC0CB&color=800080&size=256"
  };

  const upcomingJobs = [
    {
      id: "1",
      customerName: "Rahul Sharma",
      address: "123, Green Valley Apartments, Koramangala, Bengaluru",
      time: "10:00 AM",
      date: "Today",
      serviceType: "Regular Cleaning",
      duration: "1.5 hours",
      amount: "₹350",
      location: {
        lat: 12.9352,
        lng: 77.6245
      }
    },
    {
      id: "2",
      customerName: "Priya Patel",
      address: "45, Sunrise Residency, Indiranagar, Bengaluru",
      time: "2:30 PM",
      date: "Today",
      serviceType: "Kitchen Cleaning",
      duration: "2 hours",
      amount: "₹450",
      location: {
        lat: 12.9784,
        lng: 77.6408
      }
    }
  ];

  // Earnings data for charts
  const earningsData = [
    { day: "Mon", amount: 450 },
    { day: "Tue", amount: 550 },
    { day: "Wed", amount: 500 },
    { day: "Thu", amount: 650 },
    { day: "Fri", amount: 700 },
    { day: "Sat", amount: 850 },
    { day: "Sun", amount: 300 }
  ];
  
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

  // Job details popover
  const JobDetailsPopover = ({ job }: { job: typeof upcomingJobs[0] }) => (
    <PopoverContent className="w-80 p-0" align="center" side="top">
      <div className="p-4 border-b border-smoke">
        <h3 className="font-bold text-lg">{job.serviceType}</h3>
        <p className="text-sm text-steel">{job.date} at {job.time}</p>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm font-medium">Customer</p>
          <p className="text-sm">{job.customerName}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Address</p>
          <p className="text-sm">{job.address}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Duration</p>
          <p className="text-sm">{job.duration}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Payment</p>
          <p className="text-sm font-bold text-coral">{job.amount}</p>
        </div>
      </div>
      <div className="p-4 border-t border-smoke">
        <div className="bg-gray-200 rounded-lg h-[150px] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin size={32} className="text-coral" />
            <span className="text-xs font-medium bg-white px-2 py-1 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              View Map
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 flex gap-2">
        <button className="bg-coral text-white px-4 py-2 rounded-lg text-sm font-medium flex-1">
          Get Directions
        </button>
        <button className="border border-coral text-coral px-4 py-2 rounded-lg text-sm font-medium flex-1">
          Contact Customer
        </button>
      </div>
    </PopoverContent>
  );

  // Function to render the earnings bar chart
  const renderBarChart = () => (
    <div className="h-40 flex items-end justify-between gap-1 mt-4 px-2">
      {earningsData.map((data, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-end h-full">
            <div 
              className="w-8 bg-gradient-to-t from-coral to-gold rounded-t-lg relative overflow-hidden"
              style={{ 
                height: `${(data.amount / 850) * 100}%`,
                opacity: data.day === "Sun" ? 0.7 : 1
              }}
            >
              <div className="absolute bottom-1 left-0 right-0 text-center text-xs text-white font-bold">
                {data.amount}
              </div>
            </div>
          </div>
          <p className="text-xs text-steel mt-1">{data.day}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center justify-between">
          <SkoopaLogo />
          <div className="flex gap-3">
            <Link to="/maid/notifications" className="relative">
              <Bell size={24} className="text-charcoal" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-white rounded-full flex items-center justify-center text-xs">3</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Maid Availability with Large Switch */}
      <div className="bg-coral/5 p-4">
        <h2 className="text-sapphire font-bold text-center mb-3">Availability</h2>
        <div className="flex flex-col items-center justify-center gap-4 mb-2">
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-smoke shadow-sm">
            <span className={`text-sm ${!isAvailable ? "font-bold text-red-600" : "text-steel"}`}>
              Unavailable
            </span>
            <Switch 
              checked={isAvailable} 
              onCheckedChange={handleAvailabilityToggle}
              className="scale-150 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
            />
            <span className={`text-sm ${isAvailable ? "font-bold text-green-600" : "text-steel"}`}>
              Available
            </span>
          </div>
          <p className="text-center text-sm text-steel">
            {isAvailable 
              ? "You are currently available for new jobs" 
              : "You are currently not accepting new jobs"}
          </p>
        </div>
      </div>

      {/* Maid Profile */}
      <motion.div
        className="p-4 flex items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Avatar className="w-16 h-16 border-2 border-primary">
          <AvatarImage src={maidProfile.image} alt={maidProfile.name} />
          <AvatarFallback>{maidProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-charcoal">{maidProfile.name}</h2>
          <div className="flex items-center gap-1 text-sm text-amber-500">
            <span>{maidProfile.rating}</span>
            <span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 8.38 8.63 1.19 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
            </span>
            <span className="text-steel">Level {maidProfile.level}</span>
          </div>
          <p className="text-sm text-steel">Jobs Completed: {maidProfile.jobsCompleted}</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-around bg-smoke/20 p-2 rounded-full mx-4 my-6">
        <button
          className={`px-4 py-2 rounded-full font-medium text-sm ${
            currentTab === "jobs" ? "bg-white text-charcoal shadow" : "text-steel"
          }`}
          onClick={() => setCurrentTab("jobs")}
        >
          Jobs
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium text-sm ${
            currentTab === "earnings" ? "bg-white text-charcoal shadow" : "text-steel"
          }`}
          onClick={() => setCurrentTab("earnings")}
        >
          Earnings
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium text-sm ${
            currentTab === "profile" ? "bg-white text-charcoal shadow" : "text-steel"
          }`}
          onClick={() => setCurrentTab("profile")}
        >
          Profile
        </button>
      </div>

      {/* Jobs Tab Content */}
      {currentTab === "jobs" && (
        <motion.div
          className="p-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold text-sapphire mb-4">Upcoming Jobs</h2>
          <div className="space-y-4">
            {upcomingJobs.map((job) => (
              <Popover key={job.id}>
                <PopoverTrigger asChild>
                  <div className="bg-white rounded-xl border border-smoke p-4 cursor-pointer hover:border-azure transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-charcoal">{job.customerName}</h3>
                      <span className="text-sm text-steel">{job.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-steel mb-2">
                      <MapPin size={14} />
                      {job.address}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        {job.duration}
                      </div>
                      <div className="font-bold text-charcoal">{job.amount}</div>
                    </div>
                  </div>
                </PopoverTrigger>
                <JobDetailsPopover job={job} />
              </Popover>
            ))}
          </div>
        </motion.div>
      )}

      {/* Earnings Tab Content */}
      {currentTab === "earnings" && (
        <motion.div
          className="p-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold text-sapphire mb-4">Earnings</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-smoke p-3">
              <p className="text-xs text-steel">Today</p>
              <p className="text-xl font-bold text-charcoal">{maidProfile.earnings.today}</p>
            </div>
            <div className="bg-white rounded-xl border border-smoke p-3">
              <p className="text-xs text-steel">This Week</p>
              <p className="text-xl font-bold text-charcoal">{maidProfile.earnings.week}</p>
            </div>
            <div className="bg-white rounded-xl border border-smoke p-3">
              <p className="text-xs text-steel">This Month</p>
              <p className="text-xl font-bold text-charcoal">{maidProfile.earnings.month}</p>
            </div>
          </div>
          
          {/* Earnings Bar Chart */}
          <div className="bg-white rounded-xl border border-smoke p-4">
            <h3 className="font-medium text-charcoal mb-2">Weekly Earnings</h3>
            {renderBarChart()}
            <div className="mt-3 flex justify-between items-center">
              <p className="text-xs text-steel">Last 7 days</p>
              <p className="text-sm font-bold text-coral">Total: ₹4,000</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Profile Tab Content */}
      {currentTab === "profile" && (
        <motion.div
          className="p-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold text-sapphire mb-4">Profile</h2>
          <div className="bg-white rounded-xl border border-smoke p-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={maidProfile.image} alt={maidProfile.name} />
                <AvatarFallback>{maidProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-charcoal">{maidProfile.name}</h3>
                <p className="text-sm text-steel">Level {maidProfile.level}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-steel">
                  <User size={16} />
                  Personal Information
                </div>
                <ChevronRight size={18} className="text-steel" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-steel">
                  <Phone size={16} />
                  Contact Details
                </div>
                <ChevronRight size={18} className="text-steel" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-steel">
                  <MapPin size={16} />
                  Address
                </div>
                <ChevronRight size={18} className="text-steel" />
              </div>
            </div>
            
            {/* Logout Button */}
            <Button 
              variant="destructive" 
              className="w-full mt-6 flex items-center justify-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MaidDashboard;
