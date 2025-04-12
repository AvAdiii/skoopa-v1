
import { Link } from "react-router-dom";
import { Bell, Coins } from "lucide-react";
import SkoopaLogo from "@/components/SkoopaLogo";
import SkoopsPopup from "@/components/SkoopsPopup";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface MaidHeaderProps {
  notificationCount?: number;
  skoops?: number;
  level?: number;
}

const MaidHeader = ({ notificationCount = 3, skoops = 230, level = 3 }: MaidHeaderProps) => {
  const { language } = useLanguage();

  const translations = {
    en: {
      skoops: "Skoops"
    },
    te: {
      skoops: "స్కూప్స్"
    }
  };

  const t = translations[language];

  return (
    <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
      <div className="flex items-center justify-between">
        <SkoopaLogo />
        <div className="flex items-center gap-3">
          <SkoopsPopup skoops={skoops} level={level} variant="maid">
            <motion.div
              className="flex items-center bg-gold/20 rounded-full px-2 py-1 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Coins className="text-gold h-4 w-4 mr-1" />
              <span className="font-semibold text-gold text-xs">
                {skoops} {t.skoops}
              </span>
            </motion.div>
          </SkoopsPopup>
          <Link to="/maid/notifications" className="relative p-2">
            <Bell size={28} className="text-charcoal" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-coral text-white rounded-full flex items-center justify-center text-xs font-bold">
                {notificationCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaidHeader;
