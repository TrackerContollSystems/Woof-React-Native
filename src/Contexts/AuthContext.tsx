import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userInitialState } from "../Types/UserType";
type AuthChildren = {
  children: ReactNode;
};

type Cell = {
  isUserLoggedIn: any;
  authState: userInitialState;
  authDispatch: React.Dispatch<Action>;
};

type Action =
  | { type: "set_fullName"; payload: string }
  | { type: "set_password"; payload: string }
  | { type: "set_phoneNumber"; payload: string }
  | { type: "set_email"; payload: string }
  | { type: "set_cityId"; payload: number }
  | { type: "set_genderId"; payload: number }
  | { type: "set_birthDate"; payload: string }
  | { type: "set_decoded_user"; payload: any };
const AuthContext = createContext<Cell | null>(null);

export const AuthContextProvider = ({ children }: AuthChildren) => {
  const [isUserLoggedIn, setisUserLoggedIn] = useState<any>();
  //
  const initialState: userInitialState = {
    authUser: {},
    userInputForm: {
      fullName: "",
      password: "",
      phoneNumber: "",
      email: "",
      cityId: 0,
      genderId: 0,
      birthDate: "",
    },
  };
  const reducer = (state: userInitialState, action: Action) => {
    switch (action.type) {
      case "set_fullName":
      case "set_password":
      case "set_phoneNumber":
      case "set_email":
      case "set_cityId":
      case "set_genderId":
      case "set_birthDate":
        return {
          ...state,
          userInputForm: {
            ...state.userInputForm,
            [action.type.substring(4)]: action.payload,
          },
        };
      case "set_decoded_user":
        return { ...state, authUser: action.payload };
      default:
        return state;
    }
  };
  const [authState, authDispatch] = useReducer(reducer, initialState);
  //

  useEffect(() => {
    const getToken = async () => {
      const localStorageToken = await AsyncStorage.getItem("token");

      setisUserLoggedIn(localStorageToken);
    };
    getToken();
  }, []);
  useEffect(() => {
    if (!authState.authUser.email) {
      const getTokenFromLocal: any = async () => {
        let token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode(token);
          console.log(token);
          authDispatch({ type: "set_decoded_user", payload: decodedToken });
        }
      };
      getTokenFromLocal();
    }
  }, [authState]);
  return (
    <AuthContext.Provider value={{ isUserLoggedIn, authState, authDispatch }}>
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
