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

function PrivacyPolicyDetail() {
  const [t] = useTranslation();
  return (
    <>
      <Content padder style={style.content}>
        <Card>
          <CardItem bordered>
            <Body>
              <Text>{t('pages.privacyPolicyDetail.privacyPolicyText')}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </>
  );
}

export default PrivacyPolicyDetail;
