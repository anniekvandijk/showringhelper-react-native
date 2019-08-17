import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Content, Button, Text, Card, CardItem, Left, Right, Icon
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useShowContext } from '../context/showContext';

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
      <Content padder style={style.content}>
        <Card>
          <CardItem bordered>
            <Left>
              <Text>Filter comming</Text>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </>
  );
}

export default FilterContent;
