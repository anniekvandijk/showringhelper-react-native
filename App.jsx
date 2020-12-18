import { hijackEffects } from 'stop-runaway-react-effects';
import {
  SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN, SENTRY_DSN, ENV
} from '@env';
import * as Sentry from 'sentry-expo';
import React, { useState } from 'react';
import './i18n';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';
import { Container, StyleProvider } from 'native-base';
import { ImageBackground, StyleSheet, Platform, Text } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import Main from './main/Main';
import FirebaseShowsListner from './firebase/firebaseShowsListner';
import FirebaseRingNumbersListner from './firebase/firebaseRingNumbersListner';
import { showContext } from './context/showContext';
import { ringNumbersContext } from './context/ringNumbersContext';
import { ShowFilterProvider } from './context/showFilterContext';
import { NotificationProvider } from './context/NotificationContext';
import { NotificationTokenProvider } from './context/NotificationTokenContext';
import { FavoritesProvider } from './context/favoritesContext';
import GlobalErrorBoundary from './utilities/GlobalErrorBoundary';

const style = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flex: 1
  }
});

if (ENV !== 'production') {
  hijackEffects();
}

function App() {
  const [isReady, setIsReady] = useState(false);
  const shows = FirebaseShowsListner();
  const ringNumbers = FirebaseRingNumbersListner();

  // Sentry logging
  Sentry.init({
    organization: SENTRY_ORG,
    project: SENTRY_PROJECT,
    authToken: SENTRY_AUTH_TOKEN,
    dsn: SENTRY_DSN,
    enableNative: false,
    enableInExpoDevelopment: false,
    debug: true
  });

  // OnePlus & Oppo fix https://github.com/facebook/react-native/issues/15114
  if (Platform.OS === 'android') {
    const oldRender = Text.render;
    Text.render = function (...args) {
      const origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{fontFamily: 'Roboto'}, origin.props.style]
      });
    };
  }

  // Create Android Channel
  if (Platform.OS === 'android') {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
      })
    });
    Notifications.setNotificationChannelAsync('showringhelper', {
      name: 'Showringhelper',
      sound: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrate: [0, 250, 250, 250]
    });
  }

  async function loadRoboto() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    });
  }

  function handleLoadingError(error) {
    throw new Error(`Loading error: ${error}`);
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
          <ringNumbersContext.Provider value={{ ringNumbers }}>
            <NotificationTokenProvider>
              <NotificationProvider>
                <ShowFilterProvider>
                  <FavoritesProvider>
                    <ImageBackground source={require('./images/background.jpg')} style={style.background}>
                      <GlobalErrorBoundary>
                        <Main />
                      </GlobalErrorBoundary>
                    </ImageBackground>
                  </FavoritesProvider>
                </ShowFilterProvider>
              </NotificationProvider>
            </NotificationTokenProvider>
          </ringNumbersContext.Provider>
        </showContext.Provider>
      </Container>
    </StyleProvider>
  );
}

export default App;
