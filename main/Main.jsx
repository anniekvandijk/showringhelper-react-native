import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {
  Button, Text, Icon, Footer, FooterTab, Badge, View
} from 'native-base';
import { useShowFilterContext } from '../context/showFilterContext';
import Header from './Header';
import ShowContent from './ShowContent';
import FilterContent from './FilterContent';
import MoreContent from './MoreContent';
import PrivacyPolicyDetail from './PrivacyPolicyDetail';
import SettingsDetail from './SettingsDetail';

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
      navigationOptions: {
        header: <NavHeader title="header.title.rings" />
      }
    }
  },
  {
    initialRouteName: 'ShowContent',
    transparentCard: true,
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'transparent'
      }
    })
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
    transparentCard: true,
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'transparent'
      }
    })
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
    },
    SettingsDetail: {
      screen: SettingsDetail,
      navigationOptions: ({ navigation }) => {
        const options = {
          header: <NavHeader title="header.title.settings" showBack navigation={navigation} />
        };
        return options;
      }
    }
  },
  {
    initialRouteName: 'MoreContent',
    transparentCard: true,
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'transparent'
      }
    })
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
      const [showFilter] = useShowFilterContext();
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

NavHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  showBack: PropTypes.bool
};

NavHeader.defaultProps = {
  showBack: false
};

export default createAppContainer(Main);
