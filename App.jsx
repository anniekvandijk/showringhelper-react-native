import React, { useState } from 'react';
import './i18n';
import { AppLoading } from 'expo';
import { Container, StyleProvider } from 'native-base';
import { ImageBackground, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import Header from './main/Header';
import ShowContent from './main/ShowContent';
import Main from './main/Main';
import FirebaseShowsListner from './firebase/firebaseShowsListner';
import { showContext } from './context/showContext';

const style = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
    //resizeMode: 'cover'
  }
});

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
    return (
      <AppLoading
        startAsync={loadFonts}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }

  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <showContext.Provider value={{ shows }}>
          <ImageBackground source={require('./images/background.jpg')} style={style.background}>
            <Main />
          </ImageBackground>
        </showContext.Provider>
      </Container>
    </StyleProvider>
  );
}

export default App;
