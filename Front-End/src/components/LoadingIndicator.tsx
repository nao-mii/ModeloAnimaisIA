import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingIndicator: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#4CAF50" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
