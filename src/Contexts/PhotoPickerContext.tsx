import React, { ReactNode, createContext, useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ActionSheetIOS, Alert, Platform } from "react-native";

type PhotocntextProviderProps = {
  children: ReactNode;
};
type Cell = {
  handlePickImage: () => void;
  photoFromGallery: any;
  setPhotoFromGallery: React.Dispatch<any>;
};

const PhotoContext = createContext<Cell | null>(null);

export const PhotoContextProvider = ({
  children,
}: PhotocntextProviderProps) => {
  const [photoFromGallery, setPhotoFromGallery] = useState<any>();
  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access camera was denied");
    }
  };

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access media library was denied");
    }
  };

  const openImagePickerAsync = async (source: any) => {
    await requestCameraPermissions();
    await requestMediaLibraryPermissions();

    let result;
    if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      setPhotoFromGallery(result);
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    setPhotoFromGallery(result);
  };

  const handlePickImage = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Take Photo", "Choose from Library"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            openImagePickerAsync("camera");
          } else if (buttonIndex === 2) {
            openImagePickerAsync("gallery");
          }
        }
      );
    } else {
      Alert.alert(
        "Select Image",
        "Choose an option",
        [
          { text: "Take Photo", onPress: () => openImagePickerAsync("camera") },
          {
            text: "Choose from Library",
            onPress: () => openImagePickerAsync("gallery"),
          },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <PhotoContext.Provider
      value={{ handlePickImage, photoFromGallery, setPhotoFromGallery }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const UsePhotoContext = () => {
  const context = useContext(PhotoContext);

  if (!context) {
    throw new Error("Photo Context Not Wrapped");
  }

  return context;
};
