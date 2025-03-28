
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkoopaLogoProps {
  className?: string;
  variant?: "full" | "icon";
  animated?: boolean;
}

const SkoopaLogo = ({ className, variant = "full", animated = false }: SkoopaLogoProps) => {
  // Using framer-motion for simple animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 }
  };
  
  const logoStyle = "font-extrabold";
  
  if (variant === "icon") {
    return (
      <div className={cn("flex items-center justify-center w-12 h-12 bg-coral rounded-full", className)}>
        <motion.div
          initial={animated ? "hidden" : false}
          animate={animated ? "visible" : false}
          className="flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0ZM100 10C50.2944 10 10 50.2944 10 100C10 149.706 50.2944 190 100 190C149.706 190 190 149.706 190 100C190 50.2944 149.706 10 100 10Z" fill="white"/>
            <path d="M160 90C160 124.183 132.467 152 98.6667 152C88.8 152 79.4667 149.44 71.3333 144.88C45.3333 156.667 28 166.667 28 166.667C28 166.667 42.4 135.2 46.9333 122.187C39.7333 112.4 36 101.68 36 90C36 55.8173 63.5333 28 97.3333 28C131.133 28 160 55.8173 160 90Z" fill="white"/>
          </svg>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className={cn("flex items-center gap-2", className)}
      initial={animated ? "hidden" : false}
      animate={animated ? "visible" : false}
      variants={animated ? containerVariants : undefined}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-coral rounded-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-coral/80 to-coral opacity-80"></div>
        <div className="w-12 h-12 flex items-center justify-center relative">
          <span className="text-white font-bold text-xl">S</span>
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={animated ? { scale: 1.5, opacity: 0 } : false}
            animate={animated ? { scale: 1, opacity: 1 } : false}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-4 h-4 rounded-full bg-white/20 absolute"></div>
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="flex items-baseline"
        variants={animated ? containerVariants : undefined}
      >
        <motion.span 
          className={`text-2xl ${logoStyle} text-coral`}
          variants={animated ? itemVariants : undefined}
        >
          Sko
        </motion.span>
        <motion.span 
          className={`text-2xl ${logoStyle} text-sapphire`}
          variants={animated ? itemVariants : undefined}
        >
          opa
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default SkoopaLogo;
