import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseUrl from '../baseUrl/baseUrl';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getEmailFromAsyncStorage();
  }, []);

  const getEmailFromAsyncStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const obscuredEmail = obscureEmail(storedEmail);
      setEmail(obscuredEmail);
    } catch (error) {
      console.error('Error retrieving email from AsyncStorage:', error);
    }
  };

  const obscureEmail = (email) => {
    const parts = email.split('@');
    if (parts.length === 2) {
      const username = parts[0];
      const domain = parts[1];
      const obscuredUsername = username.substring(0, 5) + '#######';
      return obscuredUsername + '@' + domain;
    }
    return email;
  };

  const handleVerifyOtp = async() => {
          navigation.navigate('NewPassword');

    // try {
    //   const storedPlateNo = await AsyncStorage.getItem('plateNo');
    //   const storedEmail = await AsyncStorage.getItem('email');

    //   console.log(storedPlateNo, storedEmail);

    //   const response = await axios.post(`${baseUrl}/api/v1/otp/otpCheck`, {
    //     email: storedEmail,
    //     plateNo: storedPlateNo,
    //     otpValue:otp
    //   });
      
    //   console.log('Response from backend:', response.data);
      
    //   // setModalMessage('OTP Sent Successfully');
    //   // setModalVisible(true);
    //   navigation.navigate('NewPassword');

    // } catch (error) {
    //   // console.error('Error sending OTP:', error);
    //   if (error.response) {
    //     setModalMessage(error.response.data.comment);
    //     setModalVisible(true);
    //   }
    // }
  };

  const handleSendOtp = async () => {
    try {
      const storedPlateNo = await AsyncStorage.getItem('plateNo');
      const storedEmail = await AsyncStorage.getItem('email');

      console.log(storedPlateNo, storedEmail);

      const response = await axios.post(`${baseUrl}/api/v1/otp/otpSend`, {
        email: storedEmail,
        plateNo: storedPlateNo,
        otpValue:otp
      });
      
      console.log('Response from backend:', response.data);
      
      setModalMessage('Correct OTP');
      setModalVisible(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      if (error.response) {
        setModalMessage(error.response.data.comment);
        setModalVisible(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Enter OTP</Text>
      </View>
      <Text style={styles.emailText}>Logged in as {email}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setOtp(text)}
        value={otp}
        placeholder="Enter OTP"
        keyboardType="numeric"
        secureTextEntry={true}
        placeholderTextColor="black"
      />
      <TouchableOpacity style={styles.buttonOtp} onPress={handleSendOtp}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
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
            <Text style={[styles.modalText, { color: 'red' }]}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.customButton}>
              <Text style={styles.buttonText}>Close</Text>
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
    backgroundColor: 'black',
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
    fontSize: 18,
    color: 'white',
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
    color: 'black',
  },
  button: {
    backgroundColor: '#FFA500',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonOtp: {
    backgroundColor: '#FFA500',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: 120,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    
  },
  customButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:150,
  },
});

export default OtpPage;
