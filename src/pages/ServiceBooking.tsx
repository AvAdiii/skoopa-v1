
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Home, MapPin, ChevronRight, CreditCard, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type BookingStep = "service" | "datetime" | "address" | "payment" | "confirmation";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

interface Address {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const ServiceBooking = () => {
  const navigate = useNavigate();
  const { serviceType } = useParams<{ serviceType: string }>();
  const [currentStep, setCurrentStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  
  // Generate current date + next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      id: i.toString(),
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      date: date.toISOString().split('T')[0],
    };
  });
  
  // Mock data based on service type
  const getServiceOptions = (): ServiceOption[] => {
    switch (serviceType) {
      case "daily":
        return [
          {
            id: "daily-basic",
            name: "Basic Cleaning",
            description: "Sweeping, mopping, and dusting of your home.",
            price: "₹249",
            duration: "1 hour"
          },
          {
            id: "daily-standard",
            name: "Standard Cleaning",
            description: "Comprehensive cleaning including bathroom and kitchen surfaces.",
            price: "₹349",
            duration: "2 hours"
          },
          {
            id: "daily-premium",
            name: "Premium Cleaning",
            description: "Deep cleaning of all areas with special attention to details.",
            price: "₹449",
            duration: "3 hours"
          }
        ];
      case "kitchen":
        return [
          {
            id: "kitchen-basic",
            name: "Basic Kitchen Cleaning",
            description: "Cleaning of countertops, sink, and floors.",
            price: "₹299",
            duration: "1 hour"
          },
          {
            id: "kitchen-deep",
            name: "Deep Kitchen Cleaning",
            description: "Thorough cleaning including appliances, cabinets and utensils.",
            price: "₹499",
            duration: "2 hours"
          }
        ];
      case "bathroom":
        return [
          {
            id: "bathroom-standard",
            name: "Standard Bathroom Cleaning",
            description: "Cleaning of toilet, sink, shower, and floors.",
            price: "₹249",
            duration: "45 mins"
          },
          {
            id: "bathroom-deep",
            name: "Deep Bathroom Cleaning",
            description: "Thorough cleaning including tiles, grout, and fixtures.",
            price: "₹399",
            duration: "1.5 hours"
          }
        ];
      case "special":
        return [
          {
            id: "special-festival",
            name: "Festival Cleaning",
            description: "Complete home cleaning for festivals and special occasions.",
            price: "₹999",
            duration: "5 hours"
          },
          {
            id: "special-move",
            name: "Move-in/Move-out Cleaning",
            description: "Deep cleaning service when moving in or out of a home.",
            price: "₹1499",
            duration: "6 hours"
          }
        ];
      default:
        return [
          {
            id: "general-basic",
            name: "Basic Home Cleaning",
            description: "General cleaning of your home.",
            price: "₹299",
            duration: "1.5 hours"
          }
        ];
    }
  };
  
  const addresses: Address[] = [
    {
      id: "1",
      label: "Home",
      address: "123, Green Valley Apartments, Koramangala, Bengaluru - 560034",
      isDefault: true
    },
    {
      id: "2",
      label: "Office",
      address: "456, Tech Park, Whitefield, Bengaluru - 560066",
      isDefault: false
    }
  ];
  
  const timeSlots: TimeSlot[] = [
    { id: "1", time: "9:00 AM", available: true },
    { id: "2", time: "10:00 AM", available: true },
    { id: "3", time: "11:00 AM", available: false },
    { id: "4", time: "12:00 PM", available: true },
    { id: "5", time: "1:00 PM", available: true },
    { id: "6", time: "2:00 PM", available: true },
    { id: "7", time: "3:00 PM", available: false },
    { id: "8", time: "4:00 PM", available: true },
    { id: "9", time: "5:00 PM", available: true },
    { id: "10", time: "6:00 PM", available: true }
  ];
  
  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: <CreditCard size={20} /> },
    { 
      id: "upi", 
      name: "UPI", 
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6-6 6 6"></path>
          <path d="M6 15l6 6 6-6"></path>
          <path d="M12 3v18"></path>
        </svg>
      ) 
    },
    { 
      id: "cash", 
      name: "Cash on Service", 
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <line x1="2" y1="12" x2="22" y2="12"></line>
        </svg>
      ) 
    }
  ];
  
  const handleNext = () => {
    switch (currentStep) {
      case "service":
        if (!selectedService) {
          toast.error("Please select a service");
          return;
        }
        setCurrentStep("datetime");
        break;
      case "datetime":
        if (!selectedDate || !selectedTime) {
          toast.error("Please select date and time");
          return;
        }
        setCurrentStep("address");
        break;
      case "address":
        if (!selectedAddress) {
          toast.error("Please select an address");
          return;
        }
        setCurrentStep("payment");
        break;
      case "payment":
        if (!selectedPayment) {
          toast.error("Please select a payment method");
          return;
        }
        setCurrentStep("confirmation");
        // For demo purposes, we'll simulate a 2-second processing time
        setTimeout(() => {
          // Add a booking to state/context/local storage here
          const booking = {
            id: Math.random().toString(36).substring(7),
            serviceType: serviceType || "general",
            time: selectedTime,
            date: selectedDate,
            arrivalTime: "30 mins",
            address: addresses.find(addr => addr.id === selectedAddress)?.address || "",
            maid: {
              name: "Lakshmi D.",
              rating: 4.8,
              imageUrl: ""
            }
          };
          
          // For demo purposes, store in localStorage
          const existingBookings = JSON.parse(localStorage.getItem("skoopa-bookings") || "[]");
          localStorage.setItem("skoopa-bookings", JSON.stringify([...existingBookings, booking]));
          
          // Navigate back to home
          toast.success("Booking successful! A maid will be assigned shortly.");
          navigate("/");
        }, 2000);
        break;
      default:
        break;
    }
  };
  
  const getStepTitle = () => {
    switch (currentStep) {
      case "service": return serviceType ? `Choose ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Service` : "Choose Service";
      case "datetime": return "Select Date & Time";
      case "address": return "Select Address";
      case "payment": return "Payment Method";
      case "confirmation": return "Confirming Booking";
      default: return "";
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white py-3 px-4 border-b border-smoke flex items-center">
        <button 
          onClick={() => currentStep === "service" ? navigate(-1) : setCurrentStep(prev => {
            switch (prev) {
              case "datetime": return "service";
              case "address": return "datetime";
              case "payment": return "address";
              default: return "service";
            }
          })}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-smoke/50"
        >
          <ArrowLeft size={20} className="text-charcoal" />
        </button>
        <h1 className="text-lg font-bold text-sapphire mx-auto">{getStepTitle()}</h1>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </div>
      
      {/* Progress indicators */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex justify-between mb-4">
          {["service", "datetime", "address", "payment"].map((step, index) => (
            <div 
              key={step} 
              className="flex items-center flex-1"
            >
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  (currentStep === step || ["confirmation", "payment", "address", "datetime"].includes(currentStep) && index === 0 || 
                   ["confirmation", "payment", "address"].includes(currentStep) && index === 1 ||
                   ["confirmation", "payment"].includes(currentStep) && index === 2 ||
                   currentStep === "confirmation" && index === 3) 
                    ? "bg-coral text-white" : "bg-smoke text-steel"
                }`}
              >
                {index + 1}
              </div>
              {index < 3 && (
                <div 
                  className={`flex-1 h-0.5 ${
                    (["confirmation", "payment", "address"].includes(currentStep) && index === 0 ||
                     ["confirmation", "payment"].includes(currentStep) && index === 1 ||
                     currentStep === "confirmation" && index === 2) 
                      ? "bg-coral" : "bg-smoke"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="px-4 pb-32">
        <AnimatePresence mode="wait">
          {currentStep === "service" && (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {getServiceOptions().map((service) => (
                <div
                  key={service.id}
                  className={`p-4 border rounded-xl ${
                    selectedService === service.id 
                      ? "border-coral bg-coral/5" 
                      : "border-smoke bg-white"
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-charcoal">{service.name}</h3>
                      <p className="text-sm text-steel mt-1">{service.description}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <div className="flex items-center text-steel">
                          <Clock size={14} className="mr-1" />
                          {service.duration}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="font-bold text-coral text-lg">{service.price}</div>
                      <div 
                        className={`w-6 h-6 rounded-full border-2 ml-auto mt-2 ${
                          selectedService === service.id 
                            ? "border-coral bg-coral" 
                            : "border-smoke"
                        }`}
                      >
                        {selectedService === service.id && (
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
          
          {currentStep === "datetime" && (
            <motion.div
              key="datetime"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="font-bold text-charcoal mb-3 flex items-center">
                  <Calendar size={18} className="mr-2 text-coral" />
                  Select Date
                </h3>
                <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
                  {dates.map((date) => (
                    <div
                      key={date.id}
                      className={`flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center ${
                        selectedDate === date.date 
                          ? "bg-coral text-white" 
                          : "bg-white border border-smoke"
                      }`}
                      onClick={() => setSelectedDate(date.date)}
                    >
                      <span className="text-xs font-medium">{date.dayName}</span>
                      <span className="text-lg font-bold my-1">{date.day}</span>
                      <span className="text-xs">{date.month}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Time Selection */}
              <div>
                <h3 className="font-bold text-charcoal mb-3 flex items-center">
                  <Clock size={18} className="mr-2 text-coral" />
                  Select Time
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-2 rounded-xl text-center ${
                        !slot.available 
                          ? "bg-smoke/50 text-steel/50" 
                          : selectedTime === slot.time
                            ? "bg-coral text-white" 
                            : "bg-white border border-smoke"
                      }`}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                    >
                      <span className={`text-sm ${!slot.available ? "line-through" : ""}`}>
                        {slot.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {currentStep === "address" && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <h3 className="font-bold text-charcoal mb-3 flex items-center">
                <MapPin size={18} className="mr-2 text-coral" />
                Select Address
              </h3>
              
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-xl relative ${
                    selectedAddress === address.id 
                      ? "border-coral bg-coral/5" 
                      : "border-smoke bg-white"
                  }`}
                  onClick={() => setSelectedAddress(address.id)}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-azure flex items-center justify-center text-sapphire shrink-0">
                      <Home size={20} />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <h3 className="font-bold text-charcoal">{address.label}</h3>
                        {address.isDefault && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-smoke rounded-full text-steel">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-steel mt-1">{address.address}</p>
                    </div>
                    <div 
                      className={`w-6 h-6 rounded-full border-2 ml-2 shrink-0 ${
                        selectedAddress === address.id 
                          ? "border-coral bg-coral" 
                          : "border-smoke"
                      }`}
                    >
                      {selectedAddress === address.id && (
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full mt-3 p-3 border border-dashed border-steel rounded-xl text-steel flex items-center justify-center">
                <Plus size={18} className="mr-2" />
                Add New Address
              </button>
            </motion.div>
          )}
          
          {currentStep === "payment" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <h3 className="font-bold text-charcoal mb-3 flex items-center">
                <CreditCard size={18} className="mr-2 text-coral" />
                Select Payment Method
              </h3>
              
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 border rounded-xl flex items-center ${
                    selectedPayment === method.id 
                      ? "border-coral bg-coral/5" 
                      : "border-smoke bg-white"
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <div className="w-10 h-10 rounded-full bg-azure flex items-center justify-center text-sapphire shrink-0">
                    {method.icon}
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="font-medium text-charcoal">{method.name}</h3>
                  </div>
                  <div 
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedPayment === method.id 
                        ? "border-coral bg-coral" 
                        : "border-smoke"
                    }`}
                  >
                    {selectedPayment === method.id && (
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Order Summary */}
              <div className="mt-6 p-4 border border-smoke rounded-xl bg-azure/10">
                <h3 className="font-bold text-charcoal mb-3">Order Summary</h3>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-steel">Service Charge</span>
                    <span className="text-charcoal font-medium">₹349</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-steel">Convenience Fee</span>
                    <span className="text-charcoal font-medium">₹25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-steel">GST (18%)</span>
                    <span className="text-charcoal font-medium">₹67.32</span>
                  </div>
                  <div className="border-t border-smoke my-2"></div>
                  <div className="flex justify-between">
                    <span className="font-bold text-charcoal">Total</span>
                    <span className="font-bold text-coral">₹441.32</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {currentStep === "confirmation" && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <div className="w-20 h-20 rounded-full border-4 border-coral flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="M7 13l3 3 7-7"></path>
                </svg>
              </div>
              
              <h2 className="text-xl font-bold text-charcoal mb-2">Finding Your Maid</h2>
              <p className="text-steel text-center mb-6">We're matching you with the best maid in your area.</p>
              
              <div className="w-full h-2 bg-smoke rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-coral"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Bottom Action Button */}
      {currentStep !== "confirmation" && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-smoke z-40">
          <button
            className="w-full py-3 bg-coral text-white rounded-xl font-medium flex items-center justify-center"
            onClick={handleNext}
          >
            {currentStep === "payment" ? "Confirm & Pay" : "Continue"}
            <ChevronRight size={20} className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceBooking;
