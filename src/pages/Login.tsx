
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, ChevronRight } from "lucide-react";
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
    
    toast.success("Login successful!");
    navigate("/");
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
      <div className="flex justify-center mb-8">
        <SkoopaLogo />
      </div>
      
      {/* Login container */}
      <motion.div 
        className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-6 relative z-10 mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-sapphire mb-1">Welcome</h1>
        <p className="text-steel mb-6">Login to continue using Skoopa</p>
        
        {/* Login method toggle */}
        <div className="flex border border-smoke rounded-lg mb-6 p-1">
          <button 
            className={`flex-1 py-2 text-center rounded-md ${loginMethod === "phone" ? "bg-coral text-white" : "text-steel"}`} 
            onClick={() => setLoginMethod("phone")}
          >
            Phone
          </button>
          <button 
            className={`flex-1 py-2 text-center rounded-md ${loginMethod === "email" ? "bg-coral text-white" : "text-steel"}`}
            onClick={() => setLoginMethod("email")}
          >
            Email
          </button>
        </div>
        
        {/* Input fields */}
        <div className="space-y-4">
          {!showOtp ? (
            loginMethod === "phone" ? (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steel w-5 h-5" />
                <Input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  className="pl-10"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
                />
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
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steel w-5 h-5" />
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-charcoal">
                Enter the OTP sent to {loginMethod === "phone" ? `+91 ${phoneNumber}` : email}
              </p>
              <div className="flex justify-between gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <Input
                    key={i}
                    type="tel"
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg"
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
            </div>
          )}
          
          <Button 
            className="w-full bg-coral hover:bg-coral/90 gap-2 text-base py-6"
            onClick={handleContinue}
          >
            {showOtp ? "Verify & Login" : "Continue"} 
            <ChevronRight size={18} />
          </Button>
        </div>
        
        {/* Terms and conditions */}
        <p className="text-xs text-steel text-center mt-6">
          By continuing, you agree to our <span className="text-coral">Terms of Service</span> and <span className="text-coral">Privacy Policy</span>
        </p>
      </motion.div>
      
      {/* Switch to maid interface */}
      <div className="mt-auto text-center pt-6">
        <button 
          className="text-sapphire font-medium text-sm rounded-full border border-smoke px-4 py-2 inline-flex items-center"
          onClick={() => navigate("/maid-login")}
        >
          Login as Maid
        </button>
      </div>
    </motion.div>
  );
};

export default Login;
