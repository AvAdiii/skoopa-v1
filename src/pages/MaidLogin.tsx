
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, ChevronRight, ArrowLeft } from "lucide-react";
import SkoopaLogo from "@/components/SkoopaLogo";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// Dummy credentials for maid login
const DUMMY_MAID_PHONE = "987654321";
const DUMMY_MAID_PASSWORD = "maid1234";

const MaidLogin = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      maidLogin: "Maid Login",
      loginSubtext: "Login to start receiving cleaning jobs",
      phoneNumber: "Phone number",
      password: "Password",
      changePhone: "Change phone number",
      forgotPassword: "Forgot password?",
      continue: "Continue",
      login: "Login",
      demoPhone: "Demo phone: 987654321",
      demoPassword: "Demo password: maid1234",
      enterPassword: "Enter password for +91",
      terms: "By continuing, you agree to our",
      termsLink: "Terms of Service",
      privacy: "Privacy Policy",
      needHelp: "Need help? Contact",
      supportEmail: "support@skoopa.com",
      loginSuccess: "Login successful!"
    },
    te: {
      maidLogin: "మెయిడ్ లాగిన్",
      loginSubtext: "క్లీనింగ్ జాబ్‌లు స్వీకరించడం ప్రారంభించడానికి లాగిన్ చేయండి",
      phoneNumber: "ఫోన్ నంబర్",
      password: "పాస్‌వర్డ్",
      changePhone: "ఫోన్ నంబర్‌ను మార్చండి",
      forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
      continue: "కొనసాగించండి",
      login: "లాగిన్",
      demoPhone: "డెమో ఫోన్: 987654321",
      demoPassword: "డెమో పాస్‌వర్డ్: maid1234",
      enterPassword: "+91 కోసం పాస్‌వర్డ్‌ని నమోదు చేయండి",
      terms: "కొనసాగించడం ద్వారా, మీరు మా",
      termsLink: "సేవా నియమాలు",
      privacy: "గోప్యతా విధానం",
      needHelp: "సహాయం కావాలా? సంప్రదించండి",
      supportEmail: "support@skoopa.com",
      loginSuccess: "లాగిన్ విజయవంతమైంది!"
    }
  };

  const t = translations[language];

  useEffect(() => {
    // Check if maid is already logged in
    const maid = localStorage.getItem("skoopa-maid");
    if (maid) {
      navigate("/maid");
    }
  }, [navigate]);

  const handleContinue = () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return;
    }

    if (!showPassword) {
      setShowPassword(true);
      return;
    }

    if (!password) {
      toast({
        title: "Error",
        description: "Please enter the password",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // Check dummy maid credentials
      if (phoneNumber !== DUMMY_MAID_PHONE) {
        toast({
          title: "Error",
          description: "Invalid phone number. Try 987654321",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      if (password !== DUMMY_MAID_PASSWORD) {
        toast({
          title: "Error",
          description: "Invalid password. Try maid1234",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      // Store maid info in localStorage
      localStorage.setItem("skoopa-maid", JSON.stringify({
        id: "dummy-maid-id",
        phoneNumber: phoneNumber,
        isLoggedIn: true,
        skoops: 230, // Initialize with some Skoops
        skoop_level: 3, // Initial level
        rating: 4.8,
        name: "Lakshmi Devi"
      }));
      
      toast({
        title: t.loginSuccess,
        description: new Date().toLocaleTimeString(),
      });
      
      // Navigate immediately without timeout
      navigate("/maid");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Login failed",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate("/login");
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
          onClick={handleBackClick}
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
        <h1 className="text-2xl font-bold text-sapphire mb-1">{t.maidLogin}</h1>
        <p className="text-steel mb-6">{t.loginSubtext}</p>
        
        {/* Input fields */}
        <div className="space-y-4">
          {!showPassword ? (
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steel w-5 h-5" />
              <span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-steel">+91</span>
              <Input 
                type="tel" 
                placeholder={t.phoneNumber}
                className="pl-24"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-charcoal">
                {t.enterPassword} {phoneNumber}
              </p>
              <Input 
                type="password" 
                placeholder={t.password}
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <button 
                  className="text-coral text-sm font-medium"
                  onClick={() => setShowPassword(false)}
                >
                  {t.changePhone}
                </button>
                <button 
                  className="text-coral text-sm font-medium"
                  onClick={() => toast({
                    title: t.demoPassword,
                  })}
                >
                  {t.forgotPassword}
                </button>
              </div>
            </div>
          )}
          
          <Button 
            className="w-full bg-coral hover:bg-coral/90 gap-2 text-base py-6"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Please wait..." : showPassword ? t.login : t.continue} 
            <ChevronRight size={18} />
          </Button>
          
          {!showPassword && (
            <p className="text-sm text-center text-steel mt-2">
              {t.demoPhone}
            </p>
          )}
        </div>
        
        {/* Terms and conditions */}
        <p className="text-xs text-steel text-center mt-6">
          {t.terms} <span className="text-coral">{t.termsLink}</span> {t.privacy}
        </p>
      </motion.div>
      
      {/* Help text */}
      <div className="mt-auto text-center pt-6">
        <p className="text-sm text-steel">{t.needHelp} <span className="text-coral">{t.supportEmail}</span></p>
      </div>
    </motion.div>
  );
};

export default MaidLogin;
