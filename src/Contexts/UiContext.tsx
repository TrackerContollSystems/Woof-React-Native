import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import React from "react";

type ThemeType = "light" | "dark";

type Cell = {
  theme: ThemeType;
  colors: (typeof ColorSchemas)["light"];
  toggleTheme: () => void;
};

const ColorSchemas = {
  light: {
    //  general colors
    brandBlue: "#2C3F51",
    brandWhite: "white",
    brandLightBlue: "#eff0ff",
    brandGray: "#D3D3D3",
    brandYellow: "#ffe438",
    // UI colors
    backgroundColor: "white",
    textColor: "black",
    btnTextColor: "white",
    buttonColor: "#2C3F51",
  },
  dark: {
    //  general colors
    brandBlue: "#2C3F51",
    brandWhite: "white",
    brandLightBlue: "#eff0ff",
    brandGray: "#D3D3D3",
    brandYellow: "#ffe438",
    // UI colors
    backgroundColor: "#121212",
    buttonColor: "orange",
    // Text Colors
    textColor: "white",
    btnTextColor: "white",
  },
};

const UiContext = createContext<null | Cell>(null);

export const UiContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    const GetTheme = async () => {
      const localTheme = await AsyncStorage.getItem("theme");
      if (localTheme) {
        setTheme(localTheme as ThemeType);
      }
    };
    GetTheme();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      AsyncStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <UiContext.Provider
      value={{ theme, colors: ColorSchemas[theme], toggleTheme }}
    >
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
