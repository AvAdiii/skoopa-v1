
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import MaidCard from "./MaidCard";

const MAID_DATA = [
  {
    id: "m1",
    name: "Geeta Singh",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.8,
    experience: "5 yrs",
    price: "180",
    speciality: ["Kitchen", "Bathroom", "Dusting"],
    available: true,
  },
  {
    id: "m2",
    name: "Lakshmi R",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.7,
    experience: "3 yrs",
    price: "150",
    speciality: ["Dishes", "Laundry", "Deep Clean"],
    available: true,
  },
  {
    id: "m3",
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.9,
    experience: "7 yrs",
    price: "200",
    speciality: ["Full Home", "Organizing", "Windows"],
    available: false,
  },
  {
    id: "m4",
    name: "Neha Patel",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.6,
    experience: "4 yrs",
    price: "170",
    speciality: ["Pet Friendly", "Floor Cleaning", "Dusting"],
    available: true,
  },
];

const TopMaids = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-sapphire">Top Rated Maids</h2>
        <button 
          onClick={scrollRight}
          className="flex items-center text-coral text-sm font-medium"
        >
          View all
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x"
      >
        {MAID_DATA.map((maid) => (
          <div key={maid.id} className="snap-start flex-shrink-0 w-[280px]">
            <MaidCard {...maid} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMaids;
