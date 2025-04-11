
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CoinIcon } from "lucide-react";
import CustomerBottomNav from "@/components/CustomerBottomNav";
import HomeLocationHeader from "@/components/HomeLocationHeader";
import PromoCarousel from "@/components/PromoCarousel";
import QuickActions from "@/components/QuickActions";
import SearchInput from "@/components/SearchInput";
import ServiceCategory from "@/components/ServiceCategory";
import SkoopaLogo from "@/components/SkoopaLogo";
import UserGreeting from "@/components/UserGreeting";
import ActiveBooking from "@/components/ActiveBooking";
import SkoopsDisplay from "@/components/SkoopsDisplay";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Mock data for services - updating pricing model to Monthly/Yearly
const REGULAR_SERVICES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z"/>
        <path d="M4 10h16"/>
        <path d="M10 4v16"/>
      </svg>
    ),
    title: "Regular Cleaning",
    description: "Daily or weekly cleaning of your home including dusting, sweeping, and bathroom cleaning.",
    price: "1,999",
    duration: "Monthly",
    popular: true,
    id: "regular-cleaning"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 4v16"/>
        <path d="M8 4v16"/>
        <path d="M5 8h14"/>
        <path d="M5 16h14"/>
      </svg>
    ),
    title: "Kitchen Cleaning",
    description: "Deep cleaning of kitchen including utensils, stove, countertops and storage.",
    price: "2,499",
    duration: "Monthly",
    popular: false,
    id: "kitchen-cleaning"
  },
];

const PREMIUM_SERVICES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
        <line x1="7" y1="7" x2="7.01" y2="7"></line>
      </svg>
    ),
    title: "Deep Cleaning",
    description: "Thorough cleaning of your entire home, removing stubborn dirt and stains.",
    price: "19,999",
    duration: "Yearly",
    popular: true,
    id: "deep-cleaning"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Diwali Special",
    description: "Complete home cleaning and decoration for the festival of lights.",
    price: "24,999",
    duration: "Yearly",
    popular: true,
    id: "diwali-special"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
        <path d="m8 16 4-4 4 4"></path>
        <path d="M8 16v4"></path>
        <path d="M16 16v4"></path>
        <path d="M12 12v8"></path>
      </svg>
    ),
    title: "Maid Replacement Guarantee",
    description: "Never worry about your maid's absence with our replacement guarantee.",
    price: "9,999",
    duration: "Yearly",
    popular: false,
    id: "maid-insurance"
  }
];

// Add a Skoops benefits component
const SkoopsBenefits = () => {
  return (
    <div className="bg-gradient-to-r from-gold/20 to-coral/10 rounded-xl p-4 mb-6">
      <h3 className="font-bold text-charcoal flex items-center gap-2 mb-3">
        <CoinIcon className="text-gold h-5 w-5" />
        Skoops Benefits
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold"></div>
          <p className="text-steel">Earn Skoops through low cancellation rates</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold"></div>
          <p className="text-steel">Get positive maid reviews for bonus Skoops</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold"></div>
          <p className="text-steel">Consistent payments earn you loyalty Skoops</p>
        </div>
        <div className="bg-white/50 rounded-lg p-3 mt-4">
          <p className="text-xs text-charcoal font-medium">Higher Skoop levels unlock:</p>
          <ul className="text-xs mt-2 space-y-1">
            <li className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-coral"></div>
              <span>Priority service booking</span>
            </li>
            <li className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-coral"></div>
              <span>Discounts on subscriptions</span>
            </li>
            <li className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-coral"></div>
              <span>Access to premium maids</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

interface MaidInfo {
  name: string;
  rating: number;
  imageUrl: string;
}

interface BookingInfo {
  serviceType: string;
  time: string;
  arrivalTime: string;
  address: string;
  maid: MaidInfo;
}

const Index = () => {
  const navigate = useNavigate();
  const [activeBooking, setActiveBooking] = useState<BookingInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userSkoops, setUserSkoops] = useState({ skoops: 0, level: 1 });
  
  useEffect(() => {
    // Get user skoops data
    const userData = localStorage.getItem("skoopa-user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserSkoops({
          skoops: user.skoops || 150,
          level: user.skoop_level || 2
        });
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

    // Check if there's a booking in localStorage
    const storedBookings = localStorage.getItem("skoopa-bookings");
    if (storedBookings) {
      try {
        const bookings = JSON.parse(storedBookings);
        if (bookings.length > 0) {
          // Set the most recent booking as active
          setActiveBooking(bookings[0]);
        }
      } catch (e) {
        console.error("Error parsing bookings from localStorage", e);
      }
    }
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      setIsSearching(true);
      
      // Redirect to search page with query
      navigate("/search");
    }
  };

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };
  
  const goToNotifications = () => {
    navigate('/notifications');
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    setSearchQuery("");
  };
  
  return (
    <div className="pb-20">
      {/* Header with Logo */}
      <motion.div 
        className="sticky top-0 z-40 bg-white py-3 px-4 border-b border-smoke"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <div className="flex justify-between items-center">
          <SkoopaLogo />
          <div className="flex items-center gap-3">
            <SkoopsDisplay skoops={userSkoops.skoops} level={userSkoops.level} compact />
            <button 
              onClick={goToNotifications}
              className="relative p-2 rounded-full hover:bg-smoke/30 transition-colors"
            >
              <Bell size={22} className="text-charcoal" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-coral rounded-full"></span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="px-4 py-3">
        {/* Location Header - Now clickable */}
        <div onClick={() => navigate('/edit-location')}>
          <HomeLocationHeader />
        </div>
        
        {/* Greeting */}
        <UserGreeting className="mt-6" />

        {/* Skoops Display */}
        <div className="mt-4 mb-6">
          <SkoopsDisplay skoops={userSkoops.skoops} level={userSkoops.level} />
        </div>

        {/* Search */}
        <SearchInput 
          className="mt-4" 
          onSearch={handleSearch} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Search Results */}
        {isSearching && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-sapphire">
                Search Results
              </h2>
              <button 
                onClick={handleClearSearch}
                className="text-sm text-coral hover:underline"
              >
                Clear
              </button>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {searchResults.map((service, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-white rounded-xl border border-smoke shadow-sm cursor-pointer hover:border-coral transition-colors"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-azure rounded-full flex items-center justify-center text-sapphire">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-charcoal">{service.title}</h3>
                        <p className="text-sm text-steel line-clamp-2 mt-1">{service.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-coral">₹{service.price}</span>
                          <div className="flex items-center text-xs text-steel">
                            <span>{service.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-white rounded-xl border border-smoke">
                <p className="text-steel">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}

        {/* Main Content Section - Only shown when not searching */}
        {!isSearching && (
          <motion.div 
            className="mt-6 pt-6 px-4 -mx-4 rounded-t-3xl bg-gradient-to-b from-azure/20 to-white"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {/* Promo Carousel */}
            <PromoCarousel />

            {/* Skoops Benefits */}
            <SkoopsBenefits />

            {/* Quick Actions */}
            <QuickActions />

            {/* Service Categories */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-sapphire mb-3 flex items-center">
                <span>Monthly Subscriptions</span>
                <div className="flex-1 h-px bg-smoke ml-3"></div>
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {REGULAR_SERVICES.map((service, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "relative p-4 bg-white rounded-xl border border-smoke shadow-sm cursor-pointer hover:border-coral transition-colors",
                      service.popular && "border-l-4 border-l-gold"
                    )}
                    onClick={() => handleServiceClick(service.id)}
                  >
                    {service.popular && (
                      <span className="absolute -top-2 -right-1 bg-gold text-sapphire text-xs font-bold px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-azure rounded-full flex items-center justify-center text-sapphire">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-charcoal">{service.title}</h3>
                        <p className="text-sm text-steel line-clamp-2 mt-1">{service.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-coral">₹{service.price}</span>
                          <div className="flex items-center text-xs text-steel">
                            <span>{service.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-bold text-sapphire mb-3 flex items-center">
                <span>Yearly Subscriptions</span>
                <div className="flex-1 h-px bg-smoke ml-3"></div>
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {PREMIUM_SERVICES.map((service, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "relative p-4 bg-white rounded-xl border border-smoke shadow-sm cursor-pointer hover:border-coral transition-colors",
                      service.popular && "border-l-4 border-l-gold"
                    )}
                    onClick={() => handleServiceClick(service.id)}
                  >
                    {service.popular && (
                      <span className="absolute -top-2 -right-1 bg-gold text-sapphire text-xs font-bold px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-azure rounded-full flex items-center justify-center text-sapphire">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-charcoal">{service.title}</h3>
                        <p className="text-sm text-steel line-clamp-2 mt-1">{service.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-coral">₹{service.price}</span>
                          <div className="flex items-center text-xs text-steel">
                            <span>{service.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Active Booking */}
      <AnimatePresence>
        {activeBooking && (
          <ActiveBooking 
            booking={activeBooking} 
            onClose={() => setActiveBooking(null)} 
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Index;
