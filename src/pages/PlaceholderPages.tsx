
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Generic placeholder component
const PlaceholderPage = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const params = useParams();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-sapphire">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-sapphire">{title}</h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="py-10 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-azure rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sapphire">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-charcoal mb-2">Coming Soon</h2>
          <p className="text-steel text-center max-w-xs">
            This feature is currently under development. 
            {params.id && <span className="block mt-2">ID: {params.id}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

// Individual placeholder pages
export const MyAddresses = () => <PlaceholderPage title="My Addresses" />;
export const FavoriteMaids = () => <PlaceholderPage title="Favorite Maids" />;
export const HelpSupport = () => <PlaceholderPage title="Help & Support" />;
export const AboutSkoopa = () => <PlaceholderPage title="About Skoopa" />;
export const RescheduleBooking = () => <PlaceholderPage title="Reschedule Booking" />;
export const TrackBooking = () => <PlaceholderPage title="Track Booking" />;
export const ReviewBooking = () => <PlaceholderPage title="Review Service" />;
export const PremiumMaids = () => <PlaceholderPage title="Premium Maids" />;
