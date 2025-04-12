
import { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const MaidProfile = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Get maid data from localStorage
  const storedMaid = localStorage.getItem("skoopa-maid");
  const initialMaid = storedMaid ? JSON.parse(storedMaid) : {
    name: "Lakshmi Devi",
    phoneNumber: "987654321",
    image: "https://ui-avatars.com/api/?name=Lakshmi+Devi&background=FFC0CB&color=800080&size=256"
  };
  
  const [name, setName] = useState(initialMaid.name);
  const [phone, setPhone] = useState(initialMaid.phoneNumber);
  const [image, setImage] = useState(initialMaid.image);
  
  const translations = {
    en: {
      editProfile: "Edit Profile",
      name: "Name",
      phone: "Phone Number",
      changePhoto: "Change Photo",
      save: "Save Changes",
      saved: "Profile saved successfully!",
      cancel: "Cancel"
    },
    te: {
      editProfile: "ప్రొఫైల్ సవరించండి",
      name: "పేరు",
      phone: "ఫోన్ నంబర్",
      changePhoto: "ఫోటో మార్చండి",
      save: "మార్పులను సేవ్ చేయండి",
      saved: "ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!",
      cancel: "రద్దు చేయండి"
    }
  };

  const t = translations[language];
  
  const handleSave = () => {
    // Update the localStorage data
    const updatedMaid = {
      ...initialMaid,
      name,
      phoneNumber: phone
    };
    
    localStorage.setItem("skoopa-maid", JSON.stringify(updatedMaid));
    
    toast({
      title: t.saved,
      description: new Date().toLocaleTimeString(),
    });
    
    navigate("/maid");
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white p-4 border-b border-smoke">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/maid")} className="text-sapphire">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-sapphire">{t.editProfile}</h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2 border-coral">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-coral text-white p-1 rounded-full">
              <Camera size={16} />
            </button>
          </div>
          <button className="mt-2 text-coral text-sm font-medium">
            {t.changePhoto}
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">{t.name}</label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-azure/50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">{t.phone}</label>
            <div className="flex items-center">
              <span className="bg-smoke px-3 py-2 rounded-l-md border border-r-0 border-azure/50">+91</span>
              <Input 
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="rounded-l-none border-azure/50"
                maxLength={10}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/maid")}
          >
            {t.cancel}
          </Button>
          <Button 
            className="bg-coral hover:bg-coral/90"
            onClick={handleSave}
          >
            {t.save}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaidProfile;
