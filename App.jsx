import React, { useState } from 'react';
import './i18n';
import { AppLoading } from 'expo';
import { Container, StyleProvider } from 'native-base';
import { ImageBackground, StyleSheet, Platform, Text } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import Main from './main/Main';
import FirebaseShowsListner from './firebase/firebaseShowsListner';
import { showContext } from './context/showContext';
import { ShowFilterProvider } from './context/showFilterContext';


const style = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flex: 1
  }
});

function App() {
  const [isReady, setIsReady] = useState(false);
  const shows = FirebaseShowsListner();

  // OnePlus & Oppo fix
  // https://github.com/facebook/react-native/issues/15114
  if (Platform.OS === 'android') {
    const oldRender = Text.render;
    Text.render = function (...args) {
      const origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{fontFamily: 'Roboto'}, origin.props.style]
      });
    };
  }

  async function loadRoboto() {
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
        startAsync={loadRoboto}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }

  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <showContext.Provider value={{ shows }}>
          <ShowFilterProvider>
            <ImageBackground source={require('./images/background.jpg')} style={style.background}>
              <Main />
            </ImageBackground>
          </ShowFilterProvider>
        </showContext.Provider>
      </Container>
    </StyleProvider>
  );
}

export default App;
