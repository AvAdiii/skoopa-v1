
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SubscriptionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  price: string;
  duration: string;
  popular: boolean;
  id: string;
  onClick: (id: string) => void;
}

const SubscriptionCard = ({
  icon,
  title,
  description,
  price,
  duration,
  popular,
  id,
  onClick
}: SubscriptionCardProps) => {
  return (
    <div 
      className={cn(
        "relative p-4 bg-white rounded-xl border border-smoke shadow-sm cursor-pointer hover:border-coral transition-colors",
        popular && "border-l-4 border-l-gold"
      )}
      onClick={() => onClick(id)}
    >
      {popular && (
        <span className="absolute -top-2 -right-1 bg-gold text-sapphire text-xs font-bold px-2 py-0.5 rounded-full">
          Popular
        </span>
      )}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-azure rounded-full flex items-center justify-center text-sapphire">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-charcoal">{title}</h3>
          <p className="text-sm text-steel line-clamp-2 mt-1">{description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-coral">₹{price}</span>
            <div className="flex items-center text-xs text-steel">
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
