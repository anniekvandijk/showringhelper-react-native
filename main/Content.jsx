import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Content, Text, Spinner } from 'native-base';
import { StyleSheet, ImageBackground } from 'react-native';
import ShowCard from '../components/ShowCard';
import NoShowCard from '../components/NoShowCard';

const style = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover'
  },
  content: {
    height: '100%'
  },
  spinnerText: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center'
  }
});

function AppContent({ shows }) {
  const [showList, setShowList] = useState(null);

  useEffect(() => {
    setShowList(shows);
  }, [shows]);


  if (!showList) {
    return (
      <>
        <Spinner color="#e65100" />
        <Text style={style.spinnerText}>Loading shows ... </Text>
      </>
    );
  }

  return (
    <ImageBackground source={require('./../images/background.jpg')} style={style.background}>
      <Content padder style={style.content}>
        {showList.length > 0
          ? showList.map(show => (
            <ShowCard
              key={show.name + show.date}
              show={show}
            />
          ))
          : <NoShowCard />
        }
      </Content>
    </ImageBackground>
  );
}

AppContent.propTypes = {
  shows: PropTypes.array
};

AppContent.defaultProps = {
  shows: null
};

export default AppContent;
