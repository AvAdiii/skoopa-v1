
import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import SkoopsBenefitsPopover from "./SkoopsBenefitsPopover";

interface SkoopsDisplayProps {
  skoops: number;
  level: number;
  compact?: boolean;
  className?: string;
}

const SkoopsDisplay = ({ skoops, level, compact = false, className = "" }: SkoopsDisplayProps) => {
  return (
    <motion.div 
      className={`flex items-center ${compact ? "gap-1" : "gap-2"} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <SkoopsBenefitsPopover 
        skoops={skoops} 
        level={level} 
        compact={compact} 
        variant="user"
      />
      
      {!compact && (
        <div className="bg-azure/20 rounded-full px-3 py-1">
          <span className="text-sm font-semibold text-sapphire">Level {level}</span>
        </div>
      )}
    </motion.div>
  );
};

export default SkoopsDisplay;
