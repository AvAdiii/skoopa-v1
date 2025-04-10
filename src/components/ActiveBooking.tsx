
import { Clock, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

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

interface ActiveBookingProps {
  booking: BookingInfo;
  onClose: () => void;
}

const ActiveBooking = ({ booking, onClose }: ActiveBookingProps) => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  
  // Create a value that changes from 1 to 0 as scrollY increases
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const yTransform = useTransform(scrollY, [0, 200], [0, 100]);
  
  // Update visibility based on scroll position
  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setIsVisible(latest < 200);
    });
    
    return () => unsubscribe();
  }, [scrollY]);
  
  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed bottom-16 left-0 right-0 mx-4 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      style={{ opacity, y: yTransform }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Minimized booking indicator with enhanced styling */}
      <div className="bg-coral rounded-xl shadow-md border border-coral/30 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
            <Clock className="text-coral" size={18} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{booking.serviceType}</h3>
            <p className="text-xs text-white/90">Arriving in {booking.arrivalTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs bg-white border-white text-coral h-8 hover:bg-white/90 hover:text-coral"
            onClick={() => window.location.href = '/track-booking/active'}
          >
            Track
          </Button>
          <button 
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveBooking;
