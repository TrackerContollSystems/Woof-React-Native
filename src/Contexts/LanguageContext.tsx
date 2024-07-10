// import React, { useContext, createContext, ReactNode } from "react";

// type LanguageContextProviderProps = {
//   children: ReactNode;
// };

// type Cell = {};

// const LanguageContext = createContext<Cell | null>(null);

// export const LanguageContextProvider = ({
//   children,
// }: LanguageContextProviderProps) => {
//   return (
//     <LanguageContext.Provider value={{}}>{children}</LanguageContext.Provider>
//   );
// };

// export const UseLanguageContext = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error("Context Not Wrapped");
//   }

//   return context;
// };



import React, { useContext, createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LanguageContextProviderProps = {
  children: ReactNode;
};

type LanguageContextType = {
  language: string;
  changeLanguage: (language: string) => void;
  availableLanguages: string[];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageContextProvider = ({
  children,
}: LanguageContextProviderProps) => {
  const [language, setLanguage] = useState("en");
  const availableLanguages = ["en", "es", "fr", "de"]; 

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (language: string) => {
    setLanguage(language);
    await AsyncStorage.setItem("language", language);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("LanguageContext not wrapped");
  }
  return context;
};

