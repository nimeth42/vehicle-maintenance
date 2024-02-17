import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import PieChartPage from './screens/PieChartPage';
import LandingPage from './screens/LandingPage';
import OtpPage from './screens/OtpPage';
import SignInPage from './screens/SignInPage';
import SignUpPage from './screens/SignUpPage';
import ProfilePage from './screens/ProfilePage';
import AddExpensesPage from './screens/AddExpensesPage';
import AddMaintainceDetails from './screens/AddMaintainceDtails';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  

  return (
    <View style={styles.container}>
     
      {/* <Text>Hello</Text> */}
      {/* <LandingPage/> */}
      {/* <SignInPage/> */}
      {/* <SignUpPage/> */}
      {/* <OtpPage></OtpPage> */}
      {/* <ProfilePage/> */}
      {/* <PieChartPage/> */}
      {/* <AddExpensesPage/>  */}
      <AddMaintainceDetails/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  
});

export default App;
