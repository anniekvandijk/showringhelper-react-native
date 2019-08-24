import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {
  Button, Text, Icon, Footer, FooterTab, Badge, View
} from 'native-base';
import { useShowContext } from '../context/showContext';
import { useShowFilterContext } from '../context/showFilterContext';
import Header from './Header';
import RingContent from './RingContent';
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

const RingNavigator = createStackNavigator(
  {
    RingContent: {
      screen: RingContent,
      navigationOptions: {
        header: <NavHeader title="header.title.rings" />
      }
    }
  },
  {
    initialRouteName: 'RingContent',
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
    RingContent: { screen: RingNavigator },
    FilterContent: { screen: FilterNavigator },
    MoreContent: { screen: MoreNavigator }
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: ({ navigation }) => {
      const [t] = useTranslation();
      const shows = useShowContext();
      const [showFilter] = useShowFilterContext();
      const filteredShows = shows && shows.filter(el => showFilter.indexOf(el.id) !== -1);
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={navigation.state.index === 0}
              onPress={() => navigation.navigate('RingContent')}
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
              {filteredShows && filteredShows.length > 0
                ? <Icon style={{ color: 'green' }} type="MaterialIcons" name="filter-list" />
                : <Icon type="MaterialIcons" name="filter-list" />
              }
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
