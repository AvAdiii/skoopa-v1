
import { useState } from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const RescheduleBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  // Mock data for available dates and times
  const availableDates = [
    "2025-04-11", "2025-04-12", "2025-04-13", "2025-04-14", "2025-04-15"
  ];
  
  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"
  ];
  
  const handleReschedule = () => {
    if (!selectedDate) {
      toast({
        title: "Select a date",
        description: "Please select a new date for your service",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Select a time",
        description: "Please select a new time for your service",
        variant: "destructive"
      });
      return;
    }
    
    // Update booking in localStorage
    try {
      const bookings = JSON.parse(localStorage.getItem("skoopa-bookings") || "[]");
      const updatedBookings = bookings.map((booking: any, index: number) => {
        if (index === Number(id) || booking.id === id) {
          return {
            ...booking,
            date: selectedDate,
            time: selectedTime
          };
        }
        return booking;
      });
      
      localStorage.setItem("skoopa-bookings", JSON.stringify(updatedBookings));
      
      toast({
        title: "Booking Rescheduled",
        description: `Your booking has been rescheduled to ${selectedDate} at ${selectedTime}`,
      });
      
      navigate("/bookings");
    } catch (error) {
      console.error("Error updating booking:", error);
      toast({
        title: "Error",
        description: "Failed to reschedule booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <Link to="/bookings" className="text-sapphire">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-sapphire">Reschedule Booking</h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-xl border border-smoke p-4 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-charcoal">Current Booking</h2>
            <span className="text-sm text-steel">#{id}</span>
          </div>
          
          <div className="my-4 p-3 bg-smoke/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-coral" />
              <span className="text-charcoal">Current Date: <span className="font-medium">April 10, 2025</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-coral" />
              <span className="text-charcoal">Current Time: <span className="font-medium">10:00 AM</span></span>
            </div>
          </div>
          
          <p className="text-sm text-steel">
            Please select a new date and time for your service. 
            Rescheduling is free if done at least 2 hours before your scheduled time.
          </p>
        </div>
        
        {/* Date Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-3">Select New Date</h3>
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
          <h3 className="text-lg font-bold text-charcoal mb-3">Select New Time</h3>
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
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            className="border-smoke text-steel hover:bg-smoke/20 hover:text-charcoal"
            onClick={() => navigate("/bookings")}
          >
            Cancel
          </Button>
          <Button
            className="bg-coral hover:bg-coral/90"
            onClick={handleReschedule}
          >
            Confirm Reschedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleBooking;
