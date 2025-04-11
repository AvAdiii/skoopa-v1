
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import SkoopaLogo from "@/components/SkoopaLogo";
import SkoopsBenefitsPopover from "@/components/SkoopsBenefitsPopover";

interface MaidHeaderProps {
  notificationCount?: number;
  skoops?: number;
  level?: number;
}

const MaidHeader = ({ notificationCount = 3, skoops = 230, level = 3 }: MaidHeaderProps) => {
  return (
    <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
      <div className="flex items-center justify-between">
        <SkoopaLogo />
        <div className="flex items-center gap-3">
          <SkoopsBenefitsPopover
            skoops={skoops}
            level={level}
            compact
            variant="maid"
          />
          <Link to="/maid/notifications" className="relative p-2">
            <Bell size={28} className="text-charcoal" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-coral text-white rounded-full flex items-center justify-center text-xs font-bold">
                {notificationCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaidHeader;
