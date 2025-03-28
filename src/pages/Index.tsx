
import CustomerBottomNav from "@/components/CustomerBottomNav";
import HomeLocationHeader from "@/components/HomeLocationHeader";
import MaidCard from "@/components/MaidCard";
import PromoCarousel from "@/components/PromoCarousel";
import QuickActions from "@/components/QuickActions";
import SearchInput from "@/components/SearchInput";
import ServiceCategory from "@/components/ServiceCategory";
import SkoopaLogo from "@/components/SkoopaLogo";
import TopMaids from "@/components/TopMaids";

// Mock data for services
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
    price: "249",
    duration: "1 hour",
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
    title: "Kitchen Cleaning",
    description: "Deep cleaning of kitchen including utensils, stove, countertops and storage.",
    price: "349",
    duration: "1.5 hours",
    popular: false,
  },
];

const Index = () => {
  return (
    <div className="pb-20">
      {/* Header with Logo */}
      <div className="sticky top-0 z-40 bg-white py-3 px-4 border-b border-smoke">
        <div className="flex justify-center">
          <SkoopaLogo />
        </div>
      </div>

      <div className="px-4 py-3">
        {/* Location Header */}
        <HomeLocationHeader />

        {/* Search */}
        <SearchInput className="mt-4" />

        {/* Promo Carousel */}
        <PromoCarousel />

        {/* Quick Actions */}
        <QuickActions />

        {/* Top Maids Horizontal Scroll */}
        <TopMaids />

        {/* Service Categories */}
        <ServiceCategory
          title="Regular Services"
          services={REGULAR_SERVICES}
        />
      </div>

      {/* Bottom Navigation */}
      <CustomerBottomNav />
    </div>
  );
};

export default Index;
