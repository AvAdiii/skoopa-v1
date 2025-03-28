
import { useEffect, useState } from "react";
import SkoopaLogo from "./SkoopaLogo";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show logo with a slight delay for better visual effect
    const logoTimer = setTimeout(() => setShowLogo(true), 300);
    
    // Navigate to login after animation completes
    const navTimer = setTimeout(() => onFinish(), 2500);
    
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(navTimer);
    };
  }, [onFinish]);

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Background decoration */}
        <motion.div 
          className="absolute w-[300px] h-[300px] bg-azure/30 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Pulsing circle */}
        <motion.div 
          className="absolute w-[200px] h-[200px] bg-coral/20 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 0.5 }}
        />
        
        {/* Logo with scale animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: showLogo ? 1 : 0.8, opacity: showLogo ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <SkoopaLogo variant="full" className="scale-150" />
        </motion.div>
        
        {/* Tagline with slide-up animation */}
        <motion.p 
          className="text-sapphire mt-6 font-medium text-lg relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: showLogo ? 0 : 20, opacity: showLogo ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Premium Housemaid Service
        </motion.p>
        
        {/* Loading indicator */}
        <motion.div 
          className="mt-10 h-1 bg-smoke rounded-full w-40 overflow-hidden relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: showLogo ? 1 : 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div 
            className="h-full bg-coral rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
