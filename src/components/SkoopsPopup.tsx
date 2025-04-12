
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, CheckCircle, Award, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SkoopsPopupProps {
  skoops: number;
  level: number;
  children: React.ReactNode;
  variant?: "customer" | "maid";
}

const SkoopsPopup = ({ skoops, level, children, variant = "customer" }: SkoopsPopupProps) => {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();

  const translations = {
    en: {
      benefits: "Skoops Benefits",
      rewards: "Your Rewards",
      how: "How to Earn",
      youHave: "You have",
      skoops: "Skoops",
      level: "Level",
      reviews: "Earn more Skoops with good customer reviews",
      attendance: "High attendance gives you bonus Skoops",
      loyalty: "Stay loyal to get monthly Skoop rewards",
      benefits1: "Priority service booking",
      benefits2: "Discounts on subscriptions",
      benefits3: "Access to premium maids",
      closeButton: "Close"
    },
    te: {
      benefits: "స్కూప్స్ ప్రయోజనాలు",
      rewards: "మీ బహుమతులు",
      how: "సంపాదించడం ఎలా",
      youHave: "మీకు ఉన్నాయి",
      skoops: "స్కూప్స్",
      level: "స్థాయి",
      reviews: "మంచి కస్టమర్ సమీక్షలతో మరిన్ని స్కూప్స్ సంపాదించండి",
      attendance: "అధిక హాజరు మీకు బోనస్ స్కూప్స్ ఇస్తుంది",
      loyalty: "నెలవారీ స్కూప్ బహుమతులు పొందడానికి నమ్మకంగా ఉండండి",
      benefits1: "ప్రాధాన్య సేవా బుకింగ్",
      benefits2: "సబ్‌స్క్రిప్షన్‌లపై డిస్కౌంట్‌లు",
      benefits3: "ప్రీమియం మెయిడ్‌లకు యాక్సెస్",
      closeButton: "మూసివేయి"
    }
  };

  const t = translations[language];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 shadow-xl" align="center">
        <div className="bg-gradient-to-r from-gold/20 to-gold/5 p-3 rounded-t-lg border-b border-smoke">
          <h3 className="text-lg font-bold text-center flex items-center justify-center gap-2">
            <Coins className="w-5 h-5 text-gold" />
            <span className="text-charcoal">{t.benefits}</span>
          </h3>
        </div>
        
        <div className="p-2">
          <div className="bg-gold/10 p-3 rounded-lg mb-3 flex items-center justify-center gap-2">
            <span className="font-medium">{t.youHave} <span className="text-gold font-bold">{skoops}</span> {t.skoops}</span>
            <span className="text-sapphire bg-azure/20 px-2 py-0.5 rounded-full text-xs font-medium">
              {t.level} {level}
            </span>
          </div>
          
          <Tabs defaultValue="how" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="how">{t.how}</TabsTrigger>
              <TabsTrigger value="rewards">{t.rewards}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="how" className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-steel text-sm">{t.reviews}</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-steel text-sm">{t.attendance}</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-steel text-sm">{t.loyalty}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="rewards" className="space-y-2">
              <div className="flex items-start gap-2">
                <Award className="text-gold w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-steel text-sm">{t.benefits1}</p>
              </div>
              <div className="flex items-start gap-2">
                <Award className="text-gold w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-steel text-sm">{t.benefits2}</p>
              </div>
              <div className="flex items-start gap-2">
                <BadgeCheck className="text-coral w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-steel text-sm">{t.benefits3}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SkoopsPopup;
