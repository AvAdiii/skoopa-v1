
import { useState } from "react";
import { 
  MapPin, Phone, Clock, CalendarDays, TrendingUp, 
  Award, LifeBuoy, BarChart3, Banknote, MapIcon, 
  ChevronRight, Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SkoopaLogo from "@/components/SkoopaLogo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

// Job Details Modal Component
const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <motion.div
        className="bg-white rounded-xl w-full max-w-md z-10 overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-coral to-amber-400 p-4 text-white">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <CalendarDays size={24} />
            {job.customerName}'s Home
          </h3>
          <p className="text-white/90 flex items-center gap-1 mt-1">
            <Clock size={16} /> 
            {job.time}, {job.date}
          </p>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="bg-smoke/30 rounded-lg p-3 mb-4">
            <h4 className="font-medium text-charcoal mb-1">Service Details</h4>
            <p className="text-steel">{job.serviceType} - {job.duration}</p>
            <p className="font-bold text-lg mt-1">{job.amount}</p>
          </div>
          
          {/* Location */}
          <div className="mb-4">
            <h4 className="font-medium text-charcoal mb-2 flex items-center gap-2">
              <MapPin size={18} />
              Location
            </h4>
            <p className="text-steel text-sm">{job.address}</p>
            
            {/* Map Placeholder */}
            <div className="h-40 bg-azure rounded-lg mt-2 flex items-center justify-center">
              <MapIcon size={32} className="text-sapphire/50" />
              <span className="ml-2 text-sapphire/70 font-medium">Map View</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Get Directions
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Emergency Help Modal Component
const EmergencyHelpModal = ({ onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <motion.div
        className="bg-white rounded-xl w-full max-w-md z-10"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="bg-red-500 p-4 text-white text-center">
          <h3 className="text-xl font-bold flex items-center justify-center gap-2">
            <LifeBuoy size={24} />
            Emergency Help
          </h3>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="space-y-4">
            {/* Call Support */}
            <Button 
              className="w-full h-16 text-lg justify-start gap-3" 
              variant="outline"
            >
              <Phone size={24} className="text-green-500" />
              Call Skoopa Support
            </Button>
            
            {/* Call Police */}
            <Button 
              className="w-full h-16 text-lg justify-start gap-3" 
              variant="outline"
            >
              <Phone size={24} className="text-blue-500" />
              Call Police (100)
            </Button>
            
            {/* Medical Emergency */}
            <Button 
              className="w-full h-16 text-lg justify-start gap-3" 
              variant="outline"
            >
              <Phone size={24} className="text-red-500" />
              Medical Emergency (108)
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-4"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// MaidDashboard component
const MaidDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentTab, setCurrentTab] = useState<"jobs" | "earnings" | "profile">("jobs");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEmergencyHelp, setShowEmergencyHelp] = useState(false);
  
  // Fix for the type error - making sure the image property is a string, not string[]
  const maidProfile = {
    name: "Lakshmi Devi",
    rating: 4.8,
    level: 3,
    jobsCompleted: 124,
    streakDays: 16,
    nextRewardIn: 5,
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
  
  // Level system data
  const levelBenefits = [
    { level: 1, benefit: "Basic booking access" },
    { level: 2, benefit: "Priority bookings" },
    { level: 3, benefit: "10% bonus earnings" },
    { level: 4, benefit: "Flexible scheduling" },
    { level: 5, benefit: "Premium customer access" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-azure/30 pb-20">
      <AnimatePresence>
        {selectedJob && (
          <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
        
        {showEmergencyHelp && (
          <EmergencyHelpModal onClose={() => setShowEmergencyHelp(false)} />
        )}
      </AnimatePresence>
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <SkoopaLogo />
          <Button 
            variant="destructive" 
            size="sm" 
            className="rounded-full flex items-center gap-1"
            onClick={() => setShowEmergencyHelp(true)}
          >
            <LifeBuoy size={16} />
            <span className="font-medium">Help</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div 
            className="bg-gradient-to-br from-coral to-amber-400 rounded-xl p-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-medium text-white/90">Today's Earnings</h3>
            <p className="text-2xl font-bold">{maidProfile.earnings.today}</p>
            <div className="flex items-center gap-1 text-white/90 text-sm mt-1">
              <TrendingUp size={14} />
              <span>Level {maidProfile.level}</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-sapphire to-blue-400 rounded-xl p-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-medium text-white/90">Jobs Today</h3>
            <p className="text-2xl font-bold">{upcomingJobs.length}</p>
            <div className="flex items-center gap-1 text-white/90 text-sm mt-1">
              <CalendarDays size={14} />
              <span>Upcoming</span>
            </div>
          </motion.div>
        </div>
        
        {/* Availability Switch */}
        <Card className="mb-6 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg text-sapphire">Availability</h3>
                <p className="text-steel text-sm">
                  {isAvailable ? "You are available for new jobs" : "You are not available for new jobs"}
                </p>
              </div>
              <Switch 
                checked={isAvailable} 
                onCheckedChange={setIsAvailable}
                className={isAvailable ? "bg-green-500" : ""}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Streak Card */}
        <motion.div 
          className="mb-6 bg-white rounded-xl shadow-sm border border-smoke overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-sapphire flex items-center gap-2">
                <Award className="text-amber-500" size={20} />
                Work Streak
              </h3>
              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-sm font-medium">
                {maidProfile.streakDays} days
              </span>
            </div>
            
            <p className="text-steel text-sm mb-3">
              Keep your streak going for rewards! Next reward in {maidProfile.nextRewardIn} days.
            </p>
            
            {/* Progress Slider */}
            <div className="mb-2">
              <Slider 
                defaultValue={[maidProfile.streakDays % 20]} 
                max={20} 
                step={1}
                disabled
                className="streak-slider"
              />
            </div>
            
            <div className="flex justify-between text-xs text-steel">
              <span>0 days</span>
              <span>20 days</span>
            </div>
          </div>
        </motion.div>
        
        {/* Tabs */}
        <div className="flex justify-around bg-white p-2 rounded-full shadow-sm mb-6">
          <Button
            variant="ghost"
            className={`px-4 py-2 rounded-full font-medium text-sm ${
              currentTab === "jobs" ? "bg-coral text-white shadow" : "text-steel"
            }`}
            onClick={() => setCurrentTab("jobs")}
          >
            Jobs
          </Button>
          <Button
            variant="ghost"
            className={`px-4 py-2 rounded-full font-medium text-sm ${
              currentTab === "earnings" ? "bg-coral text-white shadow" : "text-steel"
            }`}
            onClick={() => setCurrentTab("earnings")}
          >
            Earnings
          </Button>
          <Button
            variant="ghost"
            className={`px-4 py-2 rounded-full font-medium text-sm ${
              currentTab === "profile" ? "bg-coral text-white shadow" : "text-steel"
            }`}
            onClick={() => setCurrentTab("profile")}
          >
            Rewards
          </Button>
        </div>

        {/* Jobs Tab Content */}
        {currentTab === "jobs" && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-sapphire mb-4 flex items-center gap-2">
              <CalendarDays size={22} />
              Today's Jobs
            </h2>
            
            {upcomingJobs.map((job) => (
              <motion.div
                key={job.id}
                className="bg-white rounded-xl shadow-md border border-smoke/50 p-4"
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-azure rounded-full flex items-center justify-center text-sapphire">
                      {job.customerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-charcoal">{job.customerName}</h3>
                      <p className="text-sm text-steel">{job.serviceType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-charcoal">{job.amount}</p>
                    <p className="text-sm text-coral">{job.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-steel bg-smoke/30 p-2 rounded-lg">
                  <MapPin size={14} className="shrink-0" />
                  <p className="truncate">{job.address}</p>
                </div>
                
                <div className="mt-3 flex justify-end">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="text-sapphire flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
            
            {upcomingJobs.length === 0 && (
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <CalendarDays size={40} className="mx-auto text-steel opacity-50 mb-2" />
                <h3 className="font-medium text-lg text-charcoal">No Jobs Today</h3>
                <p className="text-steel text-sm mt-1">Enjoy your day off!</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Earnings Tab Content */}
        {currentTab === "earnings" && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-sapphire mb-4 flex items-center gap-2">
              <Banknote size={22} />
              My Earnings
            </h2>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-none shadow">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-steel">This Week</h3>
                  <p className="text-2xl font-bold text-charcoal mt-1">{maidProfile.earnings.week}</p>
                  
                  <div className="h-48 mt-4">
                    <ChartContainer
                      config={{
                        earnings: {
                          label: "Earnings",
                          theme: {
                            light: "#FF6B6B",
                            dark: "#FF6B6B",
                          },
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={earningsData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                          />
                          <Bar 
                            dataKey="amount" 
                            fill="var(--color-earnings)"
                            radius={[4, 4, 0, 0]}
                            name="earnings"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
              <h3 className="text-lg font-medium text-sapphire mb-3">Earnings Summary</h3>
              
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Today</TableCell>
                    <TableCell className="font-medium text-right">{maidProfile.earnings.today}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>This Week</TableCell>
                    <TableCell className="font-medium text-right">{maidProfile.earnings.week}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>This Month</TableCell>
                    <TableCell className="font-medium text-right">{maidProfile.earnings.month}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Fun Achievement Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-md p-5 border border-amber-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Star className="text-amber-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-charcoal">Star Performer!</h3>
                  <p className="text-sm text-steel">You're in the top 10% of earners this week</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-sm text-steel">Keep it up for a special bonus!</p>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={20} 
                      className={star <= 4 ? "text-amber-500 fill-amber-500" : "text-smoke"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile/Rewards Tab Content */}
        {currentTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-sapphire mb-4 flex items-center gap-2">
              <Award size={22} />
              Rewards Program
            </h2>
            
            <Card className="mb-6 border-none shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral to-amber-400 flex items-center justify-center text-white text-xl font-bold">
                    {maidProfile.level}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Level {maidProfile.level}</h3>
                    <p className="text-sm text-steel">
                      <span className="text-coral font-medium">{maidProfile.jobsCompleted}</span> jobs completed
                    </p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-steel mb-2">Progress to Level {maidProfile.level + 1}</p>
                  <div className="w-full bg-smoke rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-coral to-amber-400 h-3 rounded-full" 
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-steel mt-1">
                    <span>Level {maidProfile.level}</span>
                    <span>Level {maidProfile.level + 1}</span>
                  </div>
                </div>
                
                <p className="text-sm text-steel">Complete 26 more jobs to reach Level {maidProfile.level + 1}</p>
              </CardContent>
            </Card>
            
            <div className="bg-white rounded-xl shadow-md p-5 mb-6">
              <h3 className="text-lg font-medium text-sapphire mb-3">Your Benefits</h3>
              
              <div className="space-y-3">
                {levelBenefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border flex items-center gap-3 ${
                      benefit.level <= maidProfile.level 
                        ? 'border-green-100 bg-green-50' 
                        : 'border-smoke bg-smoke/30'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      benefit.level <= maidProfile.level 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-smoke text-steel'
                    }`}>
                      {benefit.level}
                    </div>
                    <div>
                      <p className={`font-medium ${
                        benefit.level <= maidProfile.level 
                          ? 'text-charcoal' 
                          : 'text-steel'
                      }`}>
                        {benefit.benefit}
                      </p>
                      <p className="text-xs text-steel">
                        Level {benefit.level} benefit
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="bg-gradient-to-r from-azure to-blue-100 border-none shadow mb-6">
              <CardContent className="p-4 text-center">
                <h3 className="font-medium text-sapphire mb-2">Your Special Reward</h3>
                <p className="text-sm text-steel mb-3">Maintain your streak for 20 days to claim:</p>
                
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="font-bold text-xl text-coral">₹500 Bonus!</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MaidDashboard;
