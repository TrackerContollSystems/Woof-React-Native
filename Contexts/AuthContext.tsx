import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { setDecodedUserInfo } from "../Store/Auth/Auth.slice";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
type AuthChildren = {
  children: ReactNode;
};

type Cell = {
  isUserLoggedIn: any;
};

const AuthContext = createContext<Cell | null>(null);

export const AuthContextProvider = ({ children }: AuthChildren) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state: any) => state.AuthSlice);
  const [isUserLoggedIn, setisUserLoggedIn] = useState<any>();

  useEffect(() => {
    const getToken = async () => {
      const localStorageToken = await AsyncStorage.getItem("token");

      setisUserLoggedIn(localStorageToken);
    };
    getToken();
  }, []);
  useEffect(() => {
    console.log(authUser);
    if (!authUser.email) {
      const getTokenFromLocal: any = async () => {
        let token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode(token);
          console.log(token);
          dispatch(setDecodedUserInfo(decodedToken));
        }
      };
      getTokenFromLocal();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("not wrapped auth cntx");
  }
  return context;
};
