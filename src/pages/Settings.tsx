
import { ArrowLeft, ChevronRight, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  
  const translations = {
    en: {
      settings: "Settings",
      darkMode: "Dark Mode",
      darkModeDesc: "Use dark theme",
      notifications: "Push Notifications",
      notificationsDesc: "Receive booking updates",
      language: "Language",
      english: "English",
      telugu: "Telugu",
      privacy: "Privacy Policy",
      privacyDesc: "Read our privacy policy",
      terms: "Terms of Service",
      termsDesc: "Read our terms of service",
      delete: "Delete Account",
      version: "App Version 1.0.0",
      selectLanguage: "Select Language",
      cancel: "Cancel",
      save: "Save"
    },
    te: {
      settings: "సెట్టింగ్‌లు",
      darkMode: "డార్క్ మోడ్",
      darkModeDesc: "డార్క్ థీమ్ ఉపయోగించండి",
      notifications: "నోటిఫికేషన్‌లు",
      notificationsDesc: "బుకింగ్ నవీకరణలను స్వీకరించండి",
      language: "భాష",
      english: "ఇంగ్లీష్",
      telugu: "తెలుగు",
      privacy: "గోప్యతా విధానం",
      privacyDesc: "మా గోప్యతా విధానాన్ని చదవండి",
      terms: "సేవా నియమాలు",
      termsDesc: "మా సేవా నియమాలను చదవండి",
      delete: "ఖాతాను తొలగించండి",
      version: "యాప్ వెర్షన్ 1.0.0",
      selectLanguage: "భాషను ఎంచుకోండి",
      cancel: "రద్దు చేయండి",
      save: "సేవ్ చేయండి"
    }
  };

  const t = translations[language];

  const handleLanguageChange = (newLanguage: "en" | "te") => {
    setLanguage(newLanguage);
    setShowLanguageDialog(false);
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-sapphire">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-sapphire">{t.settings}</h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-lg border border-smoke overflow-hidden mb-4">
          <div className="flex items-center justify-between p-4 border-b border-smoke">
            <div>
              <h3 className="font-medium text-charcoal">{t.darkMode}</h3>
              <p className="text-sm text-steel">{t.darkModeDesc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-smoke peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border-b border-smoke">
            <div>
              <h3 className="font-medium text-charcoal">{t.notifications}</h3>
              <p className="text-sm text-steel">{t.notificationsDesc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-smoke peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
            </label>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Languages size={20} className="text-sapphire" />
                  <div>
                    <h3 className="font-medium text-charcoal">{t.language}</h3>
                    <p className="text-sm text-steel">{language === "en" ? t.english : t.telugu}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-steel" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.selectLanguage}</DialogTitle>
              </DialogHeader>
              <RadioGroup value={language} className="mt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="en" id="en" onClick={() => handleLanguageChange("en")} />
                  <Label htmlFor="en" className="font-medium">{t.english}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="te" id="te" onClick={() => handleLanguageChange("te")} />
                  <Label htmlFor="te" className="font-medium">{t.telugu}</Label>
                </div>
              </RadioGroup>
              <div className="flex justify-end gap-3 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">{t.cancel}</Button>
                </DialogClose>
                <Button 
                  onClick={() => handleLanguageChange(language)}
                  className="bg-coral hover:bg-coral/90"
                >
                  {t.save}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors">
            <div>
              <h3 className="font-medium text-charcoal">{t.privacy}</h3>
              <p className="text-sm text-steel">{t.privacyDesc}</p>
            </div>
            <ChevronRight size={18} className="text-steel" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors">
            <div>
              <h3 className="font-medium text-charcoal">{t.terms}</h3>
              <p className="text-sm text-steel">{t.termsDesc}</p>
            </div>
            <ChevronRight size={18} className="text-steel" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors text-red-500">
            <h3 className="font-medium">{t.delete}</h3>
            <ChevronRight size={18} />
          </button>
        </div>
        
        <p className="text-center text-xs text-steel mt-4">
          {t.version}
        </p>
      </div>
    </div>
  );
};

export default Settings;
