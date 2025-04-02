
import { useState } from "react";
import { 
  MapPin, Phone, Clock, CalendarDays, TrendingUp, 
  Award, LifeBuoy, BarChart3, Banknote, MapIcon, 
  ChevronRight, Star, Bell, Menu, Check, User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SkoopaLogo from "@/components/SkoopaLogo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
        className="bg-card rounded-3xl w-full max-w-md z-10 overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="gradient-primary p-6 text-white">
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
        <div className="p-6">
          <div className="bg-accent/10 rounded-2xl p-4 mb-6">
            <h4 className="font-medium text-lg mb-1">Service Details</h4>
            <p className="text-muted-foreground">{job.serviceType} - {job.duration}</p>
            <p className="font-bold text-2xl mt-2">{job.amount}</p>
          </div>
          
          {/* Location */}
          <div className="mb-6">
            <h4 className="font-medium text-lg mb-3 flex items-center gap-2">
              <MapPin size={18} />
              Location
            </h4>
            <p className="text-muted-foreground mb-3">{job.address}</p>
            
            {/* Map Placeholder */}
            <div className="h-48 bg-muted rounded-2xl flex items-center justify-center">
              <MapIcon size={32} className="text-muted-foreground" />
              <span className="ml-2 text-muted-foreground font-medium">Map View</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button variant="outline" onClick={onClose} className="h-12 text-base">
              Cancel
            </Button>
            <Button className="gradient-primary h-12 text-base">
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
        className="bg-card rounded-3xl w-full max-w-md z-10"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="bg-destructive p-6 text-white text-center">
          <h3 className="text-xl font-bold flex items-center justify-center gap-2">
            <LifeBuoy size={24} />
            Emergency Help
          </h3>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Call Support */}
            <Button 
              className="w-full h-16 text-lg justify-start gap-3 rounded-xl" 
              variant="outline"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Phone size={20} className="text-green-500" />
              </div>
              <span>Call Skoopa Support</span>
            </Button>
            
            {/* Call Police */}
            <Button 
              className="w-full h-16 text-lg justify-start gap-3 rounded-xl" 
              variant="outline"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Phone size={20} className="text-blue-500" />
              </div>
              <span>Call Police (100)</span>
            </Button>
            
            {/* Medical Emergency */}
            <Button 
              className="w-full h-16 text-lg justify-start gap-3 rounded-xl" 
              variant="outline"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Phone size={20} className="text-red-500" />
              </div>
              <span>Medical Help (108)</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-6 h-12 text-base"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Maid Dashboard Menu Component
const MaidDashboardMenu = ({ userName, isAvailable, setIsAvailable, onHelpClick }) => {
  return (
    <div className="flex flex-col h-full bg-card rounded-3xl p-6">
      <div className="flex items-center gap-3">
        <Avatar className="h-16 w-16 border-4 border-primary/20">
          <AvatarImage src="/placeholder.svg" alt={userName} />
          <AvatarFallback className="bg-accent text-2xl">{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{userName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="bg-green-100 text-green-700 border-0">Level 3</Badge>
            <div className="flex items-center">
              <Star size={14} className="fill-amber-500 text-amber-500" />
              <span className="text-sm ml-1">4.8</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-t border-b py-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Availability</p>
            <p className="text-sm text-muted-foreground">
              {isAvailable ? "You're available for new jobs" : "You're not available for jobs"}
            </p>
          </div>
          <Switch 
            checked={isAvailable} 
            onCheckedChange={setIsAvailable}
            className={`${isAvailable ? "bg-green-500" : "bg-muted"} transition-all duration-300 h-8 w-14`}
          />
        </div>
      </div>
      
      <div className="flex-1 mt-6 space-y-4">
        <Button variant="ghost" className="w-full justify-start text-base h-12">
          <User size={18} className="mr-2" /> My Profile
        </Button>
        <Button variant="ghost" className="w-full justify-start text-base h-12">
          <Award size={18} className="mr-2" /> Achievements
        </Button>
        <Button variant="ghost" className="w-full justify-start text-base h-12">
          <Bell size={18} className="mr-2" /> Notifications
        </Button>
        <Button variant="destructive" className="w-full justify-start text-base h-12 mt-auto" onClick={onHelpClick}>
          <LifeBuoy size={18} className="mr-2" /> Emergency Help
        </Button>
      </div>
    </div>
  );
};

// MaidDashboard component
const MaidDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentTab, setCurrentTab] = useState<"jobs" | "earnings" | "rewards">("jobs");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEmergencyHelp, setShowEmergencyHelp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
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
    image: "/placeholder.svg"
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
    <div className="min-h-screen bg-background pb-6">
      <AnimatePresence>
        {selectedJob && (
          <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
        
        {showEmergencyHelp && (
          <EmergencyHelpModal onClose={() => setShowEmergencyHelp(false)} />
        )}
        
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="absolute top-0 left-0 bottom-0 w-4/5 max-w-xs z-10"
              transition={{ type: "spring", damping: 25 }}
            >
              <MaidDashboardMenu 
                userName={maidProfile.name}
                isAvailable={isAvailable}
                setIsAvailable={setIsAvailable}
                onHelpClick={() => {
                  setMenuOpen(false);
                  setShowEmergencyHelp(true);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <motion.div 
        className="px-6 pt-6 pb-4 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} />
        </Button>
        
        <SkoopaLogo />
        
        <Button 
          variant="destructive" 
          size="icon" 
          className="rounded-full"
          onClick={() => setShowEmergencyHelp(true)}
        >
          <LifeBuoy size={20} />
        </Button>
      </motion.div>
      
      {/* Availability Switch Card - New Design with Sliding Effect */}
      <div className="px-6 mb-6">
        <motion.div 
          className="bg-card rounded-3xl p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">Work Status</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {isAvailable ? "You are available for jobs" : "You are not available for jobs"}
              </p>
            </div>
            
            <div className="relative h-8 w-16 rounded-full bg-muted flex items-center p-1" onClick={() => setIsAvailable(!isAvailable)}>
              <motion.div 
                className="absolute h-6 w-6 rounded-full bg-white shadow-sm flex items-center justify-center"
                animate={{ x: isAvailable ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isAvailable && <Check size={14} className="text-green-500" />}
              </motion.div>
              <div className={`absolute inset-0 rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-muted'}`} style={{zIndex: -1}}></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Cards Row */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="stat-card gradient-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white/80 text-sm">Today's Earnings</h3>
            <p className="text-white text-2xl font-bold mt-1">{maidProfile.earnings.today}</p>
            <div className="mt-2 flex items-center gap-1 text-white/80">
              <TrendingUp size={14} />
              <span className="text-xs">+15% from yesterday</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="stat-card gradient-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white/80 text-sm">Jobs Today</h3>
            <p className="text-white text-2xl font-bold mt-1">{upcomingJobs.length}</p>
            <div className="mt-2 flex items-center gap-1 text-white/80">
              <CalendarDays size={14} />
              <span className="text-xs">Upcoming</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Streak Card - Enhanced Visual Design */}
      <div className="px-6 mb-6">
        <motion.div 
          className="app-card p-5 border border-accent/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                <Award size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold">Work Streak</h3>
            </div>
            <Badge className="bg-accent text-accent-foreground px-3 py-1 text-sm">
              {maidProfile.streakDays} days
            </Badge>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4">
            Keep your streak going to earn bonuses! Next reward in {maidProfile.nextRewardIn} days.
          </p>
          
          {/* Progress Slider with Enhanced Visual Design */}
          <div className="mb-3">
            <Slider 
              defaultValue={[maidProfile.streakDays % 20]} 
              max={20} 
              step={1}
              disabled
              className="streak-slider"
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 days</span>
            <span>20 days (₹500 bonus)</span>
          </div>
        </motion.div>
      </div>
      
      {/* Tabs Navigation - Modern Design */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-2 flex justify-around shadow-sm">
          <Button
            variant="ghost"
            className={`rounded-xl flex-1 py-3 ${
              currentTab === "jobs" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setCurrentTab("jobs")}
          >
            <CalendarDays size={currentTab === "jobs" ? 18 : 16} className="mr-1" /> Jobs
          </Button>
          <Button
            variant="ghost"
            className={`rounded-xl flex-1 py-3 ${
              currentTab === "earnings" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setCurrentTab("earnings")}
          >
            <Banknote size={currentTab === "earnings" ? 18 : 16} className="mr-1" /> Earnings
          </Button>
          <Button
            variant="ghost"
            className={`rounded-xl flex-1 py-3 ${
              currentTab === "rewards" ? "bg-primary text-white" : ""
            }`}
            onClick={() => setCurrentTab("rewards")}
          >
            <Award size={currentTab === "rewards" ? 18 : 16} className="mr-1" /> Rewards
          </Button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="px-6">
        {/* Jobs Tab Content */}
        {currentTab === "jobs" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CalendarDays size={22} className="text-primary" />
              Today's Jobs
            </h2>
            
            {upcomingJobs.map((job) => (
              <motion.div
                key={job.id}
                className="app-card animated-card"
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {job.customerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{job.customerName}</h3>
                      <p className="text-sm text-muted-foreground">{job.serviceType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{job.amount}</p>
                    <p className="text-sm text-primary">{job.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-xl">
                  <MapPin size={16} className="shrink-0" />
                  <p className="truncate">{job.address}</p>
                </div>
                
                <Button 
                  className="w-full mt-4 h-12 rounded-xl gradient-primary text-base"
                >
                  View Job Details
                </Button>
              </motion.div>
            ))}
            
            {upcomingJobs.length === 0 && (
              <div className="bg-card rounded-3xl shadow p-8 text-center">
                <CalendarDays size={48} className="mx-auto text-muted-foreground opacity-50 mb-3" />
                <h3 className="font-medium text-lg">No Jobs Today</h3>
                <p className="text-muted-foreground mt-1">Enjoy your day off!</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Earnings Tab Content - Enhanced Visual Design */}
        {currentTab === "earnings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Banknote size={22} className="text-primary" />
              My Earnings
            </h2>
            
            {/* Weekly Chart with Modern Design */}
            <div className="app-card gradient-primary p-5">
              <h3 className="text-white/90 text-sm">Week's Overview</h3>
              <p className="text-white text-2xl font-bold mt-1">{maidProfile.earnings.week}</p>
              
              <div className="h-48 mt-4">
                <ChartContainer
                  config={{
                    earnings: {
                      label: "Earnings",
                      theme: {
                        light: "#FFFFFF",
                        dark: "#FFFFFF",
                      },
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={earningsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
                      <YAxis stroke="rgba(255,255,255,0.6)" />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <Bar 
                        dataKey="amount" 
                        fill="rgba(255,255,255,0.8)"
                        radius={[4, 4, 0, 0]}
                        name="earnings"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
            
            {/* Earnings Summary Card - Modern Design */}
            <div className="app-card">
              <h3 className="text-lg font-semibold mb-4">Earnings Summary</h3>
              
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="py-3">Today</TableCell>
                    <TableCell className="font-semibold text-right text-lg">{maidProfile.earnings.today}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-3">This Week</TableCell>
                    <TableCell className="font-semibold text-right text-lg">{maidProfile.earnings.week}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-3">This Month</TableCell>
                    <TableCell className="font-semibold text-right text-lg">{maidProfile.earnings.month}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Achievement Card - Fun and Engaging */}
            <div className="app-card gradient-accent">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <Star className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Star Performer!</h3>
                  <p className="text-white/80 text-sm">You're in the top 10% of earners this week</p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-white/90 text-center mb-2">Keep it up for a special bonus!</p>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={24} 
                      className={star <= 4 ? "text-white fill-white" : "text-white/30"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rewards Tab Content - Enhanced Visual Design */}
        {currentTab === "rewards" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award size={22} className="text-primary" />
              Rewards Program
            </h2>
            
            {/* Level Card - Modern Design */}
            <div className="app-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                  {maidProfile.level}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Level {maidProfile.level}</h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">{maidProfile.jobsCompleted}</span> jobs completed
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Progress to Level {maidProfile.level + 1}</p>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="gradient-primary h-3 rounded-full" 
                    style={{ width: '65%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Level {maidProfile.level}</span>
                  <span>Level {maidProfile.level + 1}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">Complete 26 more jobs to reach Level {maidProfile.level + 1}</p>
            </div>
            
            {/* Benefits List - Modern Design */}
            <div className="app-card">
              <h3 className="text-lg font-semibold mb-4">Your Benefits</h3>
              
              <div className="space-y-3">
                {levelBenefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl border flex items-center gap-4 ${
                      benefit.level <= maidProfile.level 
                        ? 'border-green-100 bg-green-50' 
                        : 'border-muted bg-muted/30'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      benefit.level <= maidProfile.level 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {benefit.level}
                    </div>
                    <div>
                      <p className={`font-medium ${
                        benefit.level <= maidProfile.level 
                          ? 'text-foreground' 
                          : 'text-muted-foreground'
                      }`}>
                        {benefit.benefit}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Level {benefit.level} benefit
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Special Reward Card - Modern Design */}
            <div className="app-card gradient-secondary">
              <h3 className="font-semibold text-white mb-3">Your Special Reward</h3>
              <p className="text-white/80 text-sm mb-4">Maintain your streak for 20 days to claim:</p>
              
              <div className="bg-white/10 rounded-xl p-5 text-center backdrop-blur-sm">
                <p className="font-bold text-2xl text-white">₹500 Bonus!</p>
                <p className="text-white/80 text-sm mt-2">4 days remaining to claim</p>
              </div>
              
              <Button className="w-full mt-4 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 text-white">
                View All Rewards
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MaidDashboard;
