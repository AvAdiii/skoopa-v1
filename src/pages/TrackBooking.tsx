
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Clock, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const TrackBooking = () => {
  const { id } = useParams<{ id: string }>();
  const [progress, setProgress] = useState(45);
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
      
      setEstimatedTime(prev => {
        if (prev <= 1) return 1;
        return prev - 1;
      });
      
      setElapsedTime(prev => prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Maid information (mock data)
  const maid = {
    name: "Nandini Chakaravarthy",
    phone: "+91 98765 12345",
    rating: 4.8,
    image: "https://ui-avatars.com/api/?name=Lakshmi+Devi&background=FFC0CB&color=800080&size=256"
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <Link to="/bookings" className="text-sapphire">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-sapphire">Track Maid</h1>
        </div>
      </div>
      
      <div className="p-4">
        {/* Map area (placeholder) */}
        <div className="relative w-full h-[300px] bg-gray-200 rounded-xl overflow-hidden mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin size={60} className="text-coral" />
          </div>
          
          {/* Mock route line */}
          <div className="absolute left-10 right-10 top-1/2 h-3 bg-coral/30 rounded-full">
            <div 
              className="h-full bg-coral rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Starting point marker */}
          <div className="absolute left-10 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-coral">
            <Home size={16} className="text-coral" />
          </div>
          
          {/* Destination marker */}
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-coral">
            <MapPin size={16} className="text-coral" />
          </div>
          
          {/* Current position marker */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 bg-coral rounded-full flex items-center justify-center"
            style={{ left: `calc(10% + ${progress}% * 0.8)` }}
          >
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src={maid.image} alt={maid.name} />
              <AvatarFallback>LD</AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        {/* Arrival information */}
        <div className="bg-white rounded-xl border border-smoke p-4 mb-6">
          <h2 className="font-bold text-charcoal mb-2">Estimated Arrival</h2>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-coral" />
              <span className="text-steel">Arriving in</span>
            </div>
            <span className="text-xl font-bold text-coral">{estimatedTime} mins</span>
          </div>
          <Progress value={progress} className="h-2 bg-smoke" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-steel">Started {elapsedTime} mins ago</span>
            <span className="text-xs text-steel">
              {progress < 100 ? "On the way" : "Arrived"}
            </span>
          </div>
        </div>
        
        {/* Maid information */}
        <div className="bg-white rounded-xl border border-smoke p-4 mb-6">
          <h2 className="font-bold text-charcoal mb-3">Your Maid</h2>
          <div className="flex items-center">
            <Avatar className="w-14 h-14 mr-3">
              <AvatarImage src={maid.image} alt={maid.name} />
              <AvatarFallback>LD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium text-charcoal">{maid.name}</h3>
              <div className="flex items-center text-sm text-amber-500 mt-0.5">
                <span>{maid.rating}</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="ml-1">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 8.38 8.63 1.19 9.24l5.46 4.73L5.82 21z"></path>
                </svg>
                <span className="text-steel ml-1">(124 jobs)</span>
              </div>
            </div>
            <Button 
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 text-coral border-coral hover:bg-coral/5"
              asChild
            >
              <a href={`tel:${maid.phone}`}>
                <Phone size={18} />
              </a>
            </Button>
          </div>
        </div>
        
        {/* Booking details */}
        <div className="bg-white rounded-xl border border-smoke p-4">
          <h2 className="font-bold text-charcoal mb-3">Booking Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-steel">Service</span>
              <span className="text-charcoal font-medium">Regular Cleaning</span>
            </div>
            <div className="flex justify-between">
              <span className="text-steel">Date</span>
              <span className="text-charcoal font-medium">April 10, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-steel">Time</span>
              <span className="text-charcoal font-medium">10:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-steel">Duration</span>
              <span className="text-charcoal font-medium">1 hour</span>
            </div>
            <div className="flex justify-between">
              <span className="text-steel">Address</span>
              <span className="text-charcoal font-medium text-right">123 Main St, Bengaluru</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home icon component
const Home = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

export default TrackBooking;
