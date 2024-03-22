import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ChangeProfile = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentVehicleNumber, setCurrentVehicleNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleUpdate = () => {
    // Here you would implement the logic to update the email associated with the current vehicle number in your database
    // This could involve making API calls or using a state management library like Redux

    // Example implementation:
    console.log('Current Email:', currentEmail);
    console.log('Current Vehicle Number:', currentVehicleNumber);
    console.log('New Email:', newEmail);
    // You would replace the console.log with your actual update logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Profile</Text>
      <Text style={styles.label}>Current Email:</Text>
      <TextInput
        style={styles.input}
        value={currentEmail}
        onChangeText={setCurrentEmail}
        placeholder="Enter current email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Current Vehicle Number:</Text>
      <TextInput
        style={styles.input}
        value={currentVehicleNumber}
        onChangeText={setCurrentVehicleNumber}
        placeholder="Enter current vehicle number"
        autoCapitalize="characters"
      />
      <Text style={styles.label}>New Email:</Text>
      <TextInput
        style={styles.input}
        value={newEmail}
        onChangeText={setNewEmail}
        placeholder="Enter new email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Update" onPress={handleUpdate} color="orange" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black', // Set background color to black
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFA500', // Set text color to white
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white', // Set text color to white
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius:8,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Set input background color to white
  },
});

export default ChangeProfile;