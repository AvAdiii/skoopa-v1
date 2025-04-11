
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  useEffect(() => {
    // Navigate to login after animation completes
    const timer = setTimeout(() => onFinish(), 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-white to-azure/30 flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Decorative elements - simplified */}
        <motion.div 
          className="absolute w-[300px] h-[300px] rounded-full border-[6px] border-azure/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Logo container - simplified */}
        <motion.div
          className="relative z-10 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* New Logo Image */}
          <motion.img 
            src="/lovable-uploads/9623a10a-3923-467d-9b8d-fe809b764eb1.png" 
            alt="Skoopa Logo" 
            className="w-40 h-40 object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
        
        {/* Tagline with slide-up animation */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl font-extrabold bg-gradient-to-r from-coral to-sapphire bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Skoopa
          </motion.h1>
          
          <motion.p 
            className="text-sapphire mt-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Premium Housemaid Service
          </motion.p>
        </motion.div>
        
        {/* Loading indicator */}
        <motion.div 
          className="mt-10 h-1 bg-smoke rounded-full w-48 overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 192 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <motion.div 
            className="h-full bg-coral rounded-full" 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
