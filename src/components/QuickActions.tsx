
import { cn } from "@/lib/utils";

type QuickActionProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
};

const QuickAction = ({ icon, label, color, onClick }: QuickActionProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1"
    >
      <div className={cn("w-14 h-14 rounded-full flex items-center justify-center", color)}>
        {icon}
      </div>
      <span className="text-xs text-charcoal font-medium">{label}</span>
    </button>
  );
};

const QuickActions = () => {
  const actions = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z"/>
          <path d="M4 10h16"/>
          <path d="M10 4v16"/>
        </svg>
      ),
      label: "Daily",
      color: "bg-azure/80 text-sapphire",
      onClick: () => console.log("Daily cleaning"),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4v16"/>
          <path d="M8 4v16"/>
          <path d="M5 8h14"/>
          <path d="M5 16h14"/>
        </svg>
      ),
      label: "Kitchen",
      color: "bg-coral/80 text-white",
      onClick: () => console.log("Kitchen cleaning"),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20h20"/>
          <path d="M12 16v4"/>
          <path d="M4 20v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8"/>
          <path d="M12 7V4"/>
        </svg>
      ),
      label: "Bathroom",
      color: "bg-gold/80 text-sapphire",
      onClick: () => console.log("Bathroom cleaning"),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16"/>
          <path d="M12 6v12"/>
          <path d="M8 18h8"/>
          <rect x="6" y="2" width="12" height="4" rx="1"/>
        </svg>
      ),
      label: "Special",
      color: "bg-sapphire/80 text-white",
      onClick: () => console.log("Special cleaning"),
    },
  ];

  return (
    <div className="py-4">
      <h2 className="text-lg font-bold text-sapphire mb-4 flex items-center">
        <span>Quick Services</span>
        <div className="flex-1 h-px bg-smoke ml-3"></div>
      </h2>
      <div className="flex justify-between px-2">
        {actions.map((action, index) => (
          <QuickAction key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
