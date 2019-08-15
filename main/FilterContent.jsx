import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, View, Text } from 'react-native';
import Header from './Header';

function FilterContent({ navigation }) {
  const [t] = useTranslation();
  return (
    <>
      <Header title={t('header.title.filter')} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
      </View>
    </>
  );
}

export default FilterContent;

