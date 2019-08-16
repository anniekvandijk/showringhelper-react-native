import React from 'react';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator, createStackNavigator,createAppContainer } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from 'native-base';
import Header from './Header';
import ShowContent from './ShowContent';
import FilterContent from './FilterContent';
import MoreContent from './MoreContent';
import PrivacyPolicyDetail from './PrivacyPolicyDetail';

function NavHeader({ navigation, title, showBack }) {
  const [t] = useTranslation();
  return (
    <Header
      title={t(title)}
      showBack={showBack}
      navigation={navigation}
    />
  );
}

const ShowNavigator = createStackNavigator(
  {
    ShowContent: {
      screen: ShowContent,
      navigationOptions: ({ navigation }) => {
        const options = {
          header: <NavHeader title="header.title.rings" navigation={navigation} />
        };
        return options;
      }
    }
  },
  {
    initialRouteName: 'ShowContent',
    cardStyle: {
      //backgroundColor: 'transperent'
    }
  }
);

const FilterNavigator = createStackNavigator(
  {
    FilterContent: {
      screen: FilterContent,
      navigationOptions: {
        header: <NavHeader title="header.title.filter" />
      }

    }
  },
  { 
    initialRouteName: 'FilterContent',
    cardStyle: {
      //backgroundColor: 'transperent'
    }
  }
);

const MoreNavigator = createStackNavigator(
  {
    MoreContent: {
      screen: MoreContent,
      navigationOptions: {
        header: <NavHeader title="header.title.more" />
      }
    },
    PrivacyPolicyDetail: {
      screen: PrivacyPolicyDetail,
      navigationOptions: ({ navigation }) => {
        const options = {
          header: <NavHeader title="header.title.privacyPolicy" showBack navigation={navigation} />
        };
        return options;
      }
    }
  },
  {
    initialRouteName: 'MoreContent',
    cardStyle: {
      //backgroundColor: 'transperent'
    }
  }
);


const Main = createBottomTabNavigator(
  {
    ShowContent: { screen: ShowNavigator },
    FilterContent: { screen: FilterNavigator },
    MoreContent: { screen: MoreNavigator }
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: ({ navigation }) => {
      const [t] = useTranslation();
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={navigation.state.index === 0}
              onPress={() => navigation.navigate('ShowContent')}
            >
              <Icon name="home" />
              <Text>
                {t('header.title.rings')}
              </Text>
            </Button>
            <Button
              vertical
              active={navigation.state.index === 1}
              onPress={() => navigation.navigate('FilterContent')}
            >
              <Icon type="MaterialIcons" name="filter-list" />
              <Text>
                {t('header.title.filter')}
              </Text>
            </Button>
            <Button
              vertical
              active={navigation.state.index === 2}
              onPress={() => navigation.navigate('MoreContent')}
            >
              <Icon type="MaterialIcons" name="more-horiz" />
              <Text>
                {t('header.title.more')}
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

export default createAppContainer(Main);
