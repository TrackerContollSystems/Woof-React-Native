import React, { ReactNode, createContext, useContext, useEffect } from "react";
import { setDecodedUserInfo } from "../Store/Auth/Auth.slice";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
type AuthChildren = {
  children: ReactNode;
};

type Cell = {};

const AuthContext = createContext<Cell | null>(null);

export const AuthContextProvider = ({ children }: AuthChildren) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state: any) => state.AuthSlice);

  useEffect(() => {
    if (!userAuth) {
      const getTokenFromLocal: any = async () => {
        let token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode(token);

          dispatch(setDecodedUserInfo(decodedToken));
        }
      };
      getTokenFromLocal();
    }
  }, []);
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("not wrapped auth cntx");
  }
  return context;
};
