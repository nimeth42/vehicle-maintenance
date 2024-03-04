import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from react-navigation/native

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation(); // Initialize navigation using useNavigation

  const handleVerifyOtp = () => {
    navigation.navigate('NewPassword'); // Navigate to the NewPassword screen
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Enter OTP</Text>
      </View>
      <Text style={styles.emailText}>Log as oshad###.##3</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setOtp(text)}
        value={otp}
        placeholder="Enter OTP"
        keyboardType="numeric"
        secureTextEntry={true} // Change to password field
        placeholderTextColor="black" // Change placeholder text color
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp} >
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  titleContainer: {
    paddingVertical: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    color: '#FFA500',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 15,
    color: "white",
    margin: 10,
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 5,
    color: 'black', // Change text color to black
  },
  button: {
    backgroundColor: '#FFA500',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OtpPage;
