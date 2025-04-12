
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import SkoopaLogo from "@/components/SkoopaLogo";

interface MaidHeaderProps {
  notificationCount?: number;
}

const MaidHeader = ({ notificationCount = 3 }: MaidHeaderProps) => {
  return (
    <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
      <div className="flex items-center justify-between">
        <SkoopaLogo />
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
  );
};

export default MaidHeader;
