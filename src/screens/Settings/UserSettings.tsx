import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UseUiContext } from '../../Contexts/UiContext';

export default function UserSettings() {
  const { toggleTheme, theme } = UseUiContext();

  const textStyle = {
    padding: 30,
    fontSize: 25,
    color: theme === 'dark' ? 'red' : 'black', 
  };

  return (
    <View>
      <Text>UserSettings</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text style={textStyle}>Color</Text>
      </TouchableOpacity>
    </View>
  );
}
