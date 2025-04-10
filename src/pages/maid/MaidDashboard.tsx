import { useState } from "react";
import { ArrowLeft, Bell, Calendar, Home, MapPin, User, ChevronRight, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SkoopaLogo from "@/components/SkoopaLogo";

// MaidDashboard component
const MaidDashboard = () => {
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
    // Making sure this is a string instead of a string array
    image: "/path/to/profile-image.jpg"
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
      amount: "₹350"
    },
    {
      id: "2",
      customerName: "Priya Patel",
      address: "45, Sunrise Residency, Indiranagar, Bengaluru",
      time: "2:30 PM",
      date: "Today",
      serviceType: "Kitchen Cleaning",
      duration: "2 hours",
      amount: "₹450"
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

      {/* Maid Availability */}
      <div className="bg-coral/5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sapphire font-bold">Availability</h2>
          <button
            className={`px-4 py-2 rounded-full font-medium text-sm ${
              isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
            onClick={() => setIsAvailable(!isAvailable)}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </button>
        </div>
      </div>

      {/* Maid Profile */}
      <motion.div
        className="p-4 flex items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={maidProfile.image}
          alt={maidProfile.name}
          className="w-16 h-16 rounded-full object-cover"
        />
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
              <div key={job.id} className="bg-white rounded-xl border border-smoke p-4">
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
          {/* Earnings Chart (Placeholder) */}
          <div className="bg-white rounded-xl border border-smoke p-4">
            <h3 className="font-medium text-charcoal mb-2">Earnings Chart</h3>
            <p className="text-sm text-steel">Visual representation of your earnings over the past week.</p>
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
              <img
                src={maidProfile.image}
                alt={maidProfile.name}
                className="w-12 h-12 rounded-full object-cover"
              />
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
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MaidDashboard;
