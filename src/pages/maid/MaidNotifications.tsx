
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BellRing, CheckCircle, Clock, Calendar, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SkoopaLogo from "@/components/SkoopaLogo";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "alert" | "info" | "success" | "reminder";
  read: boolean;
}

const MaidNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "New Cleaning Job",
        message: "You have been assigned a new cleaning job for tomorrow at 10:00 AM.",
        time: "2 hours ago",
        type: "info",
        read: false
      },
      {
        id: "2",
        title: "Skoops Earned",
        message: "You earned 15 Skoops for your excellent work at Rahul Sharma's house.",
        time: "Yesterday",
        type: "success",
        read: false
      },
      {
        id: "3",
        title: "Appointment Reminder",
        message: "Don't forget your appointment with Mr. Patel tomorrow at 2:30 PM.",
        time: "Yesterday",
        type: "reminder",
        read: true
      },
      {
        id: "4",
        title: "Job Cancelled",
        message: "The cleaning job for Mrs. Singh has been cancelled for today.",
        time: "3 days ago",
        type: "alert",
        read: true
      },
      {
        id: "5",
        title: "Level Up!",
        message: "Congratulations! You are now a Level 3 maid with access to premium jobs.",
        time: "4 days ago",
        type: "success",
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);
  
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "reminder":
        return <Clock className="w-6 h-6 text-amber-500" />;
      case "info":
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center">
          <button 
            onClick={() => navigate("/maid")}
            className="mr-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-smoke/50"
          >
            <ArrowLeft size={24} className="text-charcoal" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-sapphire">Notifications</h1>
          </div>
          <SkoopaLogo variant="icon" />
        </div>
      </div>
      
      {/* Notifications List */}
      <div className="p-4">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-xl border ${notification.read ? 'border-smoke bg-white' : 'border-coral/50 bg-coral/5'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${notification.read ? 'text-charcoal' : 'text-sapphire'}`}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-steel mt-1">{notification.message}</p>
                    <p className="text-xs text-steel mt-2">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-3 h-3 rounded-full bg-coral mt-2"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <BellRing size={48} className="text-smoke mb-4" />
            <p className="text-steel text-center">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaidNotifications;
