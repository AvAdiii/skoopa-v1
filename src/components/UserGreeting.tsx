
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface UserGreetingProps {
  className?: string;
}

const UserGreeting = ({ className = "" }: UserGreetingProps) => {
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("User");
  
  useEffect(() => {
    // Get time of day for appropriate greeting
    const hour = new Date().getHours();
    let greetingText = "Hello";
    
    if (hour < 12) greetingText = "Good Morning";
    else if (hour < 17) greetingText = "Good Afternoon";
    else greetingText = "Good Evening";
    
    setGreeting(greetingText);
    
    // Get user name from local storage
    const storedUser = localStorage.getItem("skoopa-user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.firstName) {
          setUserName(user.firstName);
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }, []);

  // Animation variants for the greeting text
  const textVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className={`${className}`}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.div 
        className="relative mb-1"
        variants={textVariants}
      >
        {/* Decorative element */}
        <div className="absolute -top-6 -left-2 w-12 h-12 bg-azure/20 rounded-full blur-xl -z-10"></div>
        
        <h1 className="text-2xl font-bold text-charcoal flex items-center">
          {greeting}, {" "}
          <motion.span 
            className="relative ml-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="relative z-10 bg-gradient-to-r from-coral via-gold to-coral bg-clip-text text-transparent">
              {userName}
            </span>
            <motion.span 
              className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-coral/30 via-gold/30 to-coral/30 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.5 }}
            ></motion.span>
          </motion.span>
          
          {/* Decorative sparkle */}
          <motion.svg 
            className="w-4 h-4 ml-1 text-gold"
            viewBox="0 0 24 24" 
            fill="currentColor"
            initial={{ opacity: 0, rotate: -30, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </motion.svg>
        </h1>
        
        <motion.p 
          className="text-steel text-sm mt-1"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          What premium service do you need today?
        </motion.p>
      </motion.div>
      
      {/* Decorative line with animation */}
      <motion.div 
        className="h-0.5 w-16 bg-gradient-to-r from-coral/50 to-transparent rounded-full mt-2"
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      ></motion.div>
    </motion.div>
  );
};

export default UserGreeting;
