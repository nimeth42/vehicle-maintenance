import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseUrl from '../baseUrl/baseUrl'; // Import the baseUrl function

const SignUpPage = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [reEnterPasswordError, setReEnterPasswordError] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState(''); // State for vehicle number

  const navigation = useNavigation(); // Get the navigation object

  // Function to validate email
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignInPage'); // Navigate to the SignInPage
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/register`, {
        email: email,
        password: password,
        plateNo: vehicleNumber // Using vehicleNumber in the request
      });
      
      console.log('Response from backend:', response.data); // Access response data using response.data
      
      // After successful sign up, navigate to the home page or any other destination
      navigation.navigate('SignInPage'); // Navigate to the SignInPage
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error status:', error.response.status);
        console.error('Error data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error in request setup:', error.message);
      }
      // Handle errors, such as displaying an error message to the user
      console.error('Error while signing up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text style={styles.title}>DRIVE LANKA</Text>

      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.subtitle}>Create your account</Text>

          <Text style={styles.textValue}>Vehicle Number</Text>
          <TextInput
            placeholder="Vehicle Number"
            placeholderTextColor="black"
            style={[styles.input, { width: 250 }, focusedInput === 'vehicleNumber' && styles.focusedInput]}
            onFocus={() => setFocusedInput('vehicleNumber')}
            onBlur={() => setFocusedInput(null)}
            onChangeText={(text) => setVehicleNumber(text)} // Update vehicleNumber state
          />

          <Text style={styles.textValue}>Email Address</Text>
          <TextInput
            placeholder="user@gmail.com"
            placeholderTextColor="black"
            style={[styles.input, { width: 250 }, focusedInput === 'email' && styles.focusedInput, emailError && styles.errorInput]}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => {
              setFocusedInput(null);
              validateEmail(); // Validate email onBlur
            }}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.textValue}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            style={[styles.input, { width: 250 }, focusedInput === 'password' && styles.focusedInput]}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
            onChangeText={(text) => setPassword(text)}
          />

          <Text style={styles.textValue}>Re-enter Password</Text>
          <TextInput
            placeholder="Re-enter Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            style={[styles.input, { width: 250 }, focusedInput === 'reEnterPassword' && styles.focusedInput, reEnterPasswordError && styles.errorInput]}
            onFocus={() => setFocusedInput('reEnterPassword')}
            onBlur={() => {
              setFocusedInput(null);
              if (reEnterPassword !== password) {
                setReEnterPasswordError('Passwords do not match');
              } else {
                setReEnterPasswordError('');
              }
            }}
            onChangeText={(text) => {
              setReEnterPassword(text);
              setReEnterPasswordError('');
            }}
          />
          {reEnterPasswordError ? <Text style={styles.errorText}>{reEnterPasswordError}</Text> : null}
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={handleSubmit}>
            <Text style={[styles.buttonText, styles.buttonTextBold]}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>---------------   Or continue with   ----------------</Text>

          <TouchableOpacity style={[styles.button, styles.googleButton, { alignSelf: 'center' }]} onPress={handleSubmit}>
            <Text style={[styles.buttonText, styles.buttonTextBold, styles.googleButtonText]}>Google</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.normalText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToSignIn}>
              <Text style={styles.linkText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Black background
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center', // Center the items horizontally
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    color: 'white',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 10,
    color: '#FFA500',
  },
  textValue: {
    fontSize: 15,
    marginBottom: 10,
    color: 'white',
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 40,
    marginBottom: 10,
    width: 200,
  },
  googleButton: {
    backgroundColor: 'transparent',
    borderColor: '#FFA500',
    borderWidth: 2,
    width: 200,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonTextBold: {
    fontWeight: 'bold',
  },
  googleButtonText: {
    color: '#FFA500', // Change text color to yellow
    textAlign: 'center',
    fontSize: 20,
  },
  orText: {
    fontSize: 15,
    margin: 10,
    textAlign: 'center',
    color: 'white',
  },
  normalText: {
    fontSize: 15,
    color: 'white',
  },
  linkText: {
    fontSize: 15,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  focusedInput: {
    borderColor: '#FFA500', // Yellow border color
    borderWidth: 1,
  },
});

export default SignUpPage;
