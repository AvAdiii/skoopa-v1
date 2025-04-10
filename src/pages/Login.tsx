
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, ChevronRight, ArrowLeft } from "lucide-react";
import SkoopaLogo from "@/components/SkoopaLogo";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // Store user info in localStorage for easy access
        localStorage.setItem("skoopa-user", JSON.stringify({
          id: session.user.id,
          email: session.user.email,
          phoneNumber: session.user.phone,
          isLoggedIn: true
        }));
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignInWithEmail = async () => {
    try {
      setLoading(true);
      
      if (!email) {
        toast.error("Please enter your email");
        return;
      }
      
      if (!password) {
        toast.error("Please enter your password");
        return;
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Auth state change listener will handle redirect
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpWithEmail = async () => {
    try {
      setLoading(true);
      
      if (!email) {
        toast.error("Please enter your email");
        return;
      }
      
      if (!password) {
        toast.error("Please enter your password");
        return;
      }
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: "",
            last_name: "",
            phone_number: phoneNumber
          }
        }
      });

      if (error) throw error;
      
      toast.success("Sign up successful! Please check your email for verification.");
    } catch (error: any) {
      toast.error(error.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

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
      if (loginMethod === "email") {
        // When email field is shown, we'll also show password field
        return;
      }
      
      toast.success(`OTP sent to your ${loginMethod === "phone" ? "phone" : "email"}`);
      return;
    }

    if (loginMethod === "email") {
      handleSignInWithEmail();
    } else {
      // Phone auth would be handled here
      // For now, let's show an info message
      toast.info("Phone authentication will be implemented soon.");
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
          ) : loginMethod === "email" ? (
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
                  onClick={() => setShowOtp(false)}
                >
                  Change {loginMethod}
                </button>
                <button 
                  className="text-coral text-sm font-medium"
                  onClick={() => handleSignUpWithEmail()}
                >
                  Sign Up Instead
                </button>
              </div>
            </motion.div>
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
              disabled={loading}
            >
              {loading ? "Please wait..." : showOtp ? (loginMethod === "email" ? "Login" : "Verify & Login") : "Continue"} 
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
