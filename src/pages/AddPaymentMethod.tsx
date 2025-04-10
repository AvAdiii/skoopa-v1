
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const PaymentOption = ({ 
  icon, 
  title, 
  description, 
  selected,
  onClick
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`w-full flex items-start gap-3 p-4 rounded-xl border ${selected ? 'border-coral bg-coral/5' : 'border-smoke bg-white'} transition-colors mb-3`}
      onClick={onClick}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selected ? 'bg-coral text-white' : 'bg-smoke text-steel'}`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-medium text-charcoal">{title}</h3>
        <p className="text-sm text-steel">{description}</p>
      </div>
      {selected && <CheckCircle size={20} className="text-coral" />}
    </button>
  );
};

const AddPaymentMethod = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [upiId, setUpiId] = useState("");
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };
  
  const handleAddPaymentMethod = () => {
    if (selectedOption === "card") {
      if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
        toast({
          title: "Missing information",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        return;
      }
      
      // Validate card number length
      if (cardNumber.replace(/\s+/g, "").length < 16) {
        toast({
          title: "Invalid card number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive",
        });
        return;
      }
    } else if (selectedOption === "upi") {
      if (!upiId) {
        toast({
          title: "Missing information",
          description: "Please enter your UPI ID",
          variant: "destructive",
        });
        return;
      }
      
      // Basic UPI validation
      if (!upiId.includes("@")) {
        toast({
          title: "Invalid UPI ID",
          description: "Please enter a valid UPI ID (e.g., username@bank)",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Simulate adding payment method
    toast({
      title: "Payment method added",
      description: selectedOption === "card" 
        ? "Your card has been added successfully" 
        : "Your UPI ID has been added successfully",
    });
    
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white py-3 px-4 border-b border-smoke flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-smoke/50"
        >
          <ArrowLeft size={20} className="text-charcoal" />
        </button>
        <h1 className="text-lg font-bold text-sapphire mx-auto">Add Payment Method</h1>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </div>
      
      <div className="px-4 py-5">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-charcoal mb-4">Choose a payment method</h2>
          
          <PaymentOption 
            icon={<CreditCard size={20} />}
            title="Credit/Debit Card"
            description="Add a card for secure payments"
            selected={selectedOption === "card"}
            onClick={() => setSelectedOption("card")}
          />
          
          <PaymentOption 
            icon={<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6-6 6 6"></path>
              <path d="M6 15l6 6 6-6"></path>
              <path d="M12 3v18"></path>
            </svg>}
            title="UPI"
            description="Pay directly from your bank account"
            selected={selectedOption === "upi"}
            onClick={() => setSelectedOption("upi")}
          />
        </div>
        
        {selectedOption === "card" && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-steel mb-1">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 rounded-lg border border-smoke focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-steel mb-1">Expiry Date</label>
                <input
                  id="expiryDate"
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength={5}
                  placeholder="MM/YY"
                  className="w-full p-3 rounded-lg border border-smoke focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none"
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="cvv" className="block text-sm font-medium text-steel mb-1">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                  maxLength={3}
                  placeholder="123"
                  className="w-full p-3 rounded-lg border border-smoke focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="nameOnCard" className="block text-sm font-medium text-steel mb-1">Name on Card</label>
              <input
                id="nameOnCard"
                type="text"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                placeholder="John Doe"
                className="w-full p-3 rounded-lg border border-smoke focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none"
              />
            </div>
          </div>
        )}
        
        {selectedOption === "upi" && (
          <div>
            <label htmlFor="upiId" className="block text-sm font-medium text-steel mb-1">UPI ID</label>
            <input
              id="upiId"
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="username@bankname"
              className="w-full p-3 rounded-lg border border-smoke focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none"
            />
            <p className="text-xs text-steel mt-2">Enter your UPI ID in the format username@bankname</p>
          </div>
        )}
        
        <button 
          className="w-full py-3 bg-coral text-white rounded-lg font-medium mt-6"
          onClick={handleAddPaymentMethod}
        >
          Add Payment Method
        </button>
      </div>
    </div>
  );
};

export default AddPaymentMethod;
