
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type ServiceProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  duration: string;
  popular?: boolean;
  className?: string;
};

export const ServiceCard = ({
  icon,
  title,
  description,
  price,
  duration,
  popular = false,
  className,
}: ServiceProps) => {
  return (
    <div
      className={cn(
        "relative p-4 bg-white rounded-xl border border-smoke shadow-sm",
        popular && "border-l-4 border-l-gold",
        className
      )}
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
              <Clock size={14} className="mr-1" />
              {duration}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ServiceCategoryProps = {
  title: string;
  services: ServiceProps[];
  className?: string;
};

const ServiceCategory = ({
  title,
  services,
  className,
}: ServiceCategoryProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="text-lg font-bold text-sapphire mb-3 flex items-center">
        <span>{title}</span>
        <div className="flex-1 h-px bg-smoke ml-3"></div>
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceCategory;
