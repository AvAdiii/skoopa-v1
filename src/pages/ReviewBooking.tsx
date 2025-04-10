
import { useState } from "react";
import { ArrowLeft, Send, Star } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const ReviewBooking = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  
  // Maid information (mock data)
  const maid = {
    name: "Lakshmi Devi",
    image: "https://ui-avatars.com/api/?name=Lakshmi+Devi&background=FFC0CB&color=800080&size=256"
  };
  
  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a star rating before submitting",
        variant: "destructive"
      });
      return;
    }
    
    // Store review data
    const reviewData = {
      bookingId: id,
      maidName: maid.name,
      rating,
      feedback,
      date: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingReviews = JSON.parse(localStorage.getItem("skoopa-reviews") || "[]");
    const updatedReviews = [reviewData, ...existingReviews];
    localStorage.setItem("skoopa-reviews", JSON.stringify(updatedReviews));
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
    
    // Navigate back to bookings
    navigate("/bookings");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <Link to="/bookings" className="text-sapphire">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-sapphire">Rate Your Experience</h1>
        </div>
      </div>
      
      <div className="p-4">
        {/* Service Information */}
        <div className="bg-white rounded-xl border border-smoke p-4 mb-6">
          <div className="text-center">
            <h2 className="font-bold text-charcoal">Regular Cleaning</h2>
            <p className="text-sm text-steel">Booking #{id} • April 10, 2025</p>
          </div>
        </div>
        
        {/* Maid information */}
        <div className="bg-white rounded-xl border border-smoke p-4 mb-6">
          <h2 className="font-bold text-charcoal mb-3">Rate Your Maid</h2>
          <div className="flex flex-col items-center">
            <Avatar className="w-16 h-16 mb-2">
              <AvatarImage src={maid.image} alt={maid.name} />
              <AvatarFallback>LD</AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-charcoal">{maid.name}</h3>
            
            {/* Star Rating */}
            <div className="flex items-center justify-center my-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="px-1"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={32}
                    className={`${
                      star <= (hoveredRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            
            {/* Rating Text */}
            <p className="text-sm font-medium text-charcoal h-5">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          </div>
        </div>
        
        {/* Feedback */}
        <div className="bg-white rounded-xl border border-smoke p-4 mb-6">
          <h2 className="font-bold text-charcoal mb-3">Share Your Feedback</h2>
          <Textarea
            placeholder="Tell us about your experience (optional)"
            className="min-h-[120px] resize-none"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        
        {/* Submit button */}
        <Button 
          className="w-full py-6 text-base bg-coral hover:bg-coral/90 rounded-xl"
          onClick={handleSubmitReview}
        >
          <Send className="mr-2" size={18} />
          Submit Review
        </Button>
        
        <p className="text-xs text-steel text-center mt-4">
          Your feedback helps us improve our service and 
          recognizes the hard work of our service providers.
        </p>
      </div>
    </div>
  );
};

export default ReviewBooking;
