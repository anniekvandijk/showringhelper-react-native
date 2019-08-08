import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Container, StyleProvider } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import AppHeader from './main/Header';
import AppContent from './main/Content';
import FirebaseShowsListner from './firebase/firebaseShowsListner';

function App() {
  const [isReady, setIsReady] = useState(false);
  const shows = FirebaseShowsListner();

  async function loadFonts() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    });
  }

  function handleLoadingError(error) {
    console.warn(error);
  }

  function handleFinishLoading() {
    setIsReady(true);
  }

  if (!isReady) {
    return <AppLoading
      startAsync={loadFonts}
      onError={handleLoadingError}
      onFinish={handleFinishLoading}
    />
  }

  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <AppHeader />
        <AppContent shows={shows} />
      </Container>
    </StyleProvider>
  );
}

export default App;
