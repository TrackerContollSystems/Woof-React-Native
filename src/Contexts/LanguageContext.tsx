import React, { useContext, createContext, ReactNode } from "react";

type LanguageContextProviderProps = {
  children: ReactNode;
};

type Cell = {};

const LanguageContext = createContext<Cell | null>(null);

export const LanguageContextProvider = ({
  children,
}: LanguageContextProviderProps) => {
  return (
    <LanguageContext.Provider value={{}}>{children}</LanguageContext.Provider>
  );
};

export const UseLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("Context Not Wrapped");
  }

  return context;
};
