
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Coins } from "lucide-react";

interface MaidProfileProps {
  name: string;
  rating: number;
  skoops: number;
  level: number;
  image: string;
}

const MaidProfile = ({ name, rating, skoops, level, image }: MaidProfileProps) => {
  return (
    <div className="p-4 bg-gradient-to-r from-azure/20 to-white">
      <div className="bg-white rounded-xl shadow-md border border-smoke p-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-2 border-coral">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-charcoal">{name}</h2>
            <div className="flex items-center gap-1 text-lg">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <span className="font-bold text-amber-500">{rating}</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Coins className="w-4 h-4 text-gold" />
              <span className="text-gold font-medium">{skoops} Skoops</span>
              <span className="text-sapphire bg-azure/20 px-2 py-0.5 rounded-full text-xs font-medium">Level {level}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaidProfile;
