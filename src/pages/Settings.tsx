
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-sapphire">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-sapphire">{t("settings")}</h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-lg border border-smoke overflow-hidden mb-4">
          <div className="flex items-center justify-between p-4 border-b border-smoke">
            <div>
              <h3 className="font-medium text-charcoal">{t("darkMode")}</h3>
              <p className="text-sm text-steel">{t("useDarkTheme")}</p>
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
              <h3 className="font-medium text-charcoal">{t("pushNotifications")}</h3>
              <p className="text-sm text-steel">{t("receiveBookingUpdates")}</p>
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
                <div>
                  <h3 className="font-medium text-charcoal">{t("language")}</h3>
                  <p className="text-sm text-steel">
                    {language === "english" ? "English" : "తెలుగు"}
                  </p>
                </div>
                <ChevronRight size={18} className="text-steel" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t("selectLanguage")}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-4 py-4">
                <button
                  className={`flex items-center p-4 rounded-lg border-2 ${
                    language === "english" ? "border-sapphire bg-azure/10" : "border-smoke"
                  }`}
                  onClick={() => setLanguage("english")}
                >
                  <div className="flex-1 text-left">
                    <h3 className="font-medium">English</h3>
                    <p className="text-sm text-steel">English (US)</p>
                  </div>
                  {language === "english" && (
                    <div className="w-6 h-6 bg-sapphire rounded-full flex items-center justify-center text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </button>
                
                <button
                  className={`flex items-center p-4 rounded-lg border-2 ${
                    language === "telugu" ? "border-sapphire bg-azure/10" : "border-smoke"
                  }`}
                  onClick={() => setLanguage("telugu")}
                >
                  <div className="flex-1 text-left">
                    <h3 className="font-medium">తెలుగు</h3>
                    <p className="text-sm text-steel">Telugu</p>
                  </div>
                  {language === "telugu" && (
                    <div className="w-6 h-6 bg-sapphire rounded-full flex items-center justify-center text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </DialogContent>
          </Dialog>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors">
            <div>
              <h3 className="font-medium text-charcoal">{t("privacyPolicy")}</h3>
              <p className="text-sm text-steel">{t("readPrivacyPolicy")}</p>
            </div>
            <ChevronRight size={18} className="text-steel" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors">
            <div>
              <h3 className="font-medium text-charcoal">{t("termsOfService")}</h3>
              <p className="text-sm text-steel">{t("readTermsOfService")}</p>
            </div>
            <ChevronRight size={18} className="text-steel" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors text-red-500">
            <h3 className="font-medium">{t("deleteAccount")}</h3>
            <ChevronRight size={18} />
          </button>
        </div>
        
        <p className="text-center text-xs text-steel mt-4">
          {t("appVersion")} 1.0.0
        </p>
      </div>
    </div>
  );
};

export default Settings;
