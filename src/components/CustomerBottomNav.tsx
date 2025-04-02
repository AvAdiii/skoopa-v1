
import { Home, Calendar, CreditCard, MessageSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const CustomerBottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Bookings", path: "/bookings" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl border-t border-[#F0F0F5] z-50 px-4 py-2 shadow-[0_-5px_25px_-5px_rgba(0,0,0,0.05)]"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "bottom-nav-item",
              isActive(item.path) ? "text-primary bottom-nav-active" : "text-muted-foreground"
            )}
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={cn(
                "bottom-nav-icon",
                isActive(item.path) && "bottom-nav-active"
              )}
            >
              <item.icon size={22} />
            </motion.div>
            <span className="text-xs font-medium">{item.label}</span>
            
            {isActive(item.path) && (
              <motion.div
                layoutId="navIndicator"
                className="absolute -top-1 w-1 h-1 rounded-full bg-primary"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default CustomerBottomNav;
