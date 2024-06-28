import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiManager } from "../APIManager";
import axios from "axios";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

export const CreateAnimalRequest = async (body: any) => {
  const token = await AsyncStorage.getItem("token");
  const { Name, Icon, File } = body;

  const formData = new FormData();
  formData.append("Name", Name);

  if (File && File?.uri) {
    const fileUri = File?.uri;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      throw new Error("File does not exist");
    }

    // Assume JPEG if MIME type is not provided
    const fileType = File.mimeType || "image/jpeg";
    formData.append("File", {
      uri: fileUri,
      name: File.fileName || fileUri.split("/").pop(),
      type: fileType,
    } as any);
    formData.append("Icon", null);
  } else {
    formData.append("File", null);
    formData.append("Icon", Icon);
  }

  console.log("FormData:", formData); // Log FormData for debugging

  const response = await fetch(
    "https://pwdemo.mygps.ge:4542/Animal/CreateAnimalCover",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    }
  )
    .then((res) => res)
    .catch((err) => console.log(err));

  return response;
};
