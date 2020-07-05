import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';

import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black, useFonts } from '@expo-google-fonts/roboto';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black
  });

  if (!fontsLoaded) {
    return <AppLoading/>
  }

  return (
    <>
    <StatusBar barStyle='default' backgroundColor="transparent" translucent />
    <Routes />
    </>
  );
}

