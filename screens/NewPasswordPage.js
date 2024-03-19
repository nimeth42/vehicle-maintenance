import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const NewPasswordPage = () => {
  const navigation = useNavigation(); // Initialize navigation using useNavigation
  const [focusedInput, setFocusedInput] = useState(null);
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [reEnterPasswordError, setReEnterPasswordError] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State to hold modal message

  const validatePasswords = () => {
    if (reEnterPassword !== password) {
      setReEnterPasswordError('Passwords do not match');
    } else {
      setReEnterPasswordError('');
    }
  };

  const submitPassword = async() => {

    validatePasswords();


    try {
      const storedPlateNo = await AsyncStorage.getItem('plateNo');
      const storedEmail = await AsyncStorage.getItem('email');

      console.log(storedPlateNo, storedEmail);

      const response = await axios.post(`${baseUrl}/api/v1/user/changePassword`, {
        email: storedEmail,
        plateNo: storedPlateNo,
        password:password
      });
      
      console.log('Response from backend:', response.data);
      
      // setModalMessage('OTP Sent Successfully');
      // setModalVisible(true);
      navigation.navigate('SignInPage');

    } catch (error) {
      // console.error('Error sending OTP:', error);
      if (error.response) {
        setModalMessage(error.response.data.comment);
        setModalVisible(true);
      }
    }
    // navigation.navigate('SignInPage'); // Navigate to the SignUp screen
  };
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text style={styles.title}>Change Password</Text>

      <View style={styles.innerContainer}>
        <View>
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
              validatePasswords();
            }}
            onChangeText={(text) => {
              setReEnterPassword(text);
              setReEnterPasswordError('');
            }}
          />
          {reEnterPasswordError ? <Text style={styles.errorText}>{reEnterPasswordError}</Text> : null}
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={submitPassword}>
            <Text style={[styles.buttonText, styles.buttonTextBold]}>Submit</Text>
          </TouchableOpacity>
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonTextBold: {
    fontWeight: 'bold',
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

export default NewPasswordPage;
