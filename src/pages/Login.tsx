import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, ChevronRight } from "lucide-react";
import SkoopaLogo from "@/components/SkoopaLogo";
import { toast } from "@/hooks/use-toast";

// Dummy credentials for login
const DUMMY_PHONE = "123456789";
const DUMMY_PASSWORD = "abcd1234";
const DUMMY_EMAIL = "test@example.com";

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Define the staggerVariants
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("skoopa-user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleDummyLogin = () => {
    try {
      setLoading(true);
      
      if (loginMethod === "phone") {
        if (phoneNumber !== DUMMY_PHONE) {
          toast({
            title: "Error",
            description: "Invalid phone number. Try 123456789",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        if (!password || password !== DUMMY_PASSWORD) {
          toast({
            title: "Error",
            description: "Invalid password. Try abcd1234",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
      } else { // email login
        if (email !== DUMMY_EMAIL) {
          toast({
            title: "Error",
            description: "Invalid email. Try test@example.com",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        if (!password || password !== DUMMY_PASSWORD) {
          toast({
            title: "Error",
            description: "Invalid password. Try abcd1234",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
      }
      
      // Store dummy user info in localStorage
      localStorage.setItem("skoopa-user", JSON.stringify({
        id: "dummy-user-id",
        email: loginMethod === "email" ? email : DUMMY_EMAIL,
        phoneNumber: loginMethod === "phone" ? phoneNumber : DUMMY_PHONE,
        isLoggedIn: true,
        skoops: 150, // Initialize with some Skoops
        skoop_level: 2, // Initial level
      }));
      
      toast({
        title: "Success",
        description: "Login successful",
      });
      
      // Navigate to home page - removing setTimeout to fix automatic redirection
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      handleDummyLogin();
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-azure/20 to-white px-4 pb-8 pt-12 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background patterns - Indian inspired */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-dot-pattern opacity-10 z-0"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-dot-pattern opacity-10 z-0 rotate-180"></div>
      
      <motion.div 
        className="absolute top-16 right-8 w-20 h-20 rounded-full bg-gold/10 z-0"
        animate={{ 
          y: [0, -10, 0], 
          opacity: [0.1, 0.3, 0.1] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-24 left-8 w-16 h-16 rounded-full bg-coral/10 z-0"
        animate={{ 
          y: [0, 10, 0], 
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      ></motion.div>
      
      {/* Header */}
      <motion.div 
        className="flex justify-center mb-6"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <SkoopaLogo variant="full" animated />
      </motion.div>
      
      {/* Main content */}
      <motion.div 
        className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-6 relative z-10 mt-4"
        variants={staggerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="relative h-1.5 w-24 bg-smoke rounded-full mx-auto mb-4 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-coral rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            ></motion.div>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-2xl font-bold text-sapphire mb-1"
          variants={itemVariants}
        >
          Welcome to Skoopa
        </motion.h1>
        
        <motion.p 
          className="text-steel mb-6"
          variants={itemVariants}
        >
          Login to continue to premium housemaid services
        </motion.p>
        
        {/* Login method toggle with improved animation */}
        <motion.div 
          className="flex border border-smoke rounded-lg mb-6 p-1 relative overflow-hidden"
          variants={itemVariants}
        >
          <div 
            className={`absolute top-1 bottom-1 ${loginMethod === "phone" ? "left-1" : "right-1"} w-[calc(50%-2px)] bg-coral rounded-md transition-all duration-300`} 
          ></div>
          <button 
            className={`flex-1 py-2 text-center rounded-md relative z-10 transition-colors duration-300 ${loginMethod === "phone" ? "text-white font-medium" : "text-steel"}`} 
            onClick={() => {
              setLoginMethod("phone");
              setShowPassword(false);
            }}
          >
            Phone
          </button>
          <button 
            className={`flex-1 py-2 text-center rounded-md relative z-10 transition-colors duration-300 ${loginMethod === "email" ? "text-white font-medium" : "text-steel"}`}
            onClick={() => {
              setLoginMethod("email");
              setShowPassword(false);
            }}
          >
            Email
          </button>
        </motion.div>
        
        {/* Input fields */}
        <motion.div 
          className="space-y-4"
          variants={itemVariants}
        >
          {!showPassword ? (
            loginMethod === "phone" ? (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steel w-5 h-5" />
                <span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-charcoal font-medium">+91</span>
                <Input 
                  type="tel" 
                  placeholder="Phone number" 
                  className="pl-24 border-azure/50 focus:border-coral py-6"
                  value={phoneNumber}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) {
                      setPhoneNumber(value);
                    }
                  }}
                  maxLength={10}
                />
              </div>
            ) : (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steel w-5 h-5" />
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="pl-10 border-azure/50 focus:border-coral py-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )
          ) : (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Input 
                type="password" 
                placeholder="Enter your password" 
                className="border-azure/50 focus:border-coral py-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <button 
                  className="text-coral text-sm font-medium"
                  onClick={() => setShowPassword(false)}
                >
                  Change {loginMethod}
                </button>
                <div className="text-steel text-sm">
                  Demo password: abcd1234
                </div>
              </div>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Button 
              className="w-full bg-gradient-to-r from-coral to-coral/90 hover:from-coral/90 hover:to-coral gap-2 text-base py-6 shadow-md"
              onClick={handleContinue}
              disabled={loading}
            >
              {loading ? "Please wait..." : showPassword ? "Login" : "Continue"} 
              <ChevronRight size={18} />
            </Button>
          </motion.div>
          
          {/* Demo credentials */}
          {!showPassword && (
            <motion.div 
              className="text-sm text-center text-steel mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {loginMethod === "phone" ? (
                <span>Demo phone: 123456789</span>
              ) : (
                <span>Demo email: test@example.com</span>
              )}
            </motion.div>
          )}
        </motion.div>
        
        {/* Indian-inspired decoration */}
        <motion.div 
          className="mt-6 flex items-center justify-center gap-2"
          variants={itemVariants}
        >
          <div className="h-px bg-smoke flex-1"></div>
          <div className="w-2 h-2 rounded-full bg-coral/30"></div>
          <div className="w-2 h-2 rounded-full bg-coral/60"></div>
          <div className="w-2 h-2 rounded-full bg-coral"></div>
          <div className="w-2 h-2 rounded-full bg-coral/60"></div>
          <div className="w-2 h-2 rounded-full bg-coral/30"></div>
          <div className="h-px bg-smoke flex-1"></div>
        </motion.div>
        
        {/* Terms and conditions */}
        <motion.p 
          className="text-xs text-steel text-center mt-3"
          variants={itemVariants}
        >
          By continuing, you agree to our <span className="text-coral">Terms of Service</span> and <span className="text-coral">Privacy Policy</span>
        </motion.p>
      </motion.div>
      
      {/* Switch to maid interface */}
      <motion.div 
        className="mt-auto text-center pt-6"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <button 
          className="text-sapphire font-medium text-sm rounded-full border border-smoke px-4 py-2 inline-flex items-center gap-2 bg-white/80 shadow-sm hover:bg-white transition-colors"
          onClick={() => navigate("/maid-login")}
        >
          <span className="w-3 h-3 rounded-full bg-gold/70"></span>
          Login as Maid
          <span className="w-3 h-3 rounded-full bg-gold/70"></span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Login;
