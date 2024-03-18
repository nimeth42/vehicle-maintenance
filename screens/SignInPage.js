import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseUrl from '../baseUrl/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleForgotPassword = () => {
    // Navigate to the OTP page
    navigation.navigate('OtpPage');
  };
  
  const handleCreateAccount = () => {
    navigation.navigate('SignUpPage'); // Navigate to the SignUp screen
  };

  const handleGrageUser = () => {
    navigation.navigate('GrageUser'); // Navigate to the SignUp screen
  };
  
  // const handleHomePage = async () => {

  //   navigation.navigate('HomePage');


  //   // try {
  //   //   const response = await axios.post(`${baseUrl}/api/v1/user/login`, {
  //   //     email: email,
  //   //     password: password,
  //   //     plateNo: vehicleNumber
  //   //   });
  
  //   //   console.log('Response from backend:', response.data); // Access response data using response.data
  
  //   //   // After successful login, navigate to the home page
  //   //   navigation.navigate('HomePage');
  //   // } catch (error) {
  //   //   if (error.response) {
  //   //     // The request was made and the server responded with a status code
  //   //     // that falls out of the range of 2xx
  //   //     console.error('Server responded with error status:', error.response.status);
  //   //     console.error('Error data:', error.response.data);
  //   //   } else if (error.request) {
  //   //     // The request was made but no response was received
  //   //     console.error('No response received from server:', error.request);
  //   //   } else {
  //   //     // Something happened in setting up the request that triggered an Error
  //   //     console.error('Error in request setup:', error.message);
  //   //   }
  //   //   console.error('Error while signing in:', error);
  //   // }
  // };
  


const handleHomePage = async () => {

  // navigation.navigate('HomePage');

  try {
    const response = await axios.post(`${baseUrl}/api/v1/user/login`, {
      email: email,
      password: password,
      plateNo: vehicleNumber
    });

    console.log('Response from backend:', response.data); // Access response data using response.data

    // Check if login was successful
    if (response.data.status === "success") {
      // Store the token in AsyncStorage
      await AsyncStorage.setItem('token', response.data.token);
      
      // Store the email and plateNo
      await AsyncStorage.setItem('email', response.data.data.email);
      await AsyncStorage.setItem('plateNo', response.data.data.plateNo);

      // Retrieve the token, email, and plateNo from AsyncStorage
      const storedToken = await AsyncStorage.getItem('token');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPlateNo = await AsyncStorage.getItem('plateNo');

      console.log('Retrieved Token:', storedToken);
      console.log('Retrieved Email:', storedEmail);
      console.log('Retrieved Plate No:', storedPlateNo);

      // Navigate to the home page
      navigation.navigate('HomePage');
    } else if(response.data.status === "failed"){
      // If login was not successful, display an error message
      console.log('Login failed:', response.data.comment);
      Alert.alert('Login Failed', response.data.comment);
    }
  } catch (error) {
    // Handle errors such as network issues, etc.
    console.error('Error while signing in:', error);
    Alert.alert('Error', 'Failed to sign in. Please try again later.');
  }
};


  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleInputChange = (text) => {
    setEmail(text);
    if (text.trim() !== '') {
      setIsInputFilled(true);
    } else {
      setIsInputFilled(false);
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleVehicleNumberChange = (text) => {
    setVehicleNumber(text);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text style={styles.title}>DRIVE LANKA</Text>

      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.subtitle}>Welcome Back!</Text>
          <Text style={styles.textValue}>Email</Text>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="black"
            style={[styles.input, emailError && styles.errorInput, focusedInput === 'email' && styles.focusedInput]}
            onChangeText={handleInputChange}
            onBlur={validateEmail}
            onFocus={() => setFocusedInput('email')}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={styles.textValue}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            style={[styles.input, focusedInput === 'password' && styles.focusedInput]}
            onChangeText={handlePasswordChange}
            onFocus={() => setFocusedInput('password')}
          />
          
          <Text style={styles.textValue}>Vehicle Number</Text>
          <TextInput
            placeholder="Vehicle Number"
            placeholderTextColor="black"
            style={[styles.input, focusedInput === 'vehicleNumber' && styles.focusedInput]}
            onChangeText={handleVehicleNumberChange}
            onFocus={() => setFocusedInput('vehicleNumber')}
          />
          
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forget password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={handleHomePage}>
            <Text style={[styles.buttonText, styles.buttonTextBold]}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>---------------   Or continue with   ----------------</Text>
          <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGrageUser}>
            <Text style={[styles.buttonText, styles.buttonTextBold, styles.googleButtonText]}>Grage User</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.normalText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.linkText}>Create account</Text>
            </TouchableOpacity>
          </View>

          <></>
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
    width: 250, // Added width to input fields
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 40,
    marginBottom: 10,
    width:200,
  },
  googleButton: {
    backgroundColor: 'transparent',
    borderColor: '#FFA500',
    borderWidth: 2,
    width:200,
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
  forgotPassword: {
    fontSize: 15,
    color: '#FFA500',
    textDecorationLine: 'underline', // Underline text to make it look like a link
    marginTop: 10, // Add some margin to separate it from other elements
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

export default SignInPage;
