
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomerBottomNav from "@/components/CustomerBottomNav";
import HomeLocationHeader from "@/components/HomeLocationHeader";
import PromoCarousel from "@/components/PromoCarousel";
import QuickActions from "@/components/QuickActions";
import SearchInput from "@/components/SearchInput";
import ServiceCategory from "@/components/ServiceCategory";
import SkoopaLogo from "@/components/SkoopaLogo";
import UserGreeting from "@/components/UserGreeting";
import ActiveBooking from "@/components/ActiveBooking";

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
  }, []);
  
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // In a real app, this would navigate to search results with the query
  };
  
  return (
    <div className="pb-20">
      {/* Header with Logo */}
      <motion.div 
        className="sticky top-0 z-40 bg-white py-3 px-4 border-b border-smoke"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className="flex justify-center">
          <SkoopaLogo />
        </div>
      </motion.div>

      <div className="px-4 py-3">
        {/* Location Header */}
        <HomeLocationHeader />
        
        {/* Greeting */}
        <UserGreeting className="mt-6" />

        {/* Search */}
        <SearchInput className="mt-4" onSearch={handleSearch} />

        {/* Main Content Section */}
        <motion.div 
          className="mt-6 pt-6 px-4 -mx-4 rounded-t-3xl bg-gradient-to-b from-azure/20 to-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Promo Carousel */}
          <PromoCarousel />

          {/* Quick Actions */}
          <QuickActions />

          {/* Service Categories */}
          <ServiceCategory
            title="Regular Services"
            services={REGULAR_SERVICES}
          />
          
          <ServiceCategory
            title="Premium Services"
            services={PREMIUM_SERVICES}
          />
        </motion.div>
      </div>

      {/* Active Booking */}
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
