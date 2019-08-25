import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Spinner, Content, Text, Card, CheckBox, CardItem, Button,
  Left, Right, Body
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
  },
  checkbox: {
    marginRight: 40
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

  function resetFilter() {
    setShowFilter([]);
    AsyncStorage.setItem('showFilter', JSON.stringify([]));
  }

  function handleChange(id, isChecked) {
    let filter;
    if (isChecked) {
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
            <Right>
              <Button
                  title="Reset"
                  onPress={() => resetFilter()}
                >
                <Text> Reset </Text>
              </Button>
            </Right>
          </CardItem>
          {showList && showList.map(show => (
            <CardItem bordered key={show.id}>
              <CheckBox style={style.checkbox}
                checked={isFiltered(show.id)}
                onPress={() => handleChange(show.id, !isFiltered(show.id))}
              />
              <Body>
                <Text>{show.name}</Text>
              </Body>
            </CardItem>
          ))}
        </Card>
      </Content>
    </>
  );
}

export default FilterContent;
