
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, ChevronRight, ArrowLeft } from "lucide-react";
import SkoopaLogo from "@/components/SkoopaLogo";
import { toast } from "sonner";

// Dummy credentials for maid login
const DUMMY_MAID_PHONE = "987654321";
const DUMMY_MAID_PASSWORD = "maid1234";

const MaidLogin = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if maid is already logged in
    const maid = localStorage.getItem("skoopa-maid");
    if (maid) {
      navigate("/maid");
    }
  }, [navigate]);

  const handleContinue = () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!showPassword) {
      setShowPassword(true);
      toast.success("Please enter your password");
      return;
    }

    if (!password) {
      toast.error("Please enter the password");
      return;
    }

    try {
      setLoading(true);
      
      // Check dummy maid credentials
      if (phoneNumber !== DUMMY_MAID_PHONE) {
        toast.error("Invalid phone number. Try 987654321");
        setLoading(false);
        return;
      }
      
      if (password !== DUMMY_MAID_PASSWORD) {
        toast.error("Invalid password. Try maid1234");
        setLoading(false);
        return;
      }
      
      // Store maid info in localStorage
      localStorage.setItem("skoopa-maid", JSON.stringify({
        id: "dummy-maid-id",
        phoneNumber: phoneNumber,
        isLoggedIn: true
      }));
      
      toast.success("Login successful!");
      
      // Navigate to maid dashboard
      setTimeout(() => {
        navigate("/maid");
      }, 500);
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-white to-azure/30 px-4 pb-8 pt-12 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-64 bg-indian-pattern opacity-10 z-0"></div>
      
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate("/login")}
          className="mr-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-smoke/50"
        >
          <ArrowLeft size={20} className="text-charcoal" />
        </button>
        <SkoopaLogo />
      </div>
      
      {/* Login container */}
      <motion.div 
        className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-6 relative z-10 mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-sapphire mb-1">Maid Login</h1>
        <p className="text-steel mb-6">Login to start receiving cleaning jobs</p>
        
        {/* Input fields */}
        <div className="space-y-4">
          {!showPassword ? (
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steel w-5 h-5" />
              <span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-steel">+91</span>
              <Input 
                type="tel" 
                placeholder="Phone number" 
                className="pl-24"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-charcoal">
                Enter password for +91 {phoneNumber}
              </p>
              <Input 
                type="password" 
                placeholder="Password" 
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <button 
                  className="text-coral text-sm font-medium"
                  onClick={() => setShowPassword(false)}
                >
                  Change phone number
                </button>
                <button 
                  className="text-coral text-sm font-medium"
                  onClick={() => toast.info("Demo password: maid1234")}
                >
                  Forgot password?
                </button>
              </div>
            </div>
          )}
          
          <Button 
            className="w-full bg-coral hover:bg-coral/90 gap-2 text-base py-6"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Please wait..." : showPassword ? "Login" : "Continue"} 
            <ChevronRight size={18} />
          </Button>
          
          {!showPassword && (
            <p className="text-sm text-center text-steel mt-2">
              Demo phone: 987654321
            </p>
          )}
        </div>
        
        {/* Terms and conditions */}
        <p className="text-xs text-steel text-center mt-6">
          By continuing, you agree to our <span className="text-coral">Terms of Service</span> and <span className="text-coral">Privacy Policy</span>
        </p>
      </motion.div>
      
      {/* Help text */}
      <div className="mt-auto text-center pt-6">
        <p className="text-sm text-steel">Need help? Contact <span className="text-coral">support@skoopa.com</span></p>
      </div>
    </motion.div>
  );
};

export default MaidLogin;
