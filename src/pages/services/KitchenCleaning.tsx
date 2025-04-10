
import { useState } from "react";
import { ArrowLeft, Calendar, Clock, Home, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const KitchenCleaning = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["countertops"]);
  const [totalPrice, setTotalPrice] = useState(349);
  
  const kitchenOptions = [
    { id: "countertops", label: "Countertops & Surfaces", price: 0, included: true },
    { id: "sink", label: "Sink & Drain Cleaning", price: 0, included: true },
    { id: "stove", label: "Stove & Hob Cleaning", price: 0, included: false },
    { id: "cabinets", label: "Cabinet Exterior Cleaning", price: 49, included: false },
    { id: "refrigerator", label: "Refrigerator Exterior", price: 49, included: false },
    { id: "microwave", label: "Microwave (Inside & Outside)", price: 69, included: false },
    { id: "oven", label: "Oven Deep Cleaning", price: 129, included: false },
  ];
  
  const availableDates = [
    "2025-04-11", "2025-04-12", "2025-04-13", "2025-04-14", "2025-04-15"
  ];
  
  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"
  ];
  
  const handleOptionToggle = (optionId: string) => {
    const option = kitchenOptions.find(opt => opt.id === optionId);
    if (!option) return;
    
    if (option.included) {
      return; // Can't deselect included options
    }
    
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(prev => prev.filter(id => id !== optionId));
      setTotalPrice(prev => prev - option.price);
    } else {
      setSelectedOptions(prev => [...prev, optionId]);
      setTotalPrice(prev => prev + option.price);
    }
  };
  
  const handleBooking = () => {
    if (!selectedDate) {
      toast({
        title: "Select a date",
        description: "Please select a date for your service",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Select a time",
        description: "Please select a time for your service",
        variant: "destructive"
      });
      return;
    }
    
    // Create booking data
    const bookingData = {
      serviceType: "Kitchen Cleaning",
      options: [
        ...kitchenOptions.filter(opt => opt.included).map(opt => opt.id),
        ...selectedOptions
      ],
      date: selectedDate,
      time: selectedTime,
      price: totalPrice,
      address: "123 Main St, Bengaluru" // Default address for now
    };
    
    // Store booking data
    const existingBookings = JSON.parse(localStorage.getItem("skoopa-bookings") || "[]");
    const updatedBookings = [bookingData, ...existingBookings];
    localStorage.setItem("skoopa-bookings", JSON.stringify(updatedBookings));
    
    toast({
      title: "Booking Confirmed!",
      description: "Your kitchen cleaning has been booked",
    });
    
    // Navigate to bookings
    navigate("/bookings");
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sapphire">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-sapphire">Kitchen Cleaning</h1>
        </div>
      </div>
      
      <div className="p-4">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl p-6 mb-6">
          <div className="mb-4 text-center">
            <div className="inline-block p-3 bg-teal-200 rounded-full mb-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-700">
                <path d="M16 4v16"/>
                <path d="M8 4v16"/>
                <path d="M5 8h14"/>
                <path d="M5 16h14"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-teal-800 mb-1">Kitchen Cleaning</h2>
            <p className="text-teal-700">Spotless, hygienic kitchen services</p>
            <div className="flex justify-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-sm text-teal-700">
                <Clock size={16} />
                1.5 hours
              </span>
              <span className="flex items-center gap-1 text-sm text-teal-700">
                <Home size={16} />
                Kitchen
              </span>
              <span className="flex items-center gap-1 text-sm text-teal-700">
                <MapPin size={16} />
                Anywhere
              </span>
            </div>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-coral">₹{totalPrice}</span>
            <span className="text-sm text-teal-700">All inclusive price</span>
          </div>
        </div>
        
        {/* Cleaning Options */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-3">Select Services</h3>
          <div className="space-y-2 bg-white rounded-xl border border-smoke p-4">
            {kitchenOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={option.id} 
                  checked={option.included || selectedOptions.includes(option.id)}
                  disabled={option.included}
                  onCheckedChange={() => handleOptionToggle(option.id)}
                />
                <label
                  htmlFor={option.id}
                  className="flex justify-between w-full text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <span className="flex-grow">{option.label}</span>
                  <span className={option.included ? "text-green-600" : option.price > 0 ? "text-coral" : "text-gray-500"}>
                    {option.included ? "Included" : option.price > 0 ? `+₹${option.price}` : "Free Add-on"}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Date Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-3">Select Date</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableDates.map((date) => {
              const d = new Date(date);
              const formattedDate = d.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              });
              const day = d.toLocaleDateString('en-US', { weekday: 'short' });
              
              return (
                <button
                  key={date}
                  className={`p-3 rounded-lg border ${
                    selectedDate === date 
                      ? "bg-coral/10 border-coral text-coral" 
                      : "border-smoke bg-white hover:border-coral/30 transition-colors"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="block text-xs">{day}</span>
                  <span className="block font-medium">{formattedDate}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Time Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-3">Select Time</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                className={`p-3 rounded-lg border ${
                  selectedTime === time 
                    ? "bg-coral/10 border-coral text-coral" 
                    : "border-smoke bg-white hover:border-coral/30 transition-colors"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                <span className="font-medium">{time}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Book Button */}
        <Button 
          className="w-full py-6 text-base bg-coral hover:bg-coral/90 rounded-xl"
          onClick={handleBooking}
        >
          Book Now • ₹{totalPrice}
        </Button>
      </div>
    </div>
  );
};

export default KitchenCleaning;
