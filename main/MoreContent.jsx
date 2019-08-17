import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  Content, Icon, Button, Text, Card, CardItem, Left, Right
} from 'native-base';

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
            <Left>
              <Text>{t('pages.moreContent.privacyPolicyText')}</Text>
            </Left>
            <Right>
              <Button
                title="Go to Privicy policy"
                onPress={() => navigation.navigate('PrivacyPolicyDetail')}
              >
                <Icon name="arrow-forward" />
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </>
  );
}

MoreContent.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default MoreContent;
