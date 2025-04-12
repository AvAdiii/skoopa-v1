
import { Home, CalendarCheck, CreditCard, MessageSquare, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const CustomerBottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: "/home",  // Updated to use the specific home route
      active: currentPath === "/home" || currentPath === "/"
    },
    {
      label: "Bookings",
      icon: CalendarCheck,
      href: "/bookings",
      active: currentPath.includes("/bookings") || 
             currentPath.includes("/track-booking") ||
             currentPath.includes("/reschedule-booking") ||
             currentPath.includes("/review-booking")
    },
    {
      label: "Payments",
      icon: CreditCard,
      href: "/payments",
      active: currentPath.includes("/payments") || currentPath.includes("/add-payment-method")
    },
    {
      label: "Chat",
      icon: MessageSquare,
      href: "/chat",
      active: currentPath.includes("/chat")
    },
    {
      label: "Profile",
      icon: UserCircle,
      href: "/profile",
      active: currentPath.includes("/profile") || 
             currentPath.includes("/settings") ||
             currentPath.includes("/my-addresses") ||
             currentPath.includes("/favorite-maids") ||
             currentPath.includes("/help-support") ||
             currentPath.includes("/about")
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-smoke flex items-center justify-between px-2 pb-1 pt-1">
      {navItems.map((item, index) => (
        <Link 
          key={index} 
          to={item.href}
          className={cn(
            "flex flex-col items-center justify-center p-2 min-w-[64px] rounded-lg transition-colors",
            item.active ? "text-coral" : "text-steel"
          )}
        >
          <item.icon 
            className={cn(
              "w-6 h-6",
              item.active ? "text-coral" : "text-steel"
            )} 
          />
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default CustomerBottomNav;
