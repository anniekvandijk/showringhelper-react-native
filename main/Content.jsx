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

function AppContent({ shows }) {
  return (
    <ImageBackground source={require('./../images/background.jpg')} style={style.background}>
      <Content padder style={style.content}>
        if (shows)
        {
          shows.map(show => (
            <Text>{show.name}</Text>
          ))
        }
      </Content>
    </ImageBackground>
  );
}

export default AppContent;
