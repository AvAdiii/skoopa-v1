import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Bell, ChevronRight, User } from "lucide-react";
import CustomerBottomNav from "@/components/CustomerBottomNav";
import HomeLocationHeader from "@/components/HomeLocationHeader";
import PromoCarousel from "@/components/PromoCarousel";
import QuickActions from "@/components/QuickActions";
import SearchInput from "@/components/SearchInput";
import ServiceCategory from "@/components/ServiceCategory";
import SkoopaLogo from "@/components/SkoopaLogo";
import UserGreeting from "@/components/UserGreeting";
import ActiveBooking from "@/components/ActiveBooking";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Mock data for services
const REGULAR_SERVICES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z"/>
        <path d="M4 10h16"/>
        <path d="M10 4v16"/>
      </svg>
    ),
    title: "Regular Cleaning",
    description: "Daily or weekly cleaning of your home including dusting, sweeping, and bathroom cleaning.",
    price: "249",
    duration: "1 hour",
    popular: true,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 4v16"/>
        <path d="M8 4v16"/>
        <path d="M5 8h14"/>
        <path d="M5 16h14"/>
      </svg>
    ),
    title: "Kitchen Cleaning",
    description: "Deep cleaning of kitchen including utensils, stove, countertops and storage.",
    price: "349",
    duration: "1.5 hours",
    popular: false,
  },
];

const PREMIUM_SERVICES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 20h20"/>
        <path d="M12 16v4"/>
        <path d="M4 20v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8"/>
        <path d="M12 7V4"/>
      </svg>
    ),
    title: "Deep Cleaning",
    description: "Thorough cleaning of your entire home, removing stubborn dirt and stains.",
    price: "899",
    duration: "4 hours",
    popular: true,
  }
];

interface MaidInfo {
  name: string;
  rating: number;
  imageUrl: string;
}

interface BookingInfo {
  serviceType: string;
  time: string;
  arrivalTime: string;
  address: string;
  maid: MaidInfo;
}

const Index = () => {
  const navigate = useNavigate();
  const [activeBooking, setActiveBooking] = useState<BookingInfo | null>(null);
  const [userName, setUserName] = useState("Rajesh");
  
  useEffect(() => {
    // Check if there's a booking in localStorage
    const storedBookings = localStorage.getItem("skoopa-bookings");
    if (storedBookings) {
      try {
        const bookings = JSON.parse(storedBookings);
        if (bookings.length > 0) {
          // Set the most recent booking as active
          setActiveBooking(bookings[0]);
        }
      } catch (e) {
        console.error("Error parsing bookings from localStorage", e);
      }
    }
    
    // Get user info
    const user = localStorage.getItem("skoopa-user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData?.name) {
          setUserName(userData.name);
        }
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);
  
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // In a real app, this would navigate to search results with the query
  };

  // Get today's date info
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDayOfWeek = today.getDay();
  const dayNumber = today.getDate();
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const dayIndex = (currentDayOfWeek + i) % 7;
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      day: days[dayIndex],
      date: date.getDate(),
      isToday: i === 0,
    };
  });
  
  return (
    <div className="pb-20">
      {/* Header Section */}
      <motion.div 
        className="px-6 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Hello, {userName}</h1>
            <p className="text-muted-foreground text-sm">Today is a great day</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="icon" className="rounded-full bg-background" onClick={() => navigate('/notifications')}>
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-background" onClick={() => navigate('/profile')}>
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg" alt={userName} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            className="bg-muted/50 w-full rounded-2xl py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Search for services..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Daily Challenge Card */}
      <motion.div
        className="mx-6 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="app-card bg-primary/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Daily challenge</h2>
              <p className="text-sm text-muted-foreground">Complete today's cleaning</p>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <Avatar key={i} className="border-2 border-white h-6 w-6">
                  <AvatarFallback className="text-xs bg-accent/80">{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>

          {/* Calendar Strip */}
          <div className="flex justify-between mb-4">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">{day.day}</span>
                <div className={cn(
                  "day-indicator mt-1",
                  day.isToday ? "day-active" : "day-inactive"
                )}>
                  {day.date}
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold mb-3">Your plan</h3>

          {/* Plan Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="stat-card gradient-accent text-left">
              <div className="flex items-center gap-1 opacity-80">
                <Calendar size={14} />
                <span className="text-xs">2h 15m</span>
              </div>
              <h4 className="font-bold text-base mt-1">Regular Clean</h4>
              <p className="text-xs mt-1 opacity-80">10:00-12:15</p>
              <div className="flex gap-1 items-center mt-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs">M</AvatarFallback>
                </Avatar>
                <span className="text-xs">with Meera</span>
              </div>
            </div>
            
            <div className="stat-card bg-secondary/20 text-left">
              <div className="flex items-center gap-1 opacity-80">
                <Calendar size={14} />
                <span className="text-xs">1h 30m</span>
              </div>
              <h4 className="font-bold text-base mt-1">Kitchen Clean</h4>
              <p className="text-xs mt-1 opacity-80">14:00-15:30</p>
              <div className="flex gap-1 items-center mt-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs">S</AvatarFallback>
                </Avatar>
                <span className="text-xs">with Sunita</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div 
        className="px-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Popular Services</h2>
          <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
            <span>View all</span>
            <ChevronRight size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Service Cards */}
          {[...REGULAR_SERVICES, ...PREMIUM_SERVICES].map((service, index) => (
            <motion.div 
              key={index}
              className="app-card animated-card flex"
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/service/${service.title.toLowerCase().replace(' ', '-')}`)}
            >
              <div className={`mr-4 p-3 rounded-2xl ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/20 text-accent-foreground'}`}>
                {service.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{service.title}</h3>
                  <span className="font-bold">₹{service.price}</span>
                </div>
                <p className="text-muted-foreground text-xs line-clamp-1 mt-1">
                  {service.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs bg-muted/50 px-2 py-1 rounded-full">
                    {service.duration}
                  </span>
                  {service.popular && (
                    <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Promos Section - Using existing component */}
      <div className="mt-8 px-6">
        <h2 className="text-lg font-bold mb-4">Special Offers</h2>
        <PromoCarousel />
      </div>

      {/* Active Booking Overlay */}
      <AnimatePresence>
        {activeBooking && (
          <ActiveBooking 
            booking={activeBooking} 
            onClose={() => setActiveBooking(null)} 
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Index;
