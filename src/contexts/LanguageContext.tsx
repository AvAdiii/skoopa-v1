
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "te";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Load the language preference from localStorage if available
    const savedLanguage = localStorage.getItem("skoopa-language");
    return (savedLanguage as Language) || "en";
  });

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem("skoopa-language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
