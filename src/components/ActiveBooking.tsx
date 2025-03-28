
import { Clock, MapPin, X } from "lucide-react";
import { motion } from "framer-motion";

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
      className="fixed bottom-16 left-0 right-0 mx-4 z-40 bg-white rounded-xl shadow-lg overflow-hidden border border-azure"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute top-2 right-2">
        <button 
          onClick={onClose}
          className="w-6 h-6 rounded-full bg-smoke/50 flex items-center justify-center"
        >
          <X size={14} />
        </button>
      </div>
      
      <div className="bg-gradient-to-r from-coral/10 to-azure/10 p-3 flex items-center gap-3">
        <div className="w-12 h-12 bg-azure rounded-full flex items-center justify-center shrink-0">
          <Clock className="text-sapphire" size={24} />
        </div>
        <div>
          <h3 className="font-bold text-charcoal">{booking.serviceType} - Today</h3>
          <div className="flex items-center text-sm text-steel gap-4">
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              Arriving in {booking.arrivalTime}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t border-smoke">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gold/20 overflow-hidden">
            <img 
              src={booking.maid.imageUrl} 
              alt={booking.maid.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + booking.maid.name.replace(" ", "+") + "&background=FFD93D&color=0A2342";
              }}
            />
          </div>
          <div>
            <h4 className="font-medium text-charcoal">{booking.maid.name}</h4>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  viewBox="0 0 24 24" 
                  width="12" 
                  height="12" 
                  fill={i < booking.maid.rating ? "#FFD93D" : "#E8E8E8"}
                  className="mr-0.5"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="text-xs text-steel ml-1">{booking.maid.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-steel text-sm">
          <MapPin size={14} className="shrink-0 mr-1" />
          <span className="truncate">{booking.address}</span>
        </div>
        
        <div className="mt-3 flex gap-2">
          <button className="flex-1 bg-coral text-white py-2 rounded-md text-sm font-medium">
            Track Maid
          </button>
          <button className="flex-1 border border-coral text-coral py-2 rounded-md text-sm font-medium">
            Contact
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveBooking;
