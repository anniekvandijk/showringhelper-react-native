import React from 'react';
import { createBottomTabNavigator,createStackNavigator,createAppContainer } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from 'native-base';
import ShowContent from './ShowContent';
import FilterContent from './FilterContent';

const MainNavigator = createStackNavigator(
  {
    ShowContent: {
      screen: ShowContent,
      navigationOptions: {
        header: null
      }
    },
    Create: {
      screen: ShowContent,
      navigationOptions: {
        title: "Generate Case",
      }
    }
  },
  {
    initialRouteName: 'ShowContent'
  }
);


const Main = createBottomTabNavigator(
  {
    ShowContent: { screen: MainNavigator },
    FilterContent: { screen: FilterContent }
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: (props) => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              //active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate('ShowContent')}>
              <Icon name="bowtie" />
              <Text>Rings</Text>
            </Button>
            <Button
              vertical
              //active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate('FilterContent')}>
              <Icon name="briefcase" />
              <Text>Filter</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

export default createAppContainer(Main);
