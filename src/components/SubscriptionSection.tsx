
import { ReactNode } from "react";
import SubscriptionCard from "./SubscriptionCard";

interface ServiceItem {
  icon: ReactNode;
  title: string;
  description: string;
  price: string;
  duration: string;
  popular: boolean;
  id: string;
}

interface SubscriptionSectionProps {
  title: string;
  services: ServiceItem[];
  onServiceClick: (serviceId: string) => void;
}

const SubscriptionSection = ({ title, services, onServiceClick }: SubscriptionSectionProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-sapphire mb-3 flex items-center">
        <span>{title}</span>
        <div className="flex-1 h-px bg-smoke ml-3"></div>
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {services.map((service, index) => (
          <SubscriptionCard
            key={index}
            {...service}
            onClick={onServiceClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionSection;
