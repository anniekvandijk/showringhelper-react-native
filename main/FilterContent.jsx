import React from 'react';
import { Button, View, Text } from 'react-native';


function FilterContent({ props }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => props.navigation.push('FilterContent')}
      />
      <Button
        title="Go to Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <Button
        title="Go back"
        onPress={() => props.navigation.goBack()}
      />
    </View>
  );
}

export default FilterContent;

