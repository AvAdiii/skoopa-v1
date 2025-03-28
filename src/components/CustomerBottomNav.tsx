
import { Home, User, Calendar, CreditCard, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const CustomerBottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: Calendar, label: "Bookings", path: "/bookings" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-smoke z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-2 px-3 transition-colors relative",
              isActive(item.path)
                ? "text-coral font-medium"
                : "text-steel"
            )}
          >
            {isActive(item.path) && (
              <motion.div
                layoutId="navIndicator"
                className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-coral"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <item.icon
              size={24}
              className={cn(
                "transition-transform", 
                isActive(item.path) ? "text-coral scale-110" : "text-steel"
              )}
            />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default CustomerBottomNav;
