
import { Clock, MapPin, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

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
  return (
    <motion.div 
      className="fixed bottom-16 left-0 right-0 mx-4 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Minimized booking indicator with expand button */}
      <div className="bg-white rounded-xl shadow-md border border-azure p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-azure rounded-full flex items-center justify-center shrink-0">
            <Clock className="text-sapphire" size={18} />
          </div>
          <div>
            <h3 className="font-bold text-charcoal text-sm">{booking.serviceType}</h3>
            <p className="text-xs text-steel">Arriving in {booking.arrivalTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs border-coral text-coral h-8"
            onClick={() => window.location.href = '/track-booking'}
          >
            Track
          </Button>
          <button 
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-smoke/50 flex items-center justify-center"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveBooking;
