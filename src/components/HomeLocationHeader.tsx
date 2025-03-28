
import { useState } from "react";
import { Bell, ChevronDown, MapPin } from "lucide-react";

const HomeLocationHeader = () => {
  const [location, setLocation] = useState("Koramangala, Bengaluru");
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-xs text-steel">Your Location</span>
        <button 
          className="flex items-center text-sapphire font-medium"
          onClick={() => console.log("Open location picker")}
        >
          <MapPin size={16} className="text-coral mr-1" />
          <span className="truncate max-w-[180px]">{location}</span>
          <ChevronDown size={16} className="ml-1" />
        </button>
      </div>
      <div className="relative">
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-smoke bg-white text-sapphire hover:bg-smoke/30 transition-colors">
          <Bell size={20} />
        </button>
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-coral rounded-full"></span>
      </div>
    </div>
  );
};

export default HomeLocationHeader;
