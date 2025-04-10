
import { useState } from "react";
import { ArrowLeft, Calendar, Clock, Home, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const RegularCleaning = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["dusting"]);
  const [selectedFrequency, setSelectedFrequency] = useState("once");
  const [basePrice, setBasePrice] = useState(249);
  const [totalPrice, setTotalPrice] = useState(249);
  
  const regularOptions = [
    { id: "dusting", label: "Dusting & Surface Cleaning", price: 0, included: true },
    { id: "sweeping", label: "Sweeping & Mopping", price: 0, included: false },
    { id: "bathroom", label: "Bathroom Quick Clean", price: 49, included: false },
    { id: "kitchen", label: "Kitchen Counter & Sink", price: 49, included: false },
  ];
  
  const frequencyOptions = [
    { id: "once", label: "One-time", multiplier: 1 },
    { id: "week", label: "Weekly (4 visits)", multiplier: 3.5 },
    { id: "month", label: "Monthly (30 visits)", multiplier: 20 }
  ];
  
  const availableDates = [
    "2025-04-11", "2025-04-12", "2025-04-13", "2025-04-14", "2025-04-15"
  ];
  
  const availableTimes = [
    "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "05:00 PM", "06:00 PM"
  ];
  
  const handleOptionToggle = (optionId: string) => {
    const option = regularOptions.find(opt => opt.id === optionId);
    if (!option) return;
    
    if (option.included) {
      return; // Can't deselect included options
    }
    
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(prev => prev.filter(id => id !== optionId));
      setBasePrice(prev => prev - option.price);
    } else {
      setSelectedOptions(prev => [...prev, optionId]);
      setBasePrice(prev => prev + option.price);
    }
    
    // Recalculate total price based on frequency
    const frequencyOption = frequencyOptions.find(opt => opt.id === selectedFrequency);
    if (frequencyOption) {
      const newTotalPrice = Math.round((basePrice - option.price) * frequencyOption.multiplier);
      setTotalPrice(newTotalPrice);
    }
  };
  
  const handleFrequencyChange = (value: string) => {
    setSelectedFrequency(value);
    const frequencyOption = frequencyOptions.find(opt => opt.id === value);
    if (frequencyOption) {
      const newTotalPrice = Math.round(basePrice * frequencyOption.multiplier);
      setTotalPrice(newTotalPrice);
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
      serviceType: "Regular Cleaning",
      options: [
        ...regularOptions.filter(opt => opt.included).map(opt => opt.id),
        ...selectedOptions
      ],
      frequency: selectedFrequency,
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
      description: "Your regular cleaning has been booked",
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
          <h1 className="text-lg font-bold text-sapphire">Regular Cleaning</h1>
        </div>
      </div>
      
      <div className="p-4">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 mb-6">
          <div className="mb-4 text-center">
            <div className="inline-block p-3 bg-blue-200 rounded-full mb-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sapphire">
                <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z"/>
                <path d="M4 10h16"/>
                <path d="M10 4v16"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-sapphire mb-1">Regular Cleaning</h2>
            <p className="text-steel">Daily or weekly home cleaning service</p>
            <div className="flex justify-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-sm text-steel">
                <Clock size={16} />
                1 hour
              </span>
              <span className="flex items-center gap-1 text-sm text-steel">
                <Home size={16} />
                Home
              </span>
              <span className="flex items-center gap-1 text-sm text-steel">
                <MapPin size={16} />
                Anywhere
              </span>
            </div>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-coral">₹{totalPrice}</span>
            <span className="text-sm text-steel">
              {selectedFrequency === "once" ? "One-time" : 
               selectedFrequency === "week" ? "Weekly package" :
               "Monthly package"}
            </span>
          </div>
        </div>
        
        {/* Frequency Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-3">Select Frequency</h3>
          <RadioGroup 
            defaultValue="once" 
            value={selectedFrequency}
            onValueChange={handleFrequencyChange}
            className="grid grid-cols-3 gap-2"
          >
            {frequencyOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.id} 
                  id={option.id} 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor={option.id}
                  className="flex flex-col items-center justify-between cursor-pointer rounded-lg border-2 border-smoke bg-white px-4 py-3 text-sm hover:bg-gray-50 peer-data-[state=checked]:border-coral peer-data-[state=checked]:bg-coral/5 w-full text-center"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {/* Cleaning Options */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-3">Select Services</h3>
          <div className="space-y-2 bg-white rounded-xl border border-smoke p-4">
            {regularOptions.map((option) => (
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
          <h3 className="text-lg font-bold text-charcoal mb-3">Select Start Date</h3>
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

export default RegularCleaning;
