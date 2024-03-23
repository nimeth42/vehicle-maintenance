import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PieChartPage from './screens/PieChartPage';
import LandingPage from './screens/LandingPage';
import OtpPage from './screens/OtpPage';
import SignInPage from './screens/SignInPage';
import SignUpPage from './screens/SignUpPage';
import ProfilePage from './screens/ProfilePage';
import AddExpensesPage from './screens/AddExpensesPage';
import AddMaintainceDetails from './screens/AddMaintainceDtails';
import AppNavigations from './navigations/AppNavagations';
import GarageUser from './screens/GarageUser';
import { View } from 'react-native';
import BottomNavigatorPage from './navigations/BotomNavigatonPage';
import HomePage from './screens/HomePage';
import NewPasswordPage from './screens/NewPasswordPage';
import ViewMaintainceDetails from './screens/ViewMaintaince';
import ViewNotification from './screens/ViewNotification';
import ViewScanner from './screens/ViewScanner';
import ChangeProfile from './screens/ChangeProfile';
//import ViewMaintainceDetails from './screens/ViewMaintainceDetails';
import GrageUserRegister from './screens/GrageUserRegiter';
import GrageUserLogin from './screens/GrageUserLogin';
const App = () => {
  const Stack = createStackNavigator();

  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="LandingPage" component={LandingPage} />
    //     <Stack.Screen name="PieChartPage" component={PieChartPage} />
    //     <Stack.Screen name="OtpPage" component={OtpPage} />
    //     <Stack.Screen name="SignInPage" component={SignInPage} />
    //     <Stack.Screen name="SignUpPage" component={SignUpPage} />
    //     <Stack.Screen name="ProfilePage" component={ProfilePage} />
    //     <Stack.Screen name="AddExpensesPage" component={AddExpensesPage} />
    //     <Stack.Screen name="AddMaintainceDetails" component={AddMaintainceDetails} />
    //     <Stack.Screen name="ViewNotification"> component={ViewNotification} />
    //    <Stack.Screen name="ViewScanner"> component={ViewScanner} />

    //   </Stack.Navigator>
    // </NavigationContainer>
    <>
    
      { <AppNavigations/> }
      {/* <ChangeProfile/> */}

    {/* <GrageUserRegister/> */}
    {/* <NavigationContainer>

        <GrageUserLogin/>
      </NavigationContainer> */}

      {/* <GarageUser/> */}
       {/* <AddMaintainceDetails/> */}
       {/* <PieChartPage/>  */}
      {/* <ProfilePage/> */}
      {/* <AddExpensesPage/> */}
      {/* <BottomNavigatorPage/> */}
      {/* <ViewMaintainceDetails/> */}
      {/* <Image source={photo1} style={styles.photo} />
        <Image source={photo2} style={styles.photo} /> */}
      {/* <HomePage/> */}
      {/* <NewPasswordPage/> */}

        {/* <SignInPage/> */}
        {/* <AddMaintainceDetails/> */}
        {/* <SignInPage/> */}
        
        {/* <ViewScanner/> */}
        
   </>    
  );
};

export default App;
