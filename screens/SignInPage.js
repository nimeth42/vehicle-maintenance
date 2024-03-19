import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Modal, SafeAreaView } from 'react-native';
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
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State to hold modal message


  const handleForgotPassword = () => {
    navigation.navigate('OtpPage');
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUpPage');
  };

  const handleGrageUser = () => {
    navigation.navigate('GrageUser');
  };

  // const handleHomePage = async () => {
  //   try {
  //     const response = await axios.post(`${baseUrl}/api/v1/user/login`, {
  //       email: email,
  //       password: password,
  //       plateNo: vehicleNumber
  //     });
  
  //     console.log('Response from backend:', response.data);
  
  //     // Access specific properties from the response object
  //     const { status, comment, data } = response.data;
  //     console.log(status); // "failed"
  //     console.log(comment); // "User not found"
  //     console.log(data); 
  
  //     if (status === "success") {
  //       AsyncStorage.setItem('token', data.token);
  //       AsyncStorage.setItem('email', data.email);
  //       AsyncStorage.setItem('plateNo', data.plateNo);
  
  //       const storedToken = await AsyncStorage.getItem('token');
  //       const storedEmail = await AsyncStorage.getItem('email');
  //       const storedPlateNo = await AsyncStorage.getItem('plateNo');
  
  //       console.log('Retrieved Token:', storedToken);
  //       console.log('Retrieved Email:', storedEmail);
  //       console.log('Retrieved Plate No:', storedPlateNo);
  
  //       setSuccessModalVisible(true);
  
  //       setTimeout(() => {
  //         navigation.navigate('HomePage');
  //       }, 1500);
  //     } else if (status === "failed") {
  //       console.log('Failed response:', response.data); // Log entire response object
  //       if (comment === "User not found" || comment === "Incorrect password") {
  //         console.log('Login failed:', comment);
  //         Alert.alert('Login Failed', comment);
  //       } else {
  //         console.log('Other error:', comment);
  //         // Handle other error scenarios as needed
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     // Handle network errors or other unexpected errors
  //   }
  // };
  
  
  const handleHomePage = async () => {
    // Validate email
    validateEmail();
  
    // Check if there are any email errors
    if (emailError) {
      return; // Stop submission if there are email errors
    }
  
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/login`, {
        email: email,
        password: password,
        plateNo: vehicleNumber // Using vehicleNumber in the request
      });
  
      console.log('Response from backend:', response.data); // Access response data using response.data
  
      // Store token in AsyncStorage
      await AsyncStorage.setItem('token', response.data.token); // Assuming token is returned from backend
  
    
      await  AsyncStorage.setItem('email', response.data.data.email);
      await AsyncStorage.setItem('plateNo', response.data.data.plateNo);
      // Print the token that has been set
      const storedToken = await AsyncStorage.getItem('token');
      console.log('Stored Token:', storedToken);
  
      // Navigate to Home Page
      navigation.navigate('HomePage');
    } catch (error) {
      if (error.response) {
        // If login fails, set modalMessage and modalVisible to true to display the modal
        console.log(error.response.data.comment);
        setModalMessage(error.response.data.comment);
        setModalVisible(true);
      } else if (error.request) {
        // Network error occurred
        console.error('Network error:', error.request);
        // Set error message or take necessary action for network error
        // For example, display a message to the user indicating network issue
        setModalMessage('Network error. Please check your internet connection.');
        setModalVisible(true);
      } else {
        // Something else went wrong
        console.error('Error:', error.message);
        // Set error message or take necessary action for other types of errors
        setModalMessage('An error occurred. Please try again later.');
        setModalVisible(true);
      }
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
    <SafeAreaView style={styles.container}>
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={successModalVisible}
            onRequestClose={() => {
              setSuccessModalVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Login Successful!</Text>
                {/* Add your text message here */}
                <Text style={styles.modalText}>Welcome to the Drive Lanka app.</Text>
              </View>
            </View>
          </Modal>
        </View>
      </View>


      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.customButton}>
        <Text style={styles.buttonText}>{modalMessage}</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
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
    width: 250,
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
    color: '#FFA500',
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
    textDecorationLine: 'underline',
    marginTop: 10,
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
    borderColor: '#FFA500',
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
 
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  customButton: {
    backgroundColor: 'red', // Set the background color of the button to red
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SignInPage;
