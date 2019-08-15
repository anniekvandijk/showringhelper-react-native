import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, View, Text } from 'react-native';
import Header from './Header';

function MoreContent({ navigation }) {
  const [t] = useTranslation();
  return (
    <>
      <Header title={t('header.title.more')} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>More Screen ...</Text>

      </View>
    </>
  );
}

export default MoreContent;

