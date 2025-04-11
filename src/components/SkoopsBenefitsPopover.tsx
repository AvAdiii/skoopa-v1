
import { Coins } from "lucide-react";
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from "@/components/ui/popover";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SkoopsBenefitsPopoverProps {
  skoops: number;
  level: number;
  className?: string;
  compact?: boolean;
  variant?: "user" | "maid";
}

const SkoopsBenefitsPopover = ({ 
  skoops, 
  level, 
  className, 
  compact = false,
  variant = "user"
}: SkoopsBenefitsPopoverProps) => {
  const [language, setLanguage] = useState<"english" | "telugu">("english");
  
  const translations = {
    english: {
      skoops: "Skoops",
      level: "Level",
      benefits: "Skoops Benefits",
      earnWith: "Earn Skoops with:",
      lowCancellation: "Low cancellation rates",
      positiveReviews: "Positive maid reviews",
      consistentPayments: "Consistent payments",
      rewards: "Higher Skoop levels unlock:",
      priorityService: "Priority service booking",
      discounts: "Discounts on subscriptions",
      premiumMaids: "Access to premium maids",
      english: "English",
      telugu: "తెలుగు"
    },
    telugu: {
      skoops: "స్కూప్స్",
      level: "స్థాయి",
      benefits: "స్కూప్స్ ప్రయోజనాలు",
      earnWith: "స్కూప్స్ సంపాదించండి:",
      lowCancellation: "తక్కువ రద్దు రేట్లు",
      positiveReviews: "సానుకూల సమీక్షలు",
      consistentPayments: "నిరంతర చెల్లింపులు",
      rewards: "ఉన్నత స్థాయి ప్రయోజనాలు:",
      priorityService: "ప్రాధాన్య సేవా బుకింగ్",
      discounts: "సబ్‌స్క్రిప్షన్‌లపై తగ్గింపులు",
      premiumMaids: "ప్రీమియం మెయిడ్‌లకు ప్రాప్యత",
      english: "English",
      telugu: "తెలుగు"
    }
  };

  const t = translations[language];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={cn(
          "flex items-center gap-1.5 bg-gold/20 rounded-full px-3 py-1.5 transition-colors hover:bg-gold/30",
          compact ? "px-2 py-1" : "",
          className
        )}>
          <Coins className="text-gold h-4 w-4" />
          <span className={cn("font-semibold text-gold", compact ? "text-xs" : "text-sm")}>
            {skoops} {t.skoops}
          </span>
          {!compact && (
            <span className="text-xs font-medium text-sapphire bg-azure/20 rounded-full px-2 py-0.5 ml-1">
              {t.level} {level}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 border-smoke shadow-lg" 
        align="end"
        sideOffset={8}
      >
        <div className="p-3 border-b border-smoke bg-gradient-to-r from-gold/20 to-gold/5">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
              <Coins className="w-5 h-5 text-gold" />
              <span>{t.benefits}</span>
            </h3>
            <div className="flex text-xs border rounded-md overflow-hidden">
              <button 
                className={cn(
                  "px-2 py-1 transition-colors", 
                  language === "english" ? "bg-sapphire text-white" : "bg-white text-steel"
                )}
                onClick={() => setLanguage("english")}
              >
                {translations.english.english}
              </button>
              <button 
                className={cn(
                  "px-2 py-1 transition-colors", 
                  language === "telugu" ? "bg-sapphire text-white" : "bg-white text-steel"
                )}
                onClick={() => setLanguage("telugu")}
              >
                {translations.english.telugu}
              </button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="earn" className="w-full">
          <TabsList className="w-full grid grid-cols-2 rounded-none bg-smoke/30">
            <TabsTrigger value="earn" className="text-sm">{t.earnWith}</TabsTrigger>
            <TabsTrigger value="benefits" className="text-sm">{t.rewards}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="earn" className="p-4 space-y-3">
            {variant === "user" ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0"></div>
                  <p className="text-steel">{t.lowCancellation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0"></div>
                  <p className="text-steel">{t.positiveReviews}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0"></div>
                  <p className="text-steel">{t.consistentPayments}</p>
                </div>
              </>
            ) : (
              // Maid app version with icons
              <>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center text-coral">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                      <path d="M2 16.1A5 5 0 0 1 5.9 20h2.1a3 3 0 0 0 6 0h2.1a5 5 0 0 1 3.9-3.9l.9-.1H21a2 2 0 0 0-2-2h-6.5a2 2 0 0 0-2 2H10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2h.1l.9.1"></path>
                    </svg>
                  </div>
                  <p className="text-steel">{t.lowCancellation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L15.09 8.2 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.2 12 2z"></path>
                    </svg>
                  </div>
                  <p className="text-steel">{t.positiveReviews}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sapphire/20 flex items-center justify-center text-sapphire">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22V8"></path>
                      <path d="m18 16-6 6-6-6"></path>
                      <path d="M18 5V2"></path>
                      <path d="M6 5V2"></path>
                      <path d="M18 2H6"></path>
                    </svg>
                  </div>
                  <p className="text-steel">{t.consistentPayments}</p>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="benefits" className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-2 h-2 rounded-full flex-shrink-0",
                variant === "user" ? "bg-coral" : "hidden"
              )}></div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                variant === "maid" ? "bg-coral/20 text-coral" : "hidden"
              )}>
                {variant === "maid" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v4l3 3"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                )}
              </div>
              <p className="text-steel">{t.priorityService}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-2 h-2 rounded-full flex-shrink-0",
                variant === "user" ? "bg-coral" : "hidden"
              )}></div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                variant === "maid" ? "bg-coral/20 text-coral" : "hidden"
              )}>
                {variant === "maid" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 18h20"></path>
                    <path d="M2 6h20"></path>
                    <path d="M6 6v12"></path>
                    <path d="M18 6v12"></path>
                    <path d="M12 6v12"></path>
                  </svg>
                )}
              </div>
              <p className="text-steel">{t.discounts}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-2 h-2 rounded-full flex-shrink-0",
                variant === "user" ? "bg-coral" : "hidden"
              )}></div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                variant === "maid" ? "bg-coral/20 text-coral" : "hidden"
              )}>
                {variant === "maid" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
              </div>
              <p className="text-steel">{t.premiumMaids}</p>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default SkoopsBenefitsPopover;
