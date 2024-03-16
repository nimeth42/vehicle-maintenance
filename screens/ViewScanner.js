import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScanDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan details</Text>
      {/* Add your scan details components or content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ScanDetails;
