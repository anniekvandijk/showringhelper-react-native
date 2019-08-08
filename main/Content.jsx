import React from 'react';
import { Content, Text } from 'native-base';
import { StyleSheet, ImageBackground } from 'react-native';

const style = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover'
  }
});

function AppContent() {
  return (
    <Content>
      {/* <ImageBackground source={require('./../images/background.jpg')} style={style.background}> */}
        <Text>Dit is de content enzo</Text>
      {/* </ImageBackground> */}
    </Content>
  );
}

export default AppContent;
