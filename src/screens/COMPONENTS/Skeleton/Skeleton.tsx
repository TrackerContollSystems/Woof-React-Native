import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const SkeletonLoading = () => {
  return (
    <View style={styles.skeletonContainer}>
      <ActivityIndicator size="large" color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0', // Placeholder background color
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default SkeletonLoading;
