
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-sapphire">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-sapphire">Settings</h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-lg border border-smoke overflow-hidden mb-4">
          <div className="flex items-center justify-between p-4 border-b border-smoke">
            <div>
              <h3 className="font-medium text-charcoal">Dark Mode</h3>
              <p className="text-sm text-steel">Use dark theme</p>
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
              <h3 className="font-medium text-charcoal">Push Notifications</h3>
              <p className="text-sm text-steel">Receive booking updates</p>
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
          
          <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors">
            <div>
              <h3 className="font-medium text-charcoal">Language</h3>
              <p className="text-sm text-steel">English</p>
            </div>
            <ChevronRight size={18} className="text-steel" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors">
            <div>
              <h3 className="font-medium text-charcoal">Privacy Policy</h3>
              <p className="text-sm text-steel">Read our privacy policy</p>
            </div>
            <ChevronRight size={18} className="text-steel" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors">
            <div>
              <h3 className="font-medium text-charcoal">Terms of Service</h3>
              <p className="text-sm text-steel">Read our terms of service</p>
            </div>
            <ChevronRight size={18} className="text-steel" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors text-red-500">
            <h3 className="font-medium">Delete Account</h3>
            <ChevronRight size={18} />
          </button>
        </div>
        
        <p className="text-center text-xs text-steel mt-4">
          App Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default Settings;
