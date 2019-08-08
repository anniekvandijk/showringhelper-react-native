import React from 'react';
import { Content, Text } from 'native-base';
import { StyleSheet, ImageBackground } from 'react-native';

const style = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover'
  },
  content: {
    height: '100%'
  }
});

function AppContent() {
  return (
    <Content style={style.content}>
      <ImageBackground source={require('./../images/background.jpg')} style={style.background}>
        <Text>Dit is de content enzo jkjk </Text>
        <Text>Dit is de content enzo jkjk </Text>
      </ImageBackground>
    </Content>
  );
}

export default AppContent;
