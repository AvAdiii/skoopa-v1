
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Star, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

interface Maid {
  id: string;
  name: string;
  rating: number;
  image: string;
  jobsCompleted: number;
  specialties: string[];
  availability: string;
  isFavorite: boolean;
}

const FavoriteMaids = () => {
  const [maids, setMaids] = useState<Maid[]>([]);
  
  // Load maids from localStorage
  useEffect(() => {
    const savedMaids = localStorage.getItem("skoopa-maids");
    if (savedMaids) {
      try {
        const allMaids = JSON.parse(savedMaids);
        // Filter for only favorite maids
        const favoriteMaids = allMaids.filter((maid: Maid) => maid.isFavorite);
        setMaids(favoriteMaids);
      } catch (error) {
        console.error("Error parsing maids:", error);
      }
    } else {
      // Set default favorite maids if none exist
      const defaultMaids = [
        {
          id: "1",
          name: "Nandini Chakaravarthy",
          rating: 4.8,
          image: "https://ui-avatars.com/api/?name=Lakshmi+Devi&background=FFC0CB&color=800080&size=256",
          jobsCompleted: 124,
          specialties: ["Deep Cleaning", "Kitchen Cleaning"],
          availability: "Mon, Wed, Fri",
          isFavorite: true
        },
        {
          id: "2",
          name: "Priya Singh",
          rating: 4.9,
          image: "https://ui-avatars.com/api/?name=Priya+Singh&background=BFEFFF&color=0000CD&size=256",
          jobsCompleted: 156,
          specialties: ["Regular Cleaning", "Bathroom Cleaning"],
          availability: "Tue, Thu, Sat",
          isFavorite: true
        },
        {
          id: "3",
          name: "Sunita Kumar",
          rating: 4.7,
          image: "https://ui-avatars.com/api/?name=Sunita+Kumar&background=FFDAB9&color=8B4513&size=256",
          jobsCompleted: 98,
          specialties: ["Festival Cleaning", "Window Cleaning"],
          availability: "Mon, Tue, Wed, Sat",
          isFavorite: true
        }
      ];
      setMaids(defaultMaids);
      localStorage.setItem("skoopa-maids", JSON.stringify([...defaultMaids]));
    }
  }, []);
  
  // Save maids to localStorage
  const saveMaids = (updatedMaids: Maid[]) => {
    // Get all maids from storage
    const savedMaids = localStorage.getItem("skoopa-maids");
    let allMaids: Maid[] = [];
    
    if (savedMaids) {
      try {
        allMaids = JSON.parse(savedMaids);
      } catch (error) {
        console.error("Error parsing maids:", error);
      }
    }
    
    // Update the isFavorite status for each maid
    const finalMaids = allMaids.map(maid => {
      const updatedMaid = updatedMaids.find(m => m.id === maid.id);
      if (updatedMaid) {
        return updatedMaid;
      }
      return maid;
    });
    
    localStorage.setItem("skoopa-maids", JSON.stringify(finalMaids));
    
    // Update the displayed maids (favorites only)
    setMaids(updatedMaids);
  };
  
  // Handle removing a maid from favorites
  const handleRemoveFavorite = (id: string) => {
    const updatedMaids = maids.map(maid => {
      if (maid.id === id) {
        return { ...maid, isFavorite: false };
      }
      return maid;
    });
    
    // Filter out the removed maid for display
    const displayMaids = updatedMaids.filter(maid => maid.isFavorite);
    
    saveMaids(displayMaids);
    
    toast({
      title: "Removed from favorites",
      description: "Maid has been removed from your favorites",
    });
  };
  
  // Handle booking a maid
  const handleBookMaid = (maid: Maid) => {
    toast({
      title: "Booking created",
      description: `${maid.name} has been booked for your next service`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <Link to="/profile" className="text-sapphire">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-sapphire">Favorite Maids</h1>
        </div>
      </div>
      
      <div className="p-4">
        {maids.length > 0 ? (
          <div className="space-y-4">
            {maids.map((maid) => (
              <div 
                key={maid.id}
                className="bg-white rounded-xl border border-smoke p-4"
              >
                <div className="flex items-start">
                  <Avatar className="w-16 h-16 mr-4">
                    <AvatarImage src={maid.image} alt={maid.name} />
                    <AvatarFallback>{maid.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-charcoal">{maid.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleRemoveFavorite(maid.id)}
                      >
                        <Heart className="fill-current" size={18} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center text-sm mt-0.5">
                      <span className="text-amber-500 font-medium">{maid.rating}</span>
                      <Star className="fill-amber-400 text-amber-400 ml-1" size={16} />
                      <span className="text-steel ml-1">({maid.jobsCompleted} jobs)</span>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1 mb-1">
                        {maid.specialties.map((specialty, index) => (
                          <span 
                            key={index}
                            className="text-xs px-2 py-1 bg-azure/20 text-sapphire rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-sm text-steel">
                        <Calendar size={14} className="mr-1" />
                        <span>Available: {maid.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button
                    variant="outline"
                    className="text-coral border-coral hover:bg-coral/5"
                    size="sm"
                  >
                    <Phone size={16} className="mr-1" />
                    Contact
                  </Button>
                  <Button
                    className="bg-coral hover:bg-coral/90"
                    size="sm"
                    onClick={() => handleBookMaid(maid)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-smoke/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={30} className="text-steel" />
            </div>
            <h3 className="text-lg font-bold text-charcoal mb-1">No Favorite Maids</h3>
            <p className="text-steel mb-6">Add maids to your favorites for quick booking</p>
            <Button 
              className="bg-coral hover:bg-coral/90"
              asChild
            >
              <Link to="/">
                Browse Maids
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteMaids;
