
import { useState } from "react";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const EditLocation = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  
  // Mock location search
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Simulate location search results
    const mockResults = [
      `${searchQuery}, Sector 1, New Delhi`,
      `${searchQuery}, Sector 2, New Delhi`,
      `${searchQuery}, Central Area, Mumbai`,
      `${searchQuery}, Downtown, Bangalore`,
    ];
    
    setSearchResults(mockResults);
  };
  
  const selectLocation = (location: string) => {
    setAddress(location);
    setSearchResults([]);
    setSearchQuery("");
  };
  
  const saveLocation = () => {
    // Save location to localStorage
    try {
      const userData = localStorage.getItem("skoopa-user");
      if (userData) {
        const user = JSON.parse(userData);
        user.address = address;
        localStorage.setItem("skoopa-user", JSON.stringify(user));
        
        toast({
          title: "Location updated",
          description: "Your location has been updated successfully",
        });
        
        navigate(-1);
      }
    } catch (error) {
      console.error("Error saving location", error);
      toast({
        title: "Error",
        description: "Could not update your location",
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
          <h1 className="text-lg font-bold text-sapphire">Edit Location</h1>
        </div>
      </div>
      
      <div className="p-4">
        {/* Current Location */}
        <div className="bg-white rounded-xl border border-smoke p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-azure flex items-center justify-center text-sapphire">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-bold text-charcoal">Current Location</h3>
              <p className="text-sm text-steel">Where we'll deliver our services</p>
            </div>
          </div>
          
          <div className="p-3 bg-smoke/30 rounded-lg break-words">
            {address ? address : "No location selected yet"}
          </div>
        </div>
        
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search for localities, areas..."
              className="w-full py-3 pl-11 pr-4 rounded-xl border border-smoke bg-white focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none transition-colors placeholder:text-steel text-charcoal"
            />
            
            <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-11">
              <Search className="text-steel w-5 h-5" />
            </div>
            
            <button 
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-coral text-white text-sm px-3 py-1 rounded-full"
            >
              Search
            </button>
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-3 border border-smoke rounded-xl overflow-hidden bg-white">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 border-b border-smoke last:border-b-0 hover:bg-smoke/20 transition-colors flex items-center gap-2"
                  onClick={() => selectLocation(result)}
                >
                  <MapPin size={16} className="text-coral" />
                  <span>{result}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Use current location button */}
        <button 
          className="w-full py-3 mb-4 bg-white border border-coral text-coral rounded-xl font-medium flex items-center justify-center gap-2"
          onClick={() => {
            // Simulate getting current location
            setTimeout(() => {
              selectLocation("123 Main Street, Central District, Mumbai");
              toast({
                title: "Location detected",
                description: "Using your current location",
              });
            }, 1000);
          }}
        >
          <MapPin size={18} />
          Use my current location
        </button>
        
        {/* Save button */}
        <button 
          className="w-full py-3 bg-coral text-white rounded-xl font-medium disabled:opacity-50"
          disabled={!address}
          onClick={saveLocation}
        >
          Save Location
        </button>
      </div>
    </div>
  );
};

export default EditLocation;
