
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import MaidHeader from "@/components/maid/MaidHeader";
import MaidProfile from "@/components/maid/MaidProfile";
import AvailabilityToggle from "@/components/maid/AvailabilityToggle";
import BottomActions from "@/components/maid/BottomActions";
import { Clock, MapPin, Phone, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Simplified MaidDashboard component
const MaidDashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isAvailable, setIsAvailable] = useState(true);
  const [maidData, setMaidData] = useState({
    name: "Nandini Chakaravarthy",
    rating: 4.8,
    level: 3,
    jobsCompleted: 124,
    skoops: 230,
    earnings: {
      today: "₹650",
      week: "₹3,250",
      month: "₹12,500"
    },
    image: "https://ui-avatars.com/api/?name=Lakshmi+Devi&background=FFC0CB&color=800080&size=256"
  });
  
  const [upcomingJobs, setUpcomingJobs] = useState([
    {
      id: "1",
      customerName: "Rahul Sharma",
      address: "123, Green Valley Apartments, Koramangala, Bengaluru",
      time: "10:00 AM",
      date: "Today",
      amount: "₹350",
    },
    {
      id: "2",
      customerName: "Priya Patel",
      address: "45, Sunrise Residency, Indiranagar, Bengaluru",
      time: "2:30 PM",
      date: "Today",
      amount: "₹450",
    }
  ]);

  const translations = {
    en: {
      todaysJobs: "Today's Jobs",
      noJobs: "No jobs scheduled for today",
      getDirections: "Get Directions",
      call: "Call",
      today: "Today",
      earnings: "Earnings",
      todayEarning: "Today",
      weekEarning: "This Week",
      monthEarning: "This Month"
    },
    te: {
      todaysJobs: "నేటి పనులు",
      noJobs: "ఈరోజు షెడ్యూల్ చేయబడిన పనులు లేవు",
      getDirections: "దిశలు పొందండి",
      call: "కాల్",
      today: "ఈరోజు",
      earnings: "ఆదాయాలు",
      todayEarning: "ఈరోజు",
      weekEarning: "ఈ వారం",
      monthEarning: "ఈ నెల"
    }
  };

  const t = translations[language];
  
  useEffect(() => {
    // Get maid data from localStorage if available
    const storedMaid = localStorage.getItem("skoopa-maid");
    if (storedMaid) {
      try {
        const maid = JSON.parse(storedMaid);
        if (maid) {
          setMaidData(prev => ({
            ...prev,
            name: maid.name || "Nandini Chakaravarthy",
            skoops: maid.skoops || 230,
            level: maid.skoop_level || 3,
            image: maid.image || prev.image
          }));
        }
      } catch (error) {
        console.error("Error parsing maid data:", error);
      }
    }
  }, []);
  
  // Handle availability toggle
  const handleAvailabilityToggle = (checked: boolean) => {
    setIsAvailable(checked);
  };
  
  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("skoopa-maid");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    // Redirect to login page
    navigate("/maid-login");
  };

  // Navigate to directions
  const navigateToDirections = (job: any) => {
    // In a real app, we would pass the job ID and fetch the data
    // For this example, we'll just navigate and use the job data directly
    localStorage.setItem("current-job-directions", JSON.stringify(job));
    navigate(`/maid/directions/${job.id}`);
  };

  return (
    <div className="min-h-screen bg-white max-h-screen overflow-hidden flex flex-col">
      {/* Header with Skoops */}
      <MaidHeader notificationCount={3} skoops={maidData.skoops} level={maidData.level} />

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto hide-scrollbar pb-16">
        {/* Maid Profile Card */}
        <div className="p-4 bg-gradient-to-r from-azure/20 to-white">
          <div className="bg-white rounded-xl shadow-md border border-smoke p-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-coral bg-center bg-cover" 
                   style={{ backgroundImage: `url(${maidData.image})` }}>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-charcoal">{maidData.name}</h2>
                <div className="flex items-center gap-1">
                  <span className="text-amber-500">★</span>
                  <span className="font-bold text-amber-500">{maidData.rating}</span>
                </div>
                <div className="mt-1">
                  <span className="text-sapphire bg-azure/20 px-2 py-0.5 rounded-full text-xs font-medium">Level {maidData.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Large Availability Toggle */}
        <AvailabilityToggle 
          initialAvailability={isAvailable} 
          onToggle={handleAvailabilityToggle}
        />

        {/* Today's Jobs */}
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-md border border-smoke overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-sapphire/20 to-sapphire/5 border-b border-smoke">
              <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5 text-sapphire" />
                <span className="text-sapphire">{t.todaysJobs}</span>
              </h3>
            </div>
            
            {upcomingJobs.length > 0 ? (
              <div className="divide-y divide-smoke">
                {upcomingJobs.map((job) => (
                  <div key={job.id} className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-charcoal">{job.customerName}</h4>
                      <div className="bg-coral/10 text-coral px-3 py-1 rounded-full text-lg font-bold">
                        {job.amount}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-6 h-6 text-steel" />
                      <div className="text-lg">{job.time}</div>
                    </div>
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-6 h-6 text-steel flex-shrink-0 mt-1" />
                      <div className="text-steel text-lg">{job.address}</div>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-sapphire hover:bg-sapphire/90 text-white text-lg py-6 font-bold" 
                        onClick={() => navigateToDirections(job)}
                      >
                        {t.getDirections}
                      </Button>
                      <Button variant="outline" className="flex-1 border-sapphire text-sapphire text-lg py-6 font-bold">
                        <Phone className="w-5 h-5 mr-2" /> {t.call}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-smoke mx-auto mb-4" />
                <p className="text-xl text-steel">{t.noJobs}</p>
              </div>
            )}
          </div>
        </div>

        {/* Earnings Card */}
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-md border border-smoke overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-coral/20 to-coral/5 border-b border-smoke">
              <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
                <span className="text-coral">{t.earnings}</span>
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 divide-x divide-smoke">
                <div className="text-center px-2">
                  <p className="text-steel text-sm">{t.todayEarning}</p>
                  <p className="text-2xl font-bold text-coral">{maidData.earnings.today}</p>
                </div>
                <div className="text-center px-2">
                  <p className="text-steel text-sm">{t.weekEarning}</p>
                  <p className="text-2xl font-bold text-sapphire">{maidData.earnings.week}</p>
                </div>
                <div className="text-center px-2">
                  <p className="text-steel text-sm">{t.monthEarning}</p>
                  <p className="text-2xl font-bold text-charcoal">{maidData.earnings.month}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-smoke p-4">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => navigate("/maid/profile")}
            variant="outline" 
            className="py-6 text-lg font-medium border-2"
          >
            My Profile
          </Button>
          <Button 
            onClick={handleLogout}
            variant="destructive" 
            className="py-6 text-lg font-medium"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaidDashboard;
