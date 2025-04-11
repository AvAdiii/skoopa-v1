
import { createContext, useContext, useState, ReactNode } from "react";

type LanguageType = "english" | "telugu";

type Translations = {
  [key in LanguageType]: Record<string, string>;
};

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  english: {
    // Common translations
    skoopsPoints: "Skoops",
    level: "Level",
    notifications: "Notifications",
    profile: "Profile",
    logout: "Logout",
    
    // Home translations
    home: "Home",
    yourLocation: "Your Location",
    
    // Skoops translations
    skoopsBenefits: "Skoops Benefits",
    earnSkoopsWith: "Earn Skoops with:",
    lowCancellationRates: "Low cancellation rates",
    positiveReviews: "Positive maid reviews",
    consistentPayments: "Consistent payments",
    higherSkoopLevelsUnlock: "Higher Skoop levels unlock:",
    priorityService: "Priority service booking",
    discounts: "Discounts on subscriptions",
    premiumMaids: "Access to premium maids",
    
    // Maid dashboard
    availability: "Availability",
    available: "Available",
    notAvailable: "Not Available",
    todaysJobs: "Today's Jobs",
    earnings: "Earnings",
    todayEarnings: "Today",
    weekEarnings: "This Week",
    monthEarnings: "This Month",
    myProfile: "My Profile",
    
    // Settings
    settings: "Settings",
    darkMode: "Dark Mode",
    useDarkTheme: "Use dark theme",
    pushNotifications: "Push Notifications",
    receiveBookingUpdates: "Receive booking updates",
    language: "Language",
    selectLanguage: "Select Language",
    privacyPolicy: "Privacy Policy",
    readPrivacyPolicy: "Read our privacy policy",
    termsOfService: "Terms of Service",
    readTermsOfService: "Read our terms of service",
    deleteAccount: "Delete Account",
    appVersion: "App Version",
    
    // Language
    english: "English",
    telugu: "తెలుగు"
  },
  telugu: {
    // Common translations
    skoopsPoints: "స్కూప్స్",
    level: "స్థాయి",
    notifications: "నోటిఫికేషన్లు",
    profile: "ప్రొఫైల్",
    logout: "లాగ్అవుట్",
    
    // Home translations
    home: "హోమ్",
    yourLocation: "మీ ప్రాంతం",
    
    // Skoops translations
    skoopsBenefits: "స్కూప్స్ ప్రయోజనాలు",
    earnSkoopsWith: "స్కూప్స్ సంపాదించండి:",
    lowCancellationRates: "తక్కువ రద్దు రేట్లు",
    positiveReviews: "సానుకూల సమీక్షలు",
    consistentPayments: "నిరంతర చెల్లింపులు",
    higherSkoopLevelsUnlock: "ఉన్నత స్థాయి ప్రయోజనాలు:",
    priorityService: "ప్రాధాన్య సేవా బుకింగ్",
    discounts: "సబ్‌స్క్రిప్షన్‌లపై తగ్గింపులు",
    premiumMaids: "ప్రీమియం మెయిడ్‌లకు ప్రాప్యత",
    
    // Maid dashboard
    availability: "అందుబాటు",
    available: "అందుబాటులో ఉన్నారు",
    notAvailable: "అందుబాటులో లేరు",
    todaysJobs: "నేటి పనులు",
    earnings: "సంపాదన",
    todayEarnings: "ఈరోజు",
    weekEarnings: "ఈ వారం",
    monthEarnings: "ఈ నెల",
    myProfile: "నా ప్రొఫైల్",
    
    // Settings
    settings: "సెట్టింగ్‌లు",
    darkMode: "డార్క్ మోడ్",
    useDarkTheme: "డార్క్ థీమ్ ఉపయోగించండి",
    pushNotifications: "పుష్ నోటిఫికేషన్లు",
    receiveBookingUpdates: "బుకింగ్ అప్‌డేట్‌లను పొందండి",
    language: "భాష",
    selectLanguage: "భాషను ఎంచుకోండి",
    privacyPolicy: "ప్రైవసీ పాలసీ",
    readPrivacyPolicy: "మా ప్రైవసీ పాలసీని చదవండి",
    termsOfService: "సేవా నియమాలు",
    readTermsOfService: "మా సేవా నియమాలను చదవండి",
    deleteAccount: "ఖాతాను తొలగించండి",
    appVersion: "యాప్ వెర్షన్",
    
    // Language
    english: "English",
    telugu: "తెలుగు"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "english",
  setLanguage: () => {},
  t: (key) => key
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>("english");
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
