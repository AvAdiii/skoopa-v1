
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface AvailabilityToggleProps {
  initialAvailability: boolean;
  onToggle?: (isAvailable: boolean) => void;
}

const AvailabilityToggle = ({ initialAvailability, onToggle }: AvailabilityToggleProps) => {
  const [isAvailable, setIsAvailable] = useState(initialAvailability);

  const handleAvailabilityToggle = (checked: boolean) => {
    setIsAvailable(checked);
    
    toast({
      title: checked ? "You are now available" : "You are now unavailable",
      description: checked ? "You will receive new job requests" : "You will not receive new job requests",
    });
    
    if (onToggle) {
      onToggle(checked);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-md border border-smoke overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-coral/20 to-coral/5 border-b border-smoke">
          <h3 className="text-xl font-bold text-center text-sapphire">Your Availability</h3>
        </div>
        <div className="p-6 flex flex-col items-center">
          <div className="text-lg mb-2 font-medium">
            {isAvailable ? "You are AVAILABLE for work" : "You are NOT AVAILABLE for work"}
          </div>
          <div className="my-4 flex items-center gap-4">
            <span className={`text-lg ${!isAvailable ? "font-bold text-red-600" : "text-steel"}`}>
              Unavailable
            </span>
            <Switch 
              checked={isAvailable} 
              onCheckedChange={handleAvailabilityToggle}
              className="scale-150 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
            />
            <span className={`text-lg ${isAvailable ? "font-bold text-green-600" : "text-steel"}`}>
              Available
            </span>
          </div>
          <p className={`text-center text-sm ${isAvailable ? "text-green-600" : "text-red-600"}`}>
            {isAvailable 
              ? "Customers can now book you for jobs" 
              : "You will not receive any new job requests"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityToggle;
