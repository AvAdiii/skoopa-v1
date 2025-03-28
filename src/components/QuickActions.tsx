
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type QuickActionProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
};

const QuickAction = ({ icon, label, color, onClick }: QuickActionProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-1"
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <motion.div 
        className={cn("w-16 h-16 rounded-full flex items-center justify-center", color)}
        whileHover={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
      >
        {icon}
      </motion.div>
      <span className="text-xs text-charcoal font-medium mt-1">{label}</span>
    </motion.button>
  );
};

const QuickActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z"/>
          <path d="M4 10h16"/>
          <path d="M10 4v16"/>
        </svg>
      ),
      label: "Daily",
      color: "bg-azure/80 text-sapphire",
      onClick: () => navigate("/service/daily"),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4v16"/>
          <path d="M8 4v16"/>
          <path d="M5 8h14"/>
          <path d="M5 16h14"/>
        </svg>
      ),
      label: "Kitchen",
      color: "bg-coral/80 text-white",
      onClick: () => navigate("/service/kitchen"),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20h20"/>
          <path d="M12 16v4"/>
          <path d="M4 20v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8"/>
          <path d="M12 7V4"/>
        </svg>
      ),
      label: "Bathroom",
      color: "bg-gold/80 text-sapphire",
      onClick: () => navigate("/service/bathroom"),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16"/>
          <path d="M12 6v12"/>
          <path d="M8 18h8"/>
          <rect x="6" y="2" width="12" height="4" rx="1"/>
        </svg>
      ),
      label: "Special",
      color: "bg-sapphire/80 text-white",
      onClick: () => navigate("/service/special"),
    },
  ];

  return (
    <div className="py-4">
      <h2 className="text-lg font-bold text-sapphire mb-4 flex items-center">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>Quick Services</span>
        </motion.div>
        <div className="flex-1 h-px bg-smoke ml-3"></div>
      </h2>
      
      <motion.div 
        className="flex justify-between px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.3,
          staggerChildren: 0.1
        }}
      >
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <QuickAction {...action} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default QuickActions;
