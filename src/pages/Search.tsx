
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomerBottomNav from "@/components/CustomerBottomNav";
import SearchInput from "@/components/SearchInput";
import ServiceCategory from "@/components/ServiceCategory";

// Mock data for all services
const ALL_SERVICES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z"/>
        <path d="M4 10h16"/>
        <path d="M10 4v16"/>
      </svg>
    ),
    title: "Deep House Cleaning",
    description: "Thorough cleaning of your entire home, including hard-to-reach areas.",
    price: "599",
    duration: "4 hours",
    popular: true,
    id: "deep-house-cleaning"
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
    title: "Kitchen Deep Clean",
    description: "Complete kitchen cleaning including appliances, cabinets and countertops.",
    price: "449",
    duration: "2 hours",
    popular: false,
    id: "kitchen-cleaning"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 20h20"/>
        <path d="M12 16v4"/>
        <path d="M4 20v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8"/>
        <path d="M12 7V4"/>
      </svg>
    ),
    title: "Bathroom Sanitization",
    description: "Deep cleaning and sanitization of bathrooms, toilets and fittings.",
    price: "349",
    duration: "1.5 hours",
    popular: false,
    id: "bathroom-sanitization"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Diwali Special Cleaning",
    description: "Complete home cleaning before the festival of lights. Includes all rooms and special decor arrangement.",
    price: "999",
    duration: "6 hours",
    popular: true,
    id: "diwali-special"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16"/>
        <path d="M12 6v12"/>
        <path d="M8 18h8"/>
        <rect x="6" y="2" width="12" height="4" rx="1"/>
      </svg>
    ),
    title: "Holi Aftermath Cleanup",
    description: "Special cleaning service to remove color stains and post-celebration mess.",
    price: "749",
    duration: "4 hours",
    popular: false,
    id: "holi-cleanup"
  },
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
    price: "249",
    duration: "1 hour",
    popular: true,
    id: "regular-cleaning"
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
        <line x1="7" y1="7" x2="7.01" y2="7"></line>
      </svg>
    ),
    title: "Deep Cleaning",
    description: "Thorough cleaning of your entire home, removing stubborn dirt and stains.",
    price: "899",
    duration: "4 hours",
    popular: true,
    id: "deep-cleaning"
  }
];

// Mock data for trending services
const TRENDING_SERVICES = ALL_SERVICES.filter(service => 
  ["Deep House Cleaning", "Diwali Special Cleaning", "Regular Cleaning"].includes(service.title)
);

// Mock data for festival cleaning
const FESTIVAL_SERVICES = ALL_SERVICES.filter(service => 
  ["Diwali Special Cleaning", "Holi Aftermath Cleanup"].includes(service.title)
);

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof ALL_SERVICES>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Deep Cleaning", "Daily Maid", "Kitchen", "Premium Service", "Bathroom"
  ]);
  
  // Handle search
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filtered = ALL_SERVICES.filter(service => 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered);
    
    // Add to recent searches if not already in the list
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
    }
  };
  
  // Handle search term click
  const handleSearchTermClick = (term: string) => {
    setQuery(term);
    handleSearch(term);
  };
  
  // Handle service click
  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };
  
  // Effect to search when query changes
  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sapphire">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-sapphire">Search Services</h1>
        </div>
        <SearchInput 
          className="mt-3" 
          placeholder="Search for services or maids..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
        />
      </div>

      <div className="px-4 py-4">
        {query ? (
          // Search results
          <div>
            <h2 className="text-sm font-medium text-steel mb-4">Search Results for "{query}"</h2>
            
            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((service, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white rounded-xl border border-smoke cursor-pointer hover:border-coral transition-colors shadow-sm"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-azure rounded-full flex items-center justify-center text-sapphire">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-charcoal">{service.title}</h3>
                        <p className="text-sm text-steel line-clamp-2 mt-1">{service.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-coral">₹{service.price}</span>
                          <span className="text-sm text-steel">{service.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-smoke/50 rounded-full flex items-center justify-center mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-steel">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-1">No results found</h3>
                <p className="text-steel">Try a different search term</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Trending searches */}
            <div className="mb-6">
              <h2 className="text-sm font-medium text-steel mb-2">Trending Searches</h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-smoke text-charcoal text-sm hover:bg-gray-200 transition-colors"
                    onClick={() => handleSearchTermClick(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Services */}
            <ServiceCategory
              title="Trending Services"
              services={TRENDING_SERVICES.map(s => ({
                ...s,
                onClick: () => handleServiceClick(s.id),
              }))}
            />

            {/* Festival Special Services */}
            <ServiceCategory
              title="Festival Specials"
              services={FESTIVAL_SERVICES.map(s => ({
                ...s,
                onClick: () => handleServiceClick(s.id),
              }))}
            />
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Search;
