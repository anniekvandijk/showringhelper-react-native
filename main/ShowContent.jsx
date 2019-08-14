import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Content, Text, Spinner, Header, Left, Body, Title, Button, Icon, Tab, Tabs, TabHeading } from 'native-base';
import { StyleSheet, StatusBar } from 'react-native';
import { useShowContext } from '../context/showContext';
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

function ShowContent() {
  const [t] = useTranslation();
  const shows = useShowContext();
  const [showList, setShowList] = useState(null);

  useEffect(() => {
    setShowList(shows);
  }, [shows]);


  if (!showList) {
    return (
      <>
        <Spinner />
        <Text style={style.spinnerText}>
          {t('spinner')}
        </Text>
      </>
    );
  }

  return (
    <>
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
    </>
  );
}

export default ShowContent;
