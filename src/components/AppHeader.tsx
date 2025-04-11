
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SkoopaLogo from "./SkoopaLogo";
import SkoopsDisplay from "./SkoopsDisplay";
import { motion } from "framer-motion";

interface AppHeaderProps {
  skoops: number;
  level: number;
}

const AppHeader = ({ skoops, level }: AppHeaderProps) => {
  const navigate = useNavigate();
  
  const goToNotifications = () => {
    navigate('/notifications');
  };

  return (
    <motion.div 
      className="sticky top-0 z-40 bg-white py-3 px-4 border-b border-smoke"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <div className="flex justify-between items-center">
        <SkoopaLogo />
        <div className="flex items-center gap-3">
          <SkoopsDisplay skoops={skoops} level={level} compact />
          <button 
            onClick={goToNotifications}
            className="relative p-2 rounded-full hover:bg-smoke/30 transition-colors"
          >
            <Bell size={22} className="text-charcoal" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-coral rounded-full"></span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AppHeader;
