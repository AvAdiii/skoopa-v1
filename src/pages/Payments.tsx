
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, CreditCard, Plus, Clock } from "lucide-react";
import { motion } from "framer-motion";
import CustomerBottomNav from "@/components/CustomerBottomNav";

interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "bank";
  name: string;
  details: string;
  isDefault: boolean;
}

interface PaymentHistoryItem {
  id: string;
  amount: string;
  date: string;
  description: string;
  status: "completed" | "pending" | "failed";
}

const Payments = () => {
  const navigate = useNavigate();
  
  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "card",
      name: "HDFC Credit Card",
      details: "••••  ••••  ••••  4242",
      isDefault: true
    },
    {
      id: "2",
      type: "upi",
      name: "Google Pay",
      details: "user@oksbi",
      isDefault: false
    }
  ];
  
  const paymentHistory: PaymentHistoryItem[] = [
    {
      id: "1",
      amount: "₹799",
      date: "Today, 10:30 AM",
      description: "Monthly Subscription - April",
      status: "completed"
    },
    {
      id: "2",
      amount: "₹349",
      date: "Mar 25, 2:15 PM",
      description: "Kitchen Cleaning Service",
      status: "completed"
    },
    {
      id: "3",
      amount: "₹799",
      date: "Mar 1, 9:10 AM",
      description: "Monthly Subscription - March",
      status: "completed"
    }
  ];
  
  const upcomingPayment = {
    amount: "₹799",
    dueDate: "May 1, 2024",
    daysLeft: 3,
    description: "Monthly Subscription - May"
  };
  
  const getCardIcon = (type: string) => {
    switch (type) {
      case "card":
        return (
          <div className="w-10 h-10 rounded-full bg-azure flex items-center justify-center text-sapphire">
            <CreditCard size={20} />
          </div>
        );
      case "upi":
        return (
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-sapphire">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6-6 6 6"></path>
              <path d="M6 15l6 6 6-6"></path>
              <path d="M12 3v18"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-smoke flex items-center justify-center text-steel">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
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
        <h1 className="text-lg font-bold text-sapphire mx-auto">Payments</h1>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </div>
      
      <div className="px-4 py-3">
        {/* Upcoming Payment */}
        {upcomingPayment && (
          <motion.div 
            className="mb-6 p-4 rounded-xl bg-gradient-to-r from-coral/10 to-azure/20 border border-coral/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-charcoal">Upcoming Payment</h2>
              <div className="px-2 py-1 rounded-full bg-white/70 text-xs font-medium text-coral">
                Due in {upcomingPayment.daysLeft} days
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-steel text-sm">{upcomingPayment.description}</p>
              <p className="font-bold text-charcoal text-lg">{upcomingPayment.amount}</p>
            </div>
            <div className="flex items-center text-xs text-steel">
              <Calendar size={14} className="mr-1" />
              Due on {upcomingPayment.dueDate}
            </div>
            <button className="w-full mt-3 py-2.5 bg-coral text-white rounded-lg font-medium">
              Pay Now
            </button>
          </motion.div>
        )}
        
        {/* Payment Methods */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sapphire">Payment Methods</h2>
            <button className="flex items-center text-sm text-coral font-medium">
              <Plus size={16} className="mr-1" />
              Add New
            </button>
          </div>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div 
                key={method.id}
                className="flex items-center p-3 border border-smoke rounded-xl bg-white relative"
              >
                {getCardIcon(method.type)}
                <div className="ml-3">
                  <h3 className="font-medium text-charcoal">{method.name}</h3>
                  <p className="text-sm text-steel">{method.details}</p>
                </div>
                
                {method.isDefault && (
                  <div className="absolute right-3 top-3 px-2 py-0.5 rounded-full bg-azure/30 text-xs text-sapphire">
                    Default
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Payment History */}
        <div>
          <h2 className="font-bold text-sapphire mb-3">Payment History</h2>
          
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div 
                key={payment.id}
                className="flex items-center justify-between p-3 border border-smoke rounded-xl bg-white"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-smoke/50 flex items-center justify-center text-steel">
                    <Clock size={18} />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-charcoal">{payment.description}</h3>
                    <p className="text-xs text-steel">{payment.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-charcoal">{payment.amount}</p>
                  <p className={`text-xs ${payment.status === 'completed' ? 'text-green-600' : payment.status === 'failed' ? 'text-red-500' : 'text-amber-500'}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Payments;
