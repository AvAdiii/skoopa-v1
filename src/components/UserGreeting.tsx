
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
  
  return (
    <motion.div 
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-charcoal">
        {greeting}, <span className="bg-gradient-to-r from-coral to-gold bg-clip-text text-transparent">{userName}</span>
      </h1>
      <p className="text-steel text-sm">What service do you need today?</p>
    </motion.div>
  );
};

export default UserGreeting;
