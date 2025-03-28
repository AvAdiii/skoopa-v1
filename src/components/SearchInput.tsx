
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

const SearchInput = ({ placeholder = "Search for services...", className }: SearchInputProps) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-smoke bg-white focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none transition-colors placeholder:text-steel text-charcoal"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steel w-5 h-5" />
    </div>
  );
};

export default SearchInput;
