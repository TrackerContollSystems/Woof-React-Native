export type UserInfo = {
  fullName: string;
  password: string;
  phoneNumber: string;
  email: string;
  cityId: number;
  genderId: number;
  birthDate: string;
};
export type decodedTokenType = {
  exp: number;
  iat: number;
  email: string;
  nbf: number;
  userId: string;
};
export type userInitialState = {
  error: string;
  success: string;
  loading: boolean;
  authUser: decodedTokenType | {};
  userInputForm: UserInfo;
};
