import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, ChevronRight, ArrowLeft } from "lucide-react";
import SkoopaLogo from "@/components/SkoopaLogo";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleContinue = () => {
    if (loginMethod === "phone" && !phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    if (loginMethod === "email" && !email) {
      toast.error("Please enter your email");
      return;
    }

    if (!showOtp) {
      setShowOtp(true);
      toast.success(`OTP sent to your ${loginMethod === "phone" ? "phone" : "email"}`);
      return;
    }

    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    // For demo purposes, we'll just navigate to home
    localStorage.setItem("skoopa-user", JSON.stringify({
      firstName: "Rahul",
      lastName: "Sharma",
      phoneNumber: phoneNumber || "9876543210",
      email: email || "user@example.com",
      isLoggedIn: true
    }));
    
    // Directly navigate without showing success toast
    window.location.href = "/";
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
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
            onClick={() => setLoginMethod("phone")}
          >
            Phone
          </button>
          <button 
            className={`flex-1 py-2 text-center rounded-md relative z-10 transition-colors duration-300 ${loginMethod === "email" ? "text-white font-medium" : "text-steel"}`}
            onClick={() => setLoginMethod("email")}
          >
            Email
          </button>
        </motion.div>
        
        {/* Input fields */}
        <motion.div 
          className="space-y-4"
          variants={itemVariants}
        >
          {!showOtp ? (
            loginMethod === "phone" ? (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steel w-5 h-5" />
                <span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-charcoal font-medium">+91</span>
                <Input 
                  type="tel" 
                  placeholder="Phone number" 
                  className="pl-24 border-azure/50 focus:border-coral py-6"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
              <p className="text-sm text-charcoal">
                Enter the OTP sent to {loginMethod === "phone" ? `+91 ${phoneNumber}` : email}
              </p>
              <div className="flex justify-between gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Input
                      type="tel"
                      maxLength={1}
                      className="w-14 h-14 text-center text-lg border-azure/50 focus:border-coral"
                      value={otp[i] || ""}
                      onChange={(e) => {
                        const newOtp = otp.split("");
                        newOtp[i] = e.target.value;
                        setOtp(newOtp.join(""));
                        
                        // Auto-focus next input
                        if (e.target.value && i < 3) {
                          const nextInput = document.querySelector(`input[name="otp-${i+1}"]`);
                          if (nextInput) (nextInput as HTMLInputElement).focus();
                        }
                      }}
                      name={`otp-${i}`}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <button 
                  className="text-coral text-sm font-medium"
                  onClick={() => setShowOtp(false)}
                >
                  Change {loginMethod}
                </button>
                <button 
                  className="text-coral text-sm font-medium"
                  onClick={() => toast.success("OTP resent")}
                >
                  Resend OTP
                </button>
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
            >
              {showOtp ? "Verify & Login" : "Continue"} 
              <ChevronRight size={18} />
            </Button>
          </motion.div>
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
