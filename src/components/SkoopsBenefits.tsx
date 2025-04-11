
import { Coins } from "lucide-react";

const SkoopsBenefits = () => {
  return (
    <div className="bg-gradient-to-r from-gold/20 to-coral/10 rounded-xl p-4 mb-6">
      <h3 className="font-bold text-charcoal flex items-center gap-2 mb-3">
        <Coins className="text-gold h-5 w-5" />
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

export default SkoopsBenefits;
