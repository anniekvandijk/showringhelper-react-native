import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  Content, Icon, Button, Text, Card, CardItem, Left, Right, Body
} from 'native-base';

const style = StyleSheet.create({
  content: {
    height: '100%'
  },
  image: {
    alignSelf: 'stretch',
    resizeMode: 'contain',
    height: 125,
    width: null,
    flex: 1
  }
});

function MoreContent({ navigation }) {
  const [t] = useTranslation();
  return (
    <>
      <Content padder style={style.content}>
        <Card>
          <CardItem cardBody>
            <Image style={style.image} source={require('../images/logo.png')} />
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>Showring helper {t('pages.moreContent.versionText')} 0.19.0 ©Animundo 2019</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Left>
              <Text>{t('pages.moreContent.settingsText')}</Text>
            </Left>
            <Right>
              <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('SettingsDetail')}
              >
                <Icon name="arrow-forward" />
              </Button>
            </Right>
          </CardItem>
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
