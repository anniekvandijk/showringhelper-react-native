import React from 'react';
import { createBottomTabNavigator,createStackNavigator,createAppContainer } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from 'native-base';
import ShowContent from './ShowContent';
import FilterContent from './FilterContent';
import MoreContent from './MoreContent';


const MainNavigator = createStackNavigator(
  {
    ShowContent: {
      screen: ShowContent,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'ShowContent',
    cardStyle: {
      backgroundColor: "transperent"
    }
  }
);


const Main = createBottomTabNavigator(
  {
    ShowContent: { screen: MainNavigator },
    FilterContent: { screen: FilterContent },
    MoreContent: { screen: MoreContent }
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: ({ navigation }) => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={navigation.state.index === 0}
              onPress={() => navigation.navigate('ShowContent')}
            >
              <Icon name="home" />
              <Text>Rings</Text>
            </Button>
            <Button
              vertical
              active={navigation.state.index === 1}
              onPress={() => navigation.navigate('FilterContent')}
            >
              <Icon type="MaterialIcons" name="filter-list" />
              <Text>Filter</Text>
            </Button>
            <Button
              vertical
              active={navigation.state.index === 2}
              onPress={() => navigation.navigate('MoreContent')}
            >
              <Icon type="MaterialIcons" name="more-horiz" />
              <Text>More</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

export default createAppContainer(Main);
