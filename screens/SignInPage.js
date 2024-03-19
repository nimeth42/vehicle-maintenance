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

  const handleForgotPassword = () => {
    navigation.navigate('OtpPage');
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUpPage');
  };

  const handleGrageUser = () => {
    navigation.navigate('GrageUser');
  };

  const handleHomePage = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/login`, {
        email: email,
        password: password,
        plateNo: vehicleNumber
      });
  
      console.log('Response from backend:', response.data);
  
      // Access specific properties from the response object
      const { status, comment, data } = response.data;
      console.log(status); // "failed"
      console.log(comment); // "User not found"
      console.log(data); 
  
      if (status === "success") {
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('email', data.email);
        AsyncStorage.setItem('plateNo', data.plateNo);
  
        const storedToken = await AsyncStorage.getItem('token');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPlateNo = await AsyncStorage.getItem('plateNo');
  
        console.log('Retrieved Token:', storedToken);
        console.log('Retrieved Email:', storedEmail);
        console.log('Retrieved Plate No:', storedPlateNo);
  
        setSuccessModalVisible(true);
  
        setTimeout(() => {
          navigation.navigate('HomePage');
        }, 1500);
      } else if (status === "failed") {
        console.log('Failed response:', response.data); // Log entire response object
        if (comment === "User not found" || comment === "Incorrect password") {
          console.log('Login failed:', comment);
          Alert.alert('Login Failed', comment);
        } else {
          console.log('Other error:', comment);
          // Handle other error scenarios as needed
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle network errors or other unexpected errors
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
  modalView: {
    margin: 20,
    backgroundColor: '#FFA500',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    color:'white'

  }
});

export default SignInPage;
