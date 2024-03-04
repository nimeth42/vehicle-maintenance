import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PieChartPage from '../screens/PieChartPage';
import LandingPage from '../screens/LandingPage';
import OtpPage from '../screens/OtpPage';
import SignInPage from '../screens/SignInPage';
import SignUpPage from '../screens/SignUpPage';
import ProfilePage from '../screens/ProfilePage';
import AddExpensesPage from '../screens/AddExpensesPage';
import AddMaintainceDetails from '../screens/AddMaintainceDtails';
import HomePage from '../screens/HomePage';
import NewPasswordPage from '../screens/NewPasswordPage';
import GarageUser from '../screens/GarageUser';
import ViewMaintainceDetails from '../screens/ViewMaintaince';

const AppNavigations = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="PieChartPage" component={PieChartPage} />
        <Stack.Screen name="OtpPage" component={OtpPage} />
        <Stack.Screen name="SignInPage" component={SignInPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="AddExpensesPage" component={AddExpensesPage} />
        <Stack.Screen name="AddMaintainceDetails" component={AddMaintainceDetails} />
        <Stack.Screen name= "HomePage" component={HomePage}/>
        <Stack.Screen name="NewPassword" component={NewPasswordPage} />
        <Stack.Screen name="GrageUser" component={GarageUser} />
        <Stack.Screen name="ViewMaintainceDetails" component={ViewMaintainceDetails} />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigations;
