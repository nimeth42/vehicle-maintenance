import React from 'react';
import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const LandingPage = ()=> {
  const navigation = useNavigation(); // Get the navigation object

  const navigateToSignIn = () => {
    navigation.navigate('SignInPage'); // Navigate to the SignInPage
  };

  return (
    <ImageBackground source={require('../assets/assets/bg5.jpg')} style={styles.backgroundImage}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>DRIVE LANAKA</Text>
        <Text style={styles.titleSecond}>All in one vehicle partner</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToSignIn}>
        <Text style={styles.buttonText}>Let's Start</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40, // Add margin at the bottom for the button
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E3A715',
    margin: 5,
  },
  titleSecond: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#EEA818',
    padding: 10,
    borderRadius: 8,
    marginBottom: 50, // Adjusted margin for the button
    width: 300, // Adjust the width as needed
    alignSelf: 'center', // Center the button horizontally
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LandingPage;
