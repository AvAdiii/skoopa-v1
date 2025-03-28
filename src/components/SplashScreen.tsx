
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [stage, setStage] = useState<"initial" | "logo" | "tagline">("initial");

  useEffect(() => {
    // Sequence the animations
    const initialTimer = setTimeout(() => setStage("logo"), 300);
    const logoTimer = setTimeout(() => setStage("tagline"), 1000);
    
    // Navigate to login after animation completes
    const navTimer = setTimeout(() => onFinish(), 3200);
    
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(logoTimer);
      clearTimeout(navTimer);
    };
  }, [onFinish]);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-white to-azure/30 flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Decorative elements - Indian-inspired patterns */}
        <motion.div 
          className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] rounded-full border-2 border-dashed border-coral/30 opacity-40"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 45 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        
        <motion.div 
          className="absolute w-[300px] h-[300px] rounded-full border-[6px] border-azure/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Logo container */}
        <motion.div
          className="relative z-10 mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: stage === "initial" ? 0.8 : 1.1, 
            opacity: stage === "initial" ? 0 : 1 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo SVG */}
          <motion.svg 
            width="180" 
            height="180" 
            viewBox="0 0 700 700" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.path 
              d="M326.086 80.8213C254.714 91.9522 181.713 135.642 132.913 193.026C84.113 250.409 63.3027 325.969 93.4502 389.511C123.598 453.053 199.555 497.629 270.24 527.941C340.925 558.254 406.338 574.303 467.119 552.598C527.9 530.893 584.048 471.433 592.414 403.03C600.78 334.627 561.364 257.282 507.961 191.756C454.559 126.231 387.171 72.526 326.086 80.8213Z" 
              fill="#FF6B6B"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <motion.path 
              d="M433.927 118C475.036 154.751 505.564 191.873 527.5 243.5C549.436 295.127 559.5 346 543.5 401.5C527.5 457 488.5 510 433.927 542.5C379.354 575 309.208 587 255.5 571C201.792 555 167.792 502 145.5 452.5C123.208 403 112.624 357 129.5 307.5C146.376 258 190.712 205 240.5 164C290.288 123 345.529 94 372.5 100C399.471 106 409.471 133.5 433.927 118Z" 
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            />
            <motion.path 
              d="M388 234.5C426.242 277.5 450.5 329 450.5 388C450.5 447 426.242 513.5 358 513.5C289.758 513.5 193 447 193 388C193 329 289.758 234.5 358 234.5C426.242 234.5 349.758 191.5 388 234.5Z" 
              fill="#FF6B6B"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
            />
            <motion.path 
              d="M469.5 346.5H530L515 406.5L469.5 414V346.5Z" 
              fill="#FF6B6B"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />
          </motion.svg>
        </motion.div>
        
        {/* Tagline with slide-up animation */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            y: stage === "tagline" ? 0 : 20, 
            opacity: stage === "tagline" ? 1 : 0 
          }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl font-extrabold bg-gradient-to-r from-coral to-sapphire bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Skoopa
          </motion.h1>
          
          <motion.p 
            className="text-sapphire mt-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
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
            transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
