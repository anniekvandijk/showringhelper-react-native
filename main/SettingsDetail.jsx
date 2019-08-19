import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
  Content, Text, Card, CardItem, Body
} from 'native-base';

const style = StyleSheet.create({
  content: {
    height: '100%'
  }
});

function SettingsDetail() {
  const [t] = useTranslation();
  return (
    <>
      <Content padder style={style.content}>
        <Card>
          <CardItem bordered>
            <Body>
              <Text>Save User preferences</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </>
  );
}

export default SettingsDetail;
