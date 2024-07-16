import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AnimalLoadingSkeleton from "../../../COMPONENTS/Skeleton/AnimalLoadingSkeleton";
import { UseUiContext } from "../../../../Contexts/UiContext";

type AnimalPhotoLoaderProps = {
 
  name: string;
  icon: string;
  animalId:number 
};
const AnimalPhotoLoader: FC<AnimalPhotoLoaderProps> = (data) => {

  const navigation: any = useNavigation();
  const [loading,setLoading] = useState(false)
  const {   name, icon , animalId } = data;
  const { colors } = UseUiContext();


  const [animalDataWithBase64, setAnimalDataWithBase64] = useState<any>(null);
 
  useEffect(() => {
    if (icon ) {
      const imageFetch = async () => {
        try {
            setLoading(true)
          const response = await fetch( icon);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            setAnimalDataWithBase64( 
        
               reader.result,
            );
          };
          reader.readAsDataURL(blob);
          setLoading(false)

        } catch (error) {
            setLoading(false)

          console.error('Error fetching image:', error);
        }
      };

      imageFetch();
    }
  }, [icon ]);



 

 if(loading){
    return  <AnimalLoadingSkeleton  />
 }
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AnimalInfoDocuments", {
            animalName: name,
            photoUri: icon,
            id:animalId
          })
        }
        style={styles.animalContainer}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 45 }}
          source={{ uri: animalDataWithBase64 as string }}
        />
        <Text style={[styles.animalText, { color: colors.textColor }]}>{name}</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollViewContent: {
    alignItems: "center",
    padding: 5,
  },
  animalContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  animalText: {
    fontSize: 12,
    marginTop: 1,
  },
});
export default AnimalPhotoLoader