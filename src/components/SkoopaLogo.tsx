
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

  // New logo path
  const logoPath = "/lovable-uploads/9623a10a-3923-467d-9b8d-fe809b764eb1.png";
  
  if (variant === "icon") {
    return (
      <div className={cn("flex items-center justify-center w-12 h-12", className)}>
        <motion.div
          initial={animated ? { opacity: 0 } : false}
          animate={animated ? { opacity: 1 } : false}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <img 
            src={logoPath} 
            alt="Skoopa Logo" 
            className="w-10 h-10 object-contain"
          />
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
      <div className="flex items-center justify-center w-12 h-12 relative overflow-hidden">
        <img 
          src={logoPath} 
          alt="Skoopa Logo" 
          className="w-10 h-10 object-contain"
        />
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
