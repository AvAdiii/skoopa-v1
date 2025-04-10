
import { Search } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ 
  placeholder = "Search for services...", 
  className,
  onSearch,
  value,
  onChange
}: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  const controlledValue = value !== undefined ? value : query;
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setQuery(e.target.value);
    }
  };
  
  const handleSearch = () => {
    if (onSearch) onSearch(controlledValue);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };
  
  const handleClear = () => {
    if (onChange) {
      // Create a synthetic event
      const event = {
        target: {
          value: ""
        }
      } as ChangeEvent<HTMLInputElement>;
      onChange(event);
    } else {
      setQuery("");
    }
  };
  
  return (
    <div className={cn("relative", className)}>
      <motion.div 
        className="absolute inset-0 rounded-xl bg-coral/10"
        animate={{ 
          scale: isFocused ? 1 : 0.98,
          opacity: isFocused ? 1 : 0 
        }}
        transition={{ duration: 0.2 }}
      />
      
      <input
        type="text"
        value={controlledValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full py-3 pl-11 pr-4 rounded-xl border border-smoke bg-white focus:border-coral focus:ring-1 focus:ring-coral focus:outline-none transition-colors placeholder:text-steel text-charcoal"
      />
      
      <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-11">
        <Search className="text-steel w-5 h-5" />
      </div>
      
      {controlledValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-smoke/50 flex items-center justify-center text-steel hover:bg-smoke transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18"></path>
            <path d="M6 6L18 18"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
