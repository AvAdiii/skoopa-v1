
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  
  // Get user data
  const getUserData = () => {
    try {
      const userData = localStorage.getItem("skoopa-user");
      if (userData) {
        return JSON.parse(userData);
      }
    } catch (error) {
      console.error("Error parsing user data", error);
    }
    return { firstName: "Guest", lastName: "", phoneNumber: "", email: "" };
  };
  
  const user = getUserData();
  
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  
  const handleSave = () => {
    // Validate
    if (!firstName.trim() || !phoneNumber.trim()) {
      toast({
        title: "Missing information",
        description: "First name and phone number are required",
        variant: "destructive",
      });
      return;
    }
    
    // Update user data
    try {
      const userData = localStorage.getItem("skoopa-user");
      if (userData) {
        const user = JSON.parse(userData);
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        
        localStorage.setItem("skoopa-user", JSON.stringify(user));
        
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
        
        navigate(-1);
      }
    } catch (error) {
      console.error("Error saving profile", error);
      toast({
        title: "Error",
        description: "Could not update your profile",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-sapphire">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-sapphire">Edit Profile</h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-steel mb-1">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 rounded-lg border border-smoke focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-steel mb-1">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 rounded-lg border border-smoke focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-steel mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-smoke focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-steel mb-1">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
              className="w-full p-3 rounded-lg border border-smoke focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none"
            />
          </div>
          
          <button 
            className="w-full py-3 bg-coral text-white rounded-lg font-medium mt-6"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
