
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type PromoSlide = {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  image?: string;
  link: string;
  actionText: string;
};

const promos: PromoSlide[] = [
  {
    id: 1,
    title: "Diwali Special",
    description: "Get 20% off on deep cleaning services",
    bgColor: "bg-gradient-to-r from-coral to-gold",
    link: "/service/deep-cleaning",
    actionText: "Book Now"
  },
  {
    id: 2,
    title: "Premium Maids",
    description: "Highly trained professionals at your service",
    bgColor: "bg-gradient-to-r from-sapphire to-azure",
    link: "/premium-maids",
    actionText: "View Maids"
  },
  {
    id: 3,
    title: "First Booking",
    description: "Use code FIRST50 for ₹50 off",
    bgColor: "bg-gradient-to-r from-gold to-coral",
    link: "/service/regular-cleaning",
    actionText: "Claim Now"
  },
];

const PromoCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promos.length - 1 : prev - 1));
  };

  const handleAction = (link: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(link);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg mt-4 mb-6">
      <div
        className="flex transition-transform duration-500 ease-out h-44"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promos.map((promo) => (
          <div
            key={promo.id}
            className={cn(
              "flex-shrink-0 w-full h-full relative flex flex-col justify-center p-6 cursor-pointer",
              promo.bgColor
            )}
            onClick={() => navigate(promo.link)}
          >
            <div className="absolute top-2 right-2 w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center overflow-hidden">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm"></div>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">{promo.title}</h3>
            <p className="text-white/90 text-sm max-w-[80%]">
              {promo.description}
            </p>
            <button 
              className="mt-4 bg-white text-charcoal py-1.5 px-3 rounded-full text-sm font-medium self-start hover:bg-opacity-90 transition-colors"
              onClick={(e) => handleAction(promo.link, e)}
            >
              {promo.actionText}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-full text-white"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-full text-white"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {promos.map((_, i) => (
          <span
            key={i}
            className={cn(
              "block w-2 h-2 rounded-full",
              i === currentSlide ? "bg-white" : "bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;
