
import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeLocationHeader = () => {
  const [location, setLocation] = useState("Koramangala, Bengaluru");
  const navigate = useNavigate();
  
  const handleLocationClick = () => {
    navigate('/edit-location');
  };
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-xs text-steel">Your Location</span>
        <button 
          className="flex items-center text-sapphire font-medium"
          onClick={handleLocationClick}
        >
          <MapPin size={16} className="text-coral mr-1" />
          <span className="truncate max-w-[180px]">{location}</span>
          <ChevronDown size={16} className="ml-1" />
        </button>
      </div>
      {/* Removed duplicate notification button */}
    </div>
  );
};

export default HomeLocationHeader;
