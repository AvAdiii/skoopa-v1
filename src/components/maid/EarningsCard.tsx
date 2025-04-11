
import { DollarSign } from "lucide-react";

interface EarningsData {
  today: string;
  week: string;
  month: string;
}

interface EarningsCardProps {
  earnings: EarningsData;
}

const EarningsCard = ({ earnings }: EarningsCardProps) => {
  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-md border border-smoke overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-coral/20 to-coral/5 border-b border-smoke">
          <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
            <DollarSign className="w-5 h-5 text-coral" />
            <span className="text-coral">Your Earnings</span>
          </h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-smoke p-4">
              <p className="text-center text-sm text-steel mb-1">Today</p>
              <p className="text-xl font-bold text-center text-charcoal">{earnings.today}</p>
            </div>
            <div className="bg-white rounded-xl border border-smoke p-4">
              <p className="text-center text-sm text-steel mb-1">Week</p>
              <p className="text-xl font-bold text-center text-charcoal">{earnings.week}</p>
            </div>
            <div className="bg-white rounded-xl border border-smoke p-4">
              <p className="text-center text-sm text-steel mb-1">Month</p>
              <p className="text-xl font-bold text-center text-charcoal">{earnings.month}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;
