import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigations from './navigations/AppNavagations';

const App = () => {
  const Stack = createStackNavigator();

  return (
   
    <>
      { <AppNavigations/> }
   </>    
  );
};

export default App;
