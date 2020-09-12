import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AuthContextProvider from "./stores/AuthContextProvider";
import AgendaContextProvider from "./stores/AgendaContextProvider";
import useCustomFonts from "./hooks/useCustomFonts";
import StyledFlashMessage from "./components/StyledFlashMessage";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useCustomFonts();

  console.ignoredYellowBox = ["Can't perform:"];

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContextProvider>
          <AgendaContextProvider>
            <>
              <Navigation colorScheme={colorScheme}/>
              <StatusBar/>
              <StyledFlashMessage />
            </>
          </AgendaContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    );
  }
}
