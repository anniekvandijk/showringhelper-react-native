import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Spinner, ListItem, Content, Button, Text, Card, CheckBox, CardItem, Left, Body, Right, Icon
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useShowContext } from '../context/showContext';
import { useShowFilterContext } from '../context/showFilterContext';

const style = StyleSheet.create({
  content: {
    height: '100%'
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
    if (bool) {
      setShowFilter([...showFilter, id]);
    } else {
      setShowFilter(showFilter.filter(x => x !== id));
    }
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
                <CheckBox
                  checked={isFiltered(show.id)}
                  onPress={() => handleChange(show.id, !isFiltered(show.id))}
                />
              </Left>
              <Body>
                <Text>{show.name}</Text>
              </Body>
            </CardItem>
          )
        )}
        </Card>
      </Content>
    </>
  );
}

export default FilterContent;
