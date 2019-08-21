import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Spinner, Content, Text, Card, CheckBox, CardItem,
  Left, Right
} from 'native-base';
import { StyleSheet, AsyncStorage } from 'react-native';
import { useShowContext } from '../context/showContext';
import { useShowFilterContext } from '../context/showFilterContext';

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

function FilterContent() {
  const [t] = useTranslation();
  const shows = useShowContext();
  const [showFilter, setShowFilter] = useShowFilterContext();
  const [showList, setShowList] = useState(null);

  useEffect(() => {
    setShowList(shows);
  }, [shows]);

  function isFiltered(id) {
    if (showFilter.indexOf(id) > -1) {
      return true;
    }
    return false;
  }

  function handleChange(id, bool) {
    let filter;
    if (bool) {
      filter = [...showFilter, id];
    } else {
      filter = showFilter.filter(x => x !== id);
    }
    setShowFilter(filter);
    AsyncStorage.setItem('showFilter', JSON.stringify(filter));
  }

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
        <Card>
          <CardItem bordered>
            <Left>
              <Text>{t('pages.filterContent.text')}</Text>
            </Left>
          </CardItem>
          {showList && showList.map(show => (
            <CardItem bordered key={show.id}>
              <Left>
                <Text>{show.name}</Text>
              </Left>
              <Right>
                <CheckBox
                  checked={isFiltered(show.id)}
                  onPress={() => handleChange(show.id, !isFiltered(show.id))}
                />
              </Right>
            </CardItem>
          ))}
        </Card>
      </Content>
    </>
  );
}

export default FilterContent;
