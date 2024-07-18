import { ApiManager } from "../APIManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
export const UpdateAnimalName = async (animalId: number, updatedField: any) => {
  console.log(animalId, updatedField);
  try {
    const obj = {
      id: animalId,
      updatedField: updatedField,
    };
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalName", obj, {
      headers,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateAnimalBirth = async (
  animalId: number,
  updatedField: any
) => {
  const obj = {
    id: animalId,
    updatedField: updatedField,
  };
  try {
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalBirth", obj, {
      headers,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateAnimalSpecie = async (
  animalId: number,
  updatedField: any
) => {
  const obj = {
    id: animalId,
    updatedField: updatedField,
  };
  try {
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalSpecie", obj, {
      headers,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateAnimalBreed = async (
  animalId: number,
  updatedField: any
) => {
  const obj = {
    id: animalId,
    updatedField: updatedField,
  };

  try {
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalBreed", obj, {
      headers,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateAnimalSterilization = async (
  animalId: number,
  updatedField: any
) => {
  try {
    const obj = {
      id: animalId,
      updatedField: updatedField,
    };
    const headers = await getAuthHeader();
    const res = await ApiManager.patch(
      "Animal/UpdateAnimalSterilization",
      obj,
      { headers }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateAnimalColor = async (
  animalId: number,
  updatedField: any
) => {
  try {
    const obj = {
      id: animalId,
      updatedField: updatedField,
    };
    const headers = await getAuthHeader();
    const res = await ApiManager.patch("Animal/UpdateAnimalColor", obj, {
      headers,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
