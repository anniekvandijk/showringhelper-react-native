import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Content, Icon, Button, Text, Card, CardItem, Left, Right, Body, H1 } from 'native-base';

const style = StyleSheet.create({
  content: {
    height: '100%'
  }
});

function MoreContent({ navigation }) {
  const [t] = useTranslation();
  return (
    <>
      <Content padder style={style.content}>
        <Card>
          <CardItem bordered>
            <Button
              iconRight
              full
              transparent
              title="Go to Privicy policy"
              onPress={() => navigation.navigate('PrivacyPolicyDetail')}            
            >
              <Text>{t('pages.moreContent.privacyPolicyText')}</Text>
              <Icon name="arrow-forward" />
            </Button>
          </CardItem>
        </Card>
      </Content>
    </>
  );
}

export default MoreContent;

