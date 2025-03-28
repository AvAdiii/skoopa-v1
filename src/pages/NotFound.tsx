
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SkoopaLogo from "@/components/SkoopaLogo";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <SkoopaLogo className="mb-8" />
      
      <div className="w-full max-w-md p-6 bg-azure/30 rounded-2xl border-2 border-dashed border-azure flex flex-col items-center">
        <div className="text-8xl font-bold text-coral mb-2">404</div>
        <h1 className="text-2xl font-bold text-sapphire mb-4">Page Not Found</h1>
        <p className="text-center text-steel mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="flex items-center gap-2 py-2.5 px-5 bg-coral text-white rounded-lg font-medium hover:bg-coral/90 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
