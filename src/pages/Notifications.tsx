
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomerBottomNav from "@/components/CustomerBottomNav";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: "booking" | "payment" | "promo" | "system";
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Booking Confirmed",
      message: "Your daily cleaning booking has been confirmed for today at 2:00 PM",
      time: "10 mins ago",
      isRead: false,
      type: "booking"
    },
    {
      id: "2",
      title: "Payment Due",
      message: "Your monthly subscription payment is due in 3 days",
      time: "2 hours ago",
      isRead: false,
      type: "payment"
    },
    {
      id: "3",
      title: "Special Discount",
      message: "Get 20% off on your next kitchen cleaning service. Use code CLEAN20",
      time: "Yesterday",
      isRead: true,
      type: "promo"
    },
    {
      id: "4",
      title: "New Feature",
      message: "You can now schedule recurring cleaning services. Try it now!",
      time: "3 days ago",
      isRead: true,
      type: "system"
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "booking":
        return (
          <div className="bg-azure/80 w-10 h-10 rounded-full flex items-center justify-center text-sapphire">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect x="3" y="6" width="18" height="16" rx="2"></rect>
              <path d="M3 10h18"></path>
              <path d="M8 14h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M16 18h.01"></path>
            </svg>
          </div>
        );
      case "payment":
        return (
          <div className="bg-gold/80 w-10 h-10 rounded-full flex items-center justify-center text-sapphire">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="6" width="20" height="12" rx="2"></rect>
              <path d="M22 10H2"></path>
              <path d="M6 14h.01"></path>
              <path d="M6 18h12"></path>
            </svg>
          </div>
        );
      case "promo":
        return (
          <div className="bg-coral/80 w-10 h-10 rounded-full flex items-center justify-center text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-smoke w-10 h-10 rounded-full flex items-center justify-center text-steel">
            <Bell size={20} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white py-3 px-4 border-b border-smoke flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-smoke/50"
        >
          <ArrowLeft size={20} className="text-charcoal" />
        </button>
        <h1 className="text-lg font-bold text-sapphire mx-auto">Notifications</h1>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="w-20 h-20 rounded-full bg-smoke/30 flex items-center justify-center mb-4">
            <Bell size={32} className="text-steel" />
          </div>
          <h2 className="text-lg font-medium text-charcoal">No notifications</h2>
          <p className="text-steel text-sm mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="px-4 py-3">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={`mb-3 p-3 rounded-xl border ${notification.isRead ? 'border-smoke bg-white' : 'border-coral/30 bg-azure/5'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  {getIconForType(notification.type)}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium ${notification.isRead ? 'text-charcoal' : 'text-sapphire font-semibold'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-steel">{notification.time}</span>
                    </div>
                    <p className="text-sm text-steel mt-1">{notification.message}</p>
                  </div>
                </div>
                {!notification.isRead && (
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-coral rounded-full"></div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Notifications;
