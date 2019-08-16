import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Content, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { useShowContext } from '../context/showContext';
import Header from './Header';

const style = StyleSheet.create({
  content: {
    height: '100%'
  }
});

function FilterContent({ navigation }) {
  const [t] = useTranslation();
  const shows = useShowContext();
  const [filter, setFilter] = useState([]);

  return (
    <>
      <Header title={t('header.title.filter')} />
      <Content padder style={style.content}>
        <Text>Filter Screen</Text>
        <Button
          title="Go to Filter... again"
          onPress={() => navigation.push('FilterContent')}
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('HomeContent')}
        />
        <Button
          title="Go back"
          onPress={() => navigation.goBack()}
        />
      </Content>
    </>
  );
}

export default FilterContent;

