import { ApiManager } from "../APIManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const UpdateAnimalName = async (animalId: number, name: string) => {
  try {
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalName", {
      animalId,
      name,
    }, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateAnimalBirth = async (animalId: number, birthDate: string) => {
  try {
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalBirth", {
      animalId,
      birthDate,
    }, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateAnimalSpecie = async (animalId: number, specie: string) => {
  try {
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalSpecie", {
      animalId,
      specie,
    }, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateAnimalBreed = async (animalId: number, breed: string) => {
  try {
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalBreed", {
      animalId,
      breed,
    }, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateAnimalSterilization = async (animalId: number, sterilization: string) => {
  try {
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalSterilization", {
      animalId,
      sterilization,
    }, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateAnimalColor = async (animalId: number, color: string) => {
  try {
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalColor", {
      animalId,
      color,
    }, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
