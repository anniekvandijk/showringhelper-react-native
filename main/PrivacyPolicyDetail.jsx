import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Content, Button, Text, Card, CardItem, Left, Right, Body, H1 } from 'native-base';

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
