import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
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
  const [showList, setShowList] = useState([]);

  useEffect(() => {
    setShowList(shows);
  }, [shows]);

  return (
    <ImageBackground source={require('./../images/background.jpg')} style={style.background}>
      <Content padder style={style.content}>
        {showList.length > 0
          ? showList.map(show => (
            <Text key={show.name + show.location}>{show.location}</Text>
          ))
          : <Text>No Shows</Text>
        }
      </Content>
    </ImageBackground>
  );
}

AppContent.propTypes = {
  shows: PropTypes.array
};

AppContent.defaultProps = {
  shows: []
};

export default AppContent;
