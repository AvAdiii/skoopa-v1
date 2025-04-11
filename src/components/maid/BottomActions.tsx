
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface BottomActionsProps {
  onLogout: () => void;
}

const BottomActions = ({ onLogout }: BottomActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 pt-8">
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => navigate("/maid/profile")}
          variant="outline" 
          className="py-8 text-lg font-medium border-2"
        >
          <User className="w-6 h-6 mr-2" /> My Profile
        </Button>
        <Button 
          onClick={onLogout}
          variant="destructive" 
          className="py-8 text-lg font-medium"
        >
          <LogOut className="w-6 h-6 mr-2" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default BottomActions;
