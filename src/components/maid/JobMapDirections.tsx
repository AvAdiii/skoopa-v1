
import { useState } from "react";
import { ArrowLeft, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface MapDirectionsProps {
  customerName: string;
  address: string;
}

const JobMapDirections = ({ customerName, address }: MapDirectionsProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  
  const translations = {
    en: {
      directions: "Directions",
      openMap: "Open in Google Maps",
      startNavigation: "Start Navigation",
      addressInfo: "Customer Address",
      back: "Back to Job"
    },
    te: {
      directions: "దిశలు",
      openMap: "గూగుల్ మ్యాప్స్‌లో తెరవండి",
      startNavigation: "నావిగేషన్ ప్రారంభించండి",
      addressInfo: "కస్టమర్ చిరునామా",
      back: "జాబ్‌కి తిరిగి వెళ్ళండి"
    }
  };

  const t = translations[language];
  
  const handleOpenMaps = () => {
    setLoading(true);
    
    // Encode the address for the Google Maps URL
    const encodedAddress = encodeURIComponent(address);
    
    // Open Google Maps in a new tab
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/maid")} className="text-sapphire">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-sapphire">{t.directions}</h1>
        </div>
      </div>
      
      {/* Placeholder Map - In a real app, this would be an actual map component */}
      <div className="h-64 bg-gradient-to-b from-sky-100 to-sky-50 flex items-center justify-center border-b border-smoke">
        <div className="text-center p-4">
          <Navigation size={48} className="mx-auto mb-2 text-sapphire" />
          <h3 className="font-bold text-lg mb-2">{customerName}</h3>
          <p className="text-steel text-sm">{address}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-lg border border-smoke p-4 mb-4">
          <h3 className="font-medium text-charcoal mb-1">{t.addressInfo}</h3>
          <p className="text-steel">{address}</p>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-sapphire hover:bg-sapphire/90 py-6 text-lg font-medium"
            onClick={handleOpenMaps}
            disabled={loading}
          >
            {t.openMap}
          </Button>
          
          <Button 
            className="w-full bg-coral hover:bg-coral/90 py-6 text-lg font-medium"
            onClick={handleOpenMaps}
            disabled={loading}
          >
            {t.startNavigation}
          </Button>
          
          <Button 
            variant="outline"
            className="w-full py-6 text-lg font-medium"
            onClick={() => navigate("/maid")}
          >
            {t.back}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobMapDirections;
