
import { Coins, CheckCircle } from "lucide-react";

interface SkoopsRewardsProps {
  skoops: number;
}

const SkoopsRewards = ({ skoops }: SkoopsRewardsProps) => {
  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-md border border-smoke overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-gold/20 to-gold/5 border-b border-smoke">
          <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
            <Coins className="w-5 h-5 text-gold" />
            <span className="text-charcoal">Skoops Rewards</span>
          </h3>
        </div>
        <div className="p-4">
          <div className="bg-gold/10 p-3 rounded-lg mb-4">
            <p className="text-center font-medium">You have {skoops} Skoops</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500 w-7 h-7 flex-shrink-0" />
              <p className="text-steel text-base">Earn more Skoops with good customer reviews</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500 w-7 h-7 flex-shrink-0" />
              <p className="text-steel text-base">High attendance gives you bonus Skoops</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500 w-7 h-7 flex-shrink-0" />
              <p className="text-steel text-base">Stay loyal to get monthly Skoop rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkoopsRewards;
