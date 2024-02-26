import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
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

          <Text style={styles.textValue}>Vehicle Number</Text>
          <TextInput
            placeholder="Vehicle Number"
            placeholderTextColor="black"
            style={[styles.input, focusedInput === 'vehicleNumber' && styles.focusedInput]}
            onFocus={() => setFocusedInput('vehicleNumber')}
          />

          <Text style={styles.textValue}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            style={[styles.input, focusedInput === 'password' && styles.focusedInput]}
            onFocus={() => setFocusedInput('password')}
          />
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forget password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Sign In pressed')}>
            <Text style={[styles.buttonText, styles.buttonTextBold]}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>---------------   Or continue with   ----------------</Text>
          <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={() => console.log('Google pressed')}>
            <Text style={[styles.buttonText, styles.buttonTextBold, styles.googleButtonText]}>Google</Text>
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
