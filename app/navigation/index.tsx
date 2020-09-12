import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import {AuthContext} from "../stores/AuthContextProvider";
import AgendaScreen from "../screens/AgendaScreen";
import AddConsultationScreen from "../screens/AddConsultationScreen";
import useAuthFlashMessages from "../hooks/useAuthFlashMessages";
import useAgendaFlashMessages from "../hooks/useAgendaFlashMessages";


export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
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

  useAuthFlashMessages();
  useAgendaFlashMessages();

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
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
          </>
      }
    </Stack.Navigator>
  );
}
