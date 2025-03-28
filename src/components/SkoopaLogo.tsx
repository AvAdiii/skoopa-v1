
import { cn } from "@/lib/utils";

interface SkoopaLogoProps {
  className?: string;
  variant?: "full" | "icon";
}

const SkoopaLogo = ({ className, variant = "full" }: SkoopaLogoProps) => {
  if (variant === "icon") {
    return (
      <div className={cn("flex items-center justify-center w-10 h-10 bg-coral rounded-full", className)}>
        <span className="text-white font-bold text-xl">S</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center w-10 h-10 bg-coral rounded-full">
        <span className="text-white font-bold text-xl">S</span>
      </div>
      <span className="text-xl font-bold text-sapphire">
        <span className="text-coral">Sko</span>
        <span>opa</span>
      </span>
    </div>
  );
};

export default SkoopaLogo;
