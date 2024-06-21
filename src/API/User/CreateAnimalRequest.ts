import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiManager } from "../APIManager";
import axios from "axios";

export const CreateAnimalRequest = async (body: any) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const { Name, Icon,  } = body;

    const formData = new FormData();
    formData.append('Name', Name);
    formData.append('Icon', Icon);
    
    formData.append('File', null); 

    console.log(formData); 

    const res = await axios.post(
      "https://pwdemo.mygps.ge:4542/Animal/CreateAnimalCover",
      formData ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",  
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
