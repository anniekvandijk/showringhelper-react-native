import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Content, Text, Spinner } from 'native-base';
import { StyleSheet } from 'react-native';
import { useShowContext } from '../context/showContext';
import { useShowFilterContext } from '../context/showFilterContext';

import ShowCard from '../components/ShowCard';
import NoShowCard from '../components/NoShowCard';

const style = StyleSheet.create({
  content: {
    height: '100%'
  },
  spinnerText: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center'
  }
});

function RingContent() {
  const [t] = useTranslation();
  const shows = useShowContext();
  const [showFilter] = useShowFilterContext();
  const [showList, setShowList] = useState(null);

  useEffect(() => {
    const filteredShows = shows && shows.filter(el => showFilter.indexOf(el.id) !== -1);
    if (filteredShows && filteredShows.length > 0) {
      setShowList(filteredShows);
    } else {
      setShowList(shows);
    }
  }, [shows, showFilter]);


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

export default RingContent;
