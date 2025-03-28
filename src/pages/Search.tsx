
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerBottomNav from "@/components/CustomerBottomNav";
import SearchInput from "@/components/SearchInput";
import ServiceCategory from "@/components/ServiceCategory";

// Mock data for trending services
const TRENDING_SERVICES = [
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
  },
];

// Mock data for festival cleaning
const FESTIVAL_SERVICES = [
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
  },
];

const Search = () => {
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
        <SearchInput className="mt-3" placeholder="Search for services or maids..." />
      </div>

      <div className="px-4 py-4">
        {/* Trending searches */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-steel mb-2">Trending Searches</h2>
          <div className="flex flex-wrap gap-2">
            {["Deep Cleaning", "Daily Maid", "Kitchen", "Premium Service", "Bathroom"].map((term, i) => (
              <button
                key={i}
                className="px-3 py-1.5 rounded-full bg-smoke text-charcoal text-sm hover:bg-gray-200 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Services */}
        <ServiceCategory
          title="Trending Services"
          services={TRENDING_SERVICES}
        />

        {/* Festival Special Services */}
        <ServiceCategory
          title="Festival Specials"
          services={FESTIVAL_SERVICES}
        />
      </div>

      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Search;
