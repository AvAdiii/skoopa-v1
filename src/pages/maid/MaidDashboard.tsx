
import { useState, useEffect } from "react";
import { Bell, MapPin, Phone, Clock, Calendar, ChevronRight, DollarSign, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface JobRequest {
  id: string;
  customerName: string;
  address: string;
  distance: string;
  serviceType: string;
  time: string;
  price: string;
  expiresIn: number; // in seconds
}

interface Task {
  id: string;
  customerName: string;
  address: string;
  serviceType: string;
  time: string;
  status: "upcoming" | "completed";
  rating?: number;
  price: string;
}

const MaidDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentJobRequest, setCurrentJobRequest] = useState<JobRequest | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [earnings, setEarnings] = useState({
    today: "₹450",
    thisWeek: "₹3,120",
    thisMonth: "₹12,780",
    level: 2,
    progress: 65, // percentage to next level
    tasksToNextLevel: 12
  });
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      customerName: "Priya Sharma",
      address: "123, Green Valley Apartments, Koramangala",
      serviceType: "Kitchen Cleaning",
      time: "2:00 PM Today",
      status: "upcoming",
      price: "₹349"
    },
    {
      id: "2",
      customerName: "Arjun Mehta",
      address: "456, Maple Residency, Indiranagar",
      serviceType: "Daily Cleaning",
      time: "9:00 AM Today",
      status: "completed",
      rating: 5,
      price: "₹249"
    },
    {
      id: "3",
      customerName: "Sneha Reddy",
      address: "789, Sunshine Apartments, HSR Layout",
      serviceType: "Bathroom Cleaning",
      time: "Yesterday, 4:00 PM",
      status: "completed",
      rating: 4,
      price: "₹299"
    }
  ]);
  
  // Simulate job requests while available
  useEffect(() => {
    if (!isAvailable || currentJobRequest) return;
    
    // Randomly generate a job request after 5-10 seconds
    const timer = setTimeout(() => {
      const newRequest: JobRequest = {
        id: Math.random().toString(36).substring(7),
        customerName: ["Rahul Sharma", "Neha Singh", "Vikram Patel", "Ananya Das"][Math.floor(Math.random() * 4)],
        address: ["123 Park Street, Koramangala", "456 MG Road, Indiranagar", "789 Brigade Road, Central Bangalore"][Math.floor(Math.random() * 3)],
        distance: [(Math.random() * 3 + 0.5).toFixed(1) + " km"],
        serviceType: ["Daily Cleaning", "Kitchen Cleaning", "Bathroom Cleaning", "Deep Cleaning"][Math.floor(Math.random() * 4)],
        time: ["Now", "In 30 mins", "In 1 hour"][Math.floor(Math.random() * 3)],
        price: "₹" + (Math.floor(Math.random() * 200) + 250),
        expiresIn: 30 // 30 seconds to accept
      };
      
      setCurrentJobRequest(newRequest);
      setCountdown(30);
      
      // Play notification sound
      const audio = new Audio("/lovable-uploads/notification.mp3");
      audio.play().catch(e => console.log("Audio play failed:", e));
      
      toast.info("New job request!");
    }, Math.random() * 5000 + 5000);
    
    return () => clearTimeout(timer);
  }, [isAvailable, currentJobRequest]);
  
  // Countdown timer for job request
  useEffect(() => {
    if (!currentJobRequest || countdown <= 0) return;
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCurrentJobRequest(null);
          toast.error("Job request expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentJobRequest, countdown]);
  
  const handleAvailabilityToggle = () => {
    setIsAvailable(!isAvailable);
    toast.success(isAvailable ? "You are now offline" : "You are now online and available for jobs");
  };
  
  const acceptJob = () => {
    if (!currentJobRequest) return;
    
    // Add to tasks
    const newTask: Task = {
      id: currentJobRequest.id,
      customerName: currentJobRequest.customerName,
      address: currentJobRequest.address,
      serviceType: currentJobRequest.serviceType,
      time: currentJobRequest.time === "Now" ? "Now" : currentJobRequest.time,
      status: "upcoming",
      price: currentJobRequest.price
    };
    
    setTasks([newTask, ...tasks]);
    setCurrentJobRequest(null);
    toast.success("Job accepted! Check your upcoming tasks.");
  };
  
  const rejectJob = () => {
    setCurrentJobRequest(null);
    toast.info("Job rejected");
  };
  
  return (
    <div className="min-h-screen bg-white pb-6">
      {/* Header with "switch to customer app" */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-sapphire to-sapphire/90 text-white py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sapphire mr-3">
              <span className="font-bold">M</span>
            </div>
            <div>
              <p className="text-xs text-white/70">Hello,</p>
              <h1 className="font-bold">Lakshmi D.</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-coral rounded-full"></span>
            </button>
            <button 
              className="text-xs px-2 py-1 rounded-full bg-white/20"
              onClick={() => {
                localStorage.removeItem("skoopa-user");
                window.location.href = "/login";
              }}
            >
              Switch to Customer App
            </button>
          </div>
        </div>
        
        {/* Availability Toggle */}
        <div className="mt-4 bg-white/10 p-3 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold flex items-center">
                <span className={`w-2.5 h-2.5 rounded-full mr-2 ${isAvailable ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}></span>
                {isAvailable ? "Available for Jobs" : "Currently Offline"}
              </h2>
              <p className="text-xs text-white/70 mt-1">
                {isAvailable ? "You're receiving job requests" : "You won't receive any jobs"}
              </p>
            </div>
            <Switch 
              checked={isAvailable} 
              onCheckedChange={handleAvailabilityToggle}
              className="data-[state=checked]:bg-coral"
            />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="px-4 py-4">
        {/* Current Job Request */}
        <AnimatePresence>
          {currentJobRequest && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 border-2 border-coral rounded-xl overflow-hidden"
            >
              <div className="bg-coral/10 p-3 border-b border-coral/20">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-sapphire">New Job Request</h2>
                  <div className="flex items-center bg-white px-2 py-1 rounded-full text-xs font-medium text-coral">
                    <Clock size={12} className="mr-1" />
                    {countdown}s
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-azure rounded-full flex items-center justify-center text-sapphire shrink-0">
                    {currentJobRequest.serviceType.includes("Kitchen") ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 4v16"/>
                        <path d="M8 4v16"/>
                        <path d="M5 8h14"/>
                        <path d="M5 16h14"/>
                      </svg>
                    ) : currentJobRequest.serviceType.includes("Bathroom") ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 20h20"/>
                        <path d="M12 16v4"/>
                        <path d="M4 20v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8"/>
                        <path d="M12 7V4"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z"/>
                        <path d="M4 10h16"/>
                        <path d="M10 4v16"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">{currentJobRequest.serviceType}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-coral">{currentJobRequest.price}</span>
                      <span className="text-xs px-2 py-0.5 bg-azure/30 rounded-full text-sapphire">
                        {currentJobRequest.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <MapPin size={16} className="text-steel shrink-0 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm text-charcoal">{currentJobRequest.address}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-steel">{currentJobRequest.distance} away</span>
                        <a href="#" className="text-xs text-coral font-medium">View Map</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="text-steel mr-2" />
                    <span className="text-sm text-charcoal">{currentJobRequest.customerName}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    className="flex-1 py-2.5 rounded-lg bg-smoke text-steel font-medium"
                    onClick={rejectJob}
                  >
                    Reject
                  </button>
                  <button 
                    className="flex-1 py-2.5 rounded-lg bg-coral text-white font-medium"
                    onClick={acceptJob}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Earnings */}
        <div className="mb-6">
          <h2 className="font-bold text-sapphire mb-3 flex items-center">
            <DollarSign size={18} className="mr-1 text-coral" />
            Your Earnings
          </h2>
          
          <div className="bg-gradient-to-r from-coral/10 to-azure/20 rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-xs text-steel">Today</p>
                <p className="font-bold text-lg text-charcoal">{earnings.today}</p>
              </div>
              <div>
                <p className="text-xs text-steel">This Week</p>
                <p className="font-bold text-lg text-charcoal">{earnings.thisWeek}</p>
              </div>
              <div>
                <p className="text-xs text-steel">This Month</p>
                <p className="font-bold text-lg text-charcoal">{earnings.thisMonth}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium">Level {earnings.level} Maid</p>
                <p className="text-xs text-steel">{earnings.tasksToNextLevel} tasks to Level {earnings.level + 1}</p>
              </div>
              <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-coral"
                  initial={{ width: 0 }}
                  animate={{ width: `${earnings.progress}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-3">
            <button className="py-2.5 rounded-lg bg-smoke text-charcoal font-medium flex items-center justify-center">
              <Calendar size={16} className="mr-2" />
              View History
            </button>
            <button className="py-2.5 rounded-lg bg-sapphire text-white font-medium flex items-center justify-center">
              <DollarSign size={16} className="mr-2" />
              Withdraw
            </button>
          </div>
        </div>
        
        {/* Today's Tasks */}
        <div>
          <h2 className="font-bold text-sapphire mb-3 flex items-center">
            <Clock size={18} className="mr-1 text-coral" />
            Today's Tasks
          </h2>
          
          <div className="space-y-3">
            {tasks.filter(task => task.status === "upcoming").length === 0 ? (
              <div className="p-4 border border-smoke rounded-xl bg-white text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-smoke/50 flex items-center justify-center">
                  <Calendar size={24} className="text-steel" />
                </div>
                <p className="text-steel">No upcoming tasks for today</p>
                <p className="text-xs text-steel mt-1">New job requests will appear here</p>
              </div>
            ) : (
              tasks
                .filter(task => task.status === "upcoming")
                .map(task => (
                  <div key={task.id} className="p-4 border border-smoke rounded-xl bg-white">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-azure rounded-full flex items-center justify-center text-sapphire shrink-0">
                        {task.serviceType.includes("Kitchen") ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 4v16"/>
                            <path d="M8 4v16"/>
                            <path d="M5 8h14"/>
                            <path d="M5 16h14"/>
                          </svg>
                        ) : task.serviceType.includes("Bathroom") ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 20h20"/>
                            <path d="M12 16v4"/>
                            <path d="M4 20v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8"/>
                            <path d="M12 7V4"/>
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z"/>
                            <path d="M4 10h16"/>
                            <path d="M10 4v16"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-charcoal">{task.serviceType}</h3>
                            <p className="text-sm text-steel mt-0.5">{task.customerName}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-medium text-coral">{task.price}</span>
                            <div className="flex items-center mt-1 text-xs text-steel">
                              <Clock size={12} className="mr-1" />
                              {task.time}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-xs text-steel mt-2">
                          <MapPin size={12} className="mr-1" />
                          {task.address}
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <button className="flex-1 py-2 rounded-lg bg-sapphire text-white text-sm font-medium flex items-center justify-center">
                            <MapPin size={14} className="mr-1" />
                            Navigate
                          </button>
                          <button className="flex-1 py-2 rounded-lg bg-coral text-white text-sm font-medium flex items-center justify-center">
                            <Phone size={14} className="mr-1" />
                            Call Customer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
            
            {/* Completed Tasks */}
            {tasks.filter(task => task.status === "completed").length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-charcoal mb-2 flex items-center">
                  <Check size={16} className="mr-1 text-green-500" />
                  Completed Tasks
                </h3>
                
                {tasks
                  .filter(task => task.status === "completed")
                  .map(task => (
                    <div key={task.id} className="p-3 border border-smoke rounded-xl bg-white mb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-charcoal">{task.serviceType}</h3>
                          <p className="text-xs text-steel mt-0.5">{task.time}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-green-500">{task.price}</span>
                          <div className="flex items-center justify-end mt-1">
                            {task.rating && [...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                viewBox="0 0 24 24" 
                                width="12" 
                                height="12" 
                                fill={i < task.rating ? "#FFD93D" : "#E8E8E8"}
                                className="mr-0.5"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </div>
        
        {/* Support Card */}
        <div className="mt-8 p-4 border border-gold/30 rounded-xl bg-gold/10">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center text-sapphire shrink-0">
              <AlertCircle size={20} />
            </div>
            <div className="ml-3">
              <h3 className="font-bold text-charcoal">Need Help?</h3>
              <p className="text-sm text-steel mt-1">Contact Skoopa support for any assistance</p>
              <button className="mt-3 py-2 px-4 bg-gold text-sapphire rounded-lg text-sm font-medium flex items-center">
                Contact Support
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaidDashboard;
