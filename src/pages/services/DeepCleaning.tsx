
import { useState } from "react";
import { ArrowLeft, Calendar, Clock, Home, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const DeepCleaning = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["dust", "floors"]);
  const [selectedHomeSize, setSelectedHomeSize] = useState("2bhk");
  const [totalPrice, setTotalPrice] = useState(899);
  
  const deepCleaningOptions = [
    { id: "dust", label: "Thorough Dusting", price: 0, included: true },
    { id: "floors", label: "Deep Floor Cleaning", price: 0, included: true },
    { id: "kitchen", label: "Kitchen Deep Clean", price: 0, included: true },
    { id: "bathrooms", label: "Bathroom Sanitization", price: 0, included: true },
    { id: "furniture", label: "Furniture & Upholstery", price: 149, included: false },
    { id: "windows", label: "Window & Glass Cleaning", price: 149, included: false },
    { id: "carpets", label: "Carpet & Rug Cleaning", price: 299, included: false },
    { id: "fans", label: "Ceiling Fans & Light Fixtures", price: 99, included: false },
    { id: "appliances", label: "Appliance Exterior Cleaning", price: 149, included: false },
  ];
  
  const homeSizeOptions = [
    { id: "1bhk", label: "1 BHK", basePrice: 699 },
    { id: "2bhk", label: "2 BHK", basePrice: 899 },
    { id: "3bhk", label: "3 BHK", basePrice: 1299 },
    { id: "4bhk", label: "4+ BHK", basePrice: 1799 }
  ];
  
  const availableDates = [
    "2025-04-11", "2025-04-12", "2025-04-13", "2025-04-14", "2025-04-15"
  ];
  
  const availableTimes = [
    "09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"
  ];
  
  const calculateTotalPrice = (
    homeSize: string, 
    options: string[]
  ) => {
    // Get base price from home size
    const homeSizeOption = homeSizeOptions.find(opt => opt.id === homeSize);
    let price = homeSizeOption ? homeSizeOption.basePrice : 899;
    
    // Add price of non-included options
    deepCleaningOptions.forEach(option => {
      if (!option.included && options.includes(option.id)) {
        price += option.price;
      }
    });
    
    return price;
  };
  
  const handleOptionToggle = (optionId: string) => {
    const option = deepCleaningOptions.find(opt => opt.id === optionId);
    if (!option || option.included) return;
    
    let newOptions = [...selectedOptions];
    
    if (newOptions.includes(optionId)) {
      newOptions = newOptions.filter(id => id !== optionId);
    } else {
      newOptions.push(optionId);
    }
    
    setSelectedOptions(newOptions);
    setTotalPrice(calculateTotalPrice(selectedHomeSize, newOptions));
  };
  
  const handleHomeSizeChange = (value: string) => {
    setSelectedHomeSize(value);
    setTotalPrice(calculateTotalPrice(value, selectedOptions));
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
      serviceType: "Deep Cleaning",
      homeSize: selectedHomeSize,
      options: [
        ...deepCleaningOptions.filter(opt => opt.included).map(opt => opt.id),
        ...selectedOptions.filter(id => {
          const option = deepCleaningOptions.find(opt => opt.id === id);
          return option && !option.included;
        })
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
      description: "Your deep cleaning has been booked",
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
          <h1 className="text-lg font-bold text-sapphire">Deep Cleaning</h1>
        </div>
      </div>
      
      <div className="p-4">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-6 mb-6">
          <div className="mb-4 text-center">
            <div className="inline-block p-3 bg-purple-200 rounded-full mb-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-700">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-purple-800 mb-1">Deep Cleaning</h2>
            <p className="text-purple-700">Thorough, comprehensive cleaning service</p>
            <div className="flex justify-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-sm text-purple-700">
                <Clock size={16} />
                4-6 hours
              </span>
              <span className="flex items-center gap-1 text-sm text-purple-700">
                <Home size={16} />
                Full Home
              </span>
              <span className="flex items-center gap-1 text-sm text-purple-700">
                <MapPin size={16} />
                Anywhere
              </span>
            </div>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-coral">₹{totalPrice}</span>
            <span className="text-sm text-purple-700">Based on selected options</span>
          </div>
        </div>
        
        {/* Home Size Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-3">Select Home Size</h3>
          <RadioGroup 
            defaultValue="2bhk" 
            value={selectedHomeSize}
            onValueChange={handleHomeSizeChange}
            className="grid grid-cols-4 gap-2"
          >
            {homeSizeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.id} 
                  id={`home-${option.id}`} 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor={`home-${option.id}`}
                  className="flex flex-col items-center justify-between cursor-pointer rounded-lg border-2 border-smoke bg-white px-3 py-2 text-sm hover:bg-gray-50 peer-data-[state=checked]:border-coral peer-data-[state=checked]:bg-coral/5 w-full text-center"
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
            {deepCleaningOptions.map((option) => (
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
          <div className="grid grid-cols-2 gap-2">
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

export default DeepCleaning;
