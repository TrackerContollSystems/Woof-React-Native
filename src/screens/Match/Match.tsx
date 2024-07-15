import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { UseUiContext } from '../../Contexts/UiContext';

export default function Match() {
    const { colors } = UseUiContext();
  return (
    <View style={[styles.container,{backgroundColor: colors.backgroundColor,}]}>
      <Text>Match</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
    },
  
  })