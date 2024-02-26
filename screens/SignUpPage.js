import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const SignUpPage = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [reEnterPasswordError, setReEnterPasswordError] = useState('');

  // Function to validate email
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  const navigation = useNavigation(); // Get the navigation object

  const navigateToSignIn = () => {
    navigation.navigate('SignInPage'); // Navigate to the SignInPage
  };
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text style={styles.title}>DRIVE LANKA</Text>

      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.subtitle}>Create your account</Text>
          <Text style={styles.textValue}>Full Name</Text>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="black"
            style={[styles.input, { width: 250 }, focusedInput === 'fullName' && styles.focusedInput]}
            onFocus={() => setFocusedInput('fullName')}
            onBlur={() => setFocusedInput(null)}
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
            keyboardType="email-address" // Set keyboardType to 'email-address'
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
          <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={() => console.log('Sign Up pressed')}>
            <Text style={[styles.buttonText, styles.buttonTextBold]}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>---------------   Or continue with   ----------------</Text>

          <TouchableOpacity style={[styles.button, styles.googleButton, { alignSelf: 'center' }]} onPress={() => console.log('Google pressed')}>
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
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 10,
    color: '#FFA500',
  },
  textValue: {
    fontSize: 16,
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
  focusedInput: {
    borderColor: '#FFA500',
    borderWidth: 2,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
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
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    color: 'white',
  },
  normalText: {
    fontSize: 20,
    color: 'white',
  },
  linkText: {
    fontSize: 20,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default SignUpPage;
