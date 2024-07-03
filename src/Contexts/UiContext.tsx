import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import React from "react";
type Cell = {
  ColorSchemas: any;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
};

const UiContext = createContext<null | Cell>(null);

export const UiContextProvider = ({ children }: { children: ReactNode }) => {
  const BrandColors = {
    brandBlue: "#2C3F51",
    brandWhite: "white",
    brandLightBlue: "#eff0ff",
    brandGray: "#D3D3D3",
    brandYellow: "#ffe438",
  };

  const [theme, setTheme] = useState("light");

  const ColorSchemas = {
    brandBlue: "#2C3F51",
    brandWhite: "white",
    brandLightBlue: "#eff0ff",
    brandGray: "#D3D3D3",
    brandYellow: "#ffe438",
    backgroundColorLight: "",
    blackgroundColorDark: "",
  };

  useEffect(() => {}, [theme]);

  useEffect(() => {
    const GetTheme = async () => {
      const localTheme = await AsyncStorage.getItem("theme");
      if (localTheme) {
        setTheme(localTheme);
      }
    };
    GetTheme();
  }, []);

  return (
    <UiContext.Provider value={{ ColorSchemas, setTheme, theme }}>
      {children}
    </UiContext.Provider>
  );
};

export const UseUiContext = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("Ui Not Wrapped");
  }
  return context;
};
