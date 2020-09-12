import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import {AuthContext, IAuthContext} from "../stores/AuthContextProvider";
import AgendaScreen from "../screens/AgendaScreen";
import AddConsultationScreen from "../screens/AddConsultationScreen";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator/>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const context = React.useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {
        context?.state?.isSignout ?
          <>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
          </> :
          <>
            <Stack.Screen name="Agenda" component={AgendaScreen}/>
            <Stack.Screen name="AddConsultation" component={AddConsultationScreen}/>
            <Stack.Screen name="Root" component={BottomTabNavigator}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
          </>
      }
    </Stack.Navigator>
  );
}
