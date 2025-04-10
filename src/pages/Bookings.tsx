
import { useState } from "react";
import { ArrowLeft, Calendar, CheckCircle, Clock, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomerBottomNav from "@/components/CustomerBottomNav";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type Booking = {
  id: string;
  serviceName: string;
  maidName: string;
  maidImage: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  price: string;
  address: string;
};

const BOOKINGS: Booking[] = [
  {
    id: "b1",
    serviceName: "Regular Cleaning",
    maidName: "Geeta Singh",
    maidImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "27 May 2023",
    time: "09:00 AM - 10:00 AM",
    status: "upcoming",
    price: "249",
    address: "123 Main Street, Central District, Mumbai"
  },
  {
    id: "b2",
    serviceName: "Kitchen Deep Clean",
    maidName: "Lakshmi R",
    maidImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "25 May 2023",
    time: "02:00 PM - 03:30 PM",
    status: "completed",
    price: "349",
    address: "45 Park Avenue, Sector 10, Bengaluru"
  },
  {
    id: "b3",
    serviceName: "Bathroom Cleaning",
    maidName: "Priya Sharma",
    maidImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "20 May 2023",
    time: "10:00 AM - 11:00 AM",
    status: "cancelled",
    price: "249",
    address: "78 Hill Road, Defence Colony, Delhi"
  },
];

const BookingCard = ({ booking, onReschedule, onTrack, onBookAgain, onReview }: { 
  booking: Booking;
  onReschedule: (id: string) => void;
  onTrack: (id: string) => void;
  onBookAgain: (id: string) => void;
  onReview: (id: string) => void;
}) => {
  const statusColors = {
    upcoming: "bg-azure text-sapphire",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusText = {
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <div className="bg-white rounded-lg border border-smoke p-4 mb-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-charcoal">{booking.serviceName}</h3>
          <div className="flex items-center text-sm text-steel mt-1">
            <Clock size={14} className="mr-1" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center text-sm text-steel mt-1">
            <Calendar size={14} className="mr-1" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center text-sm text-steel mt-1">
            <MapPin size={14} className="mr-1" />
            <span className="truncate max-w-[200px]">{booking.address}</span>
          </div>
        </div>
        <span className={cn("text-xs px-2 py-0.5 rounded-full", statusColors[booking.status])}>
          {statusText[booking.status]}
        </span>
      </div>
      
      <div className="border-t border-smoke mt-3 pt-3 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={booking.maidImage} 
            alt={booking.maidName}
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <span className="text-sm font-medium">{booking.maidName}</span>
        </div>
        <span className="font-bold text-coral">₹{booking.price}</span>
      </div>
      
      {booking.status === "upcoming" && (
        <div className="mt-3 flex justify-between gap-2">
          <button 
            className="flex-1 py-2 border border-coral text-coral rounded-lg text-sm font-medium hover:bg-coral/5 transition-colors"
            onClick={() => onReschedule(booking.id)}
          >
            Reschedule
          </button>
          <button 
            className="flex-1 py-2 bg-coral text-white rounded-lg text-sm font-medium hover:bg-coral/90 transition-colors"
            onClick={() => onTrack(booking.id)}
          >
            Track Live
          </button>
        </div>
      )}
      
      {booking.status === "completed" && (
        <div className="mt-3 flex justify-between gap-2">
          <button 
            className="flex-1 py-2 border border-sapphire text-sapphire rounded-lg text-sm font-medium hover:bg-sapphire/5 transition-colors"
            onClick={() => onBookAgain(booking.id)}
          >
            Book Again
          </button>
          <button 
            className="flex-1 py-2 bg-sapphire text-white rounded-lg text-sm font-medium hover:bg-sapphire/90 transition-colors"
            onClick={() => onReview(booking.id)}
          >
            Review
          </button>
        </div>
      )}
    </div>
  );
};

const Bookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  
  const filteredBookings = BOOKINGS.filter(booking => booking.status === activeTab);
  
  const handleReschedule = (id: string) => {
    navigate(`/reschedule-booking/${id}`);
  };
  
  const handleTrackLive = (id: string) => {
    navigate(`/track-booking/${id}`);
  };
  
  const handleBookAgain = (id: string) => {
    const booking = BOOKINGS.find(b => b.id === id);
    if (booking) {
      const serviceId = booking.serviceName.toLowerCase().replace(/\s+/g, '-');
      navigate(`/service/${serviceId}`);
    }
  };
  
  const handleReview = (id: string) => {
    navigate(`/review-booking/${id}`);
  };
  
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sapphire">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-sapphire">Your Bookings</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white sticky top-[65px] z-30 border-b border-smoke">
        <div className="flex">
          {(["upcoming", "completed", "cancelled"] as const).map(tab => (
            <button 
              key={tab}
              className={cn(
                "flex-1 text-center py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab 
                  ? "border-coral text-coral" 
                  : "border-transparent text-steel hover:text-charcoal"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              onReschedule={handleReschedule}
              onTrack={handleTrackLive}
              onBookAgain={handleBookAgain}
              onReview={handleReview}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 bg-azure rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-sapphire" />
            </div>
            <h3 className="text-lg font-bold text-charcoal mb-2">No {activeTab} bookings</h3>
            <p className="text-steel text-sm mb-6">
              {activeTab === "upcoming" 
                ? "You don't have any upcoming bookings. Book a service to get started." 
                : activeTab === "completed" 
                  ? "You haven't completed any bookings yet."
                  : "You don't have any cancelled bookings."}
            </p>
            {activeTab === "upcoming" && (
              <Link to="/" className="py-2.5 px-5 bg-coral text-white rounded-lg font-medium hover:bg-coral/90 transition-colors">
                Book a Service
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Bookings;
