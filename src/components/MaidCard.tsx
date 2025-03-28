
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type MaidCardProps = {
  id: string;
  name: string;
  image: string;
  rating: number;
  experience: string;
  price: string;
  speciality: string[];
  available?: boolean;
  className?: string;
};

const MaidCard = ({
  id,
  name,
  image,
  rating,
  experience,
  price,
  speciality,
  available = true,
  className,
}: MaidCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-smoke shadow-sm overflow-hidden",
        available ? "opacity-100" : "opacity-70",
        className
      )}
    >
      <div className="flex">
        <div className="relative w-24 h-28">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3"></div>
          <div className="absolute bottom-1 left-0 right-0 flex justify-center">
            <div className="flex items-center bg-white rounded-full px-1.5 py-0.5">
              <Star size={12} className="text-gold" fill="#FFD93D" />
              <span className="text-xs font-medium ml-0.5">{rating}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 p-3">
          <div className="flex justify-between">
            <h3 className="font-bold text-charcoal">{name}</h3>
            {available ? (
              <span className="text-xs bg-green-100 text-green-800 rounded-full px-1.5">
                Available
              </span>
            ) : (
              <span className="text-xs bg-smoke text-steel rounded-full px-1.5">
                Busy
              </span>
            )}
          </div>
          <div className="flex items-center text-xs text-steel mt-1">
            <span>{experience} exp</span>
            <span className="mx-1.5">•</span>
            <span>₹{price}/hr</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {speciality.slice(0, 2).map((skill, i) => (
              <span
                key={i}
                className="text-xs bg-azure text-sapphire rounded-full px-1.5 py-0.5"
              >
                {skill}
              </span>
            ))}
            {speciality.length > 2 && (
              <span className="text-xs bg-smoke text-steel rounded-full px-1.5 py-0.5">
                +{speciality.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaidCard;
