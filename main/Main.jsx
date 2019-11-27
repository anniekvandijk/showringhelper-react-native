import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { createAppContainer, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Button, Text, Icon, Footer, FooterTab } from 'native-base';
import { useShowContext } from '../context/showContext';
import { useShowFilterContext } from '../context/showFilterContext';
import { useNotificationContext } from '../context/NotificationContext';
import Header from './Header';
import RingContent from './RingContent';
import FilterContent from './FilterContent';
import NotificationContent from './NotificationContent';
import MoreContent from './MoreContent';
import PrivacyPolicyDetail from './PrivacyPolicyDetail';
import SettingsDetail from './SettingsDetail';
import RingNumberDetail from './RingNumberDetail';
import ShowDetail from './ShowDetail';

const style = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: 'transparent',
    color: '#D1D1D1'
  },
  buttonEnabled: {
    // default styling
  }
});

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
    },
    RingNumberDetail: {
      screen: RingNumberDetail,
      navigationOptions: ({ navigation }) => {
        const options = {
          header: <NavHeader title="header.title.ringNumberDetail" showBack navigation={navigation} />
        };
        return options;
      }
    },
    ShowDetail: {
      screen: ShowDetail,
      navigationOptions: ({ navigation }) => {
        const options = {
          header: <NavHeader title="header.title.showDetail" showBack navigation={navigation} />
        };
        return options;
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

const NotificationNavigator = createStackNavigator(
  {
    NotificationContent: {
      screen: NotificationContent,
      navigationOptions: {
        header: <NavHeader title="header.title.notifications" />
      }
    }
  },
  {
    initialRouteName: 'NotificationContent',
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

function navigate(navigation, screen, index) {
  if (Platform.OS === 'android') {
    navigation.dispatch(StackActions.popToTop());
  }
  navigation.navigate(screen);
}

function notificationsForExistingShows(shows, notifications) {
  if (notifications && notifications.length > 0 && shows) {
    const filteredNotifications = shows.filter(elem => notifications.find(({ showId }) => elem.id === showId));
    if (filteredNotifications && filteredNotifications.length > 0) {
      return true;
    }
    return false;
  }
  return false;
}

const Main = createBottomTabNavigator(
  {
    RingContent: { screen: RingNavigator },
    FilterContent: { screen: FilterNavigator },
    NotificationContent: { screen: NotificationNavigator },
    MoreContent: { screen: MoreNavigator }
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: ({ navigation }) => {
      const [t] = useTranslation();
      const [notifications] = useNotificationContext();
      const shows = useShowContext();
      const [showFilter] = useShowFilterContext();
      const filteredShows = shows && showFilter && shows.filter(el => showFilter.indexOf(el.id) !== -1);

      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              style={style.button}
              active={navigation.state.index === 0}
              onPress={() => navigate(navigation, 'RingContent', 0)}
            >
              <Icon name="home" />
              <Text>
                {t('header.title.rings')}
              </Text>
            </Button>
            <Button
              vertical
              disabled={shows && shows.length === 0}
              style={(shows && shows.length === 0) ? style.buttonDisabled : style.buttonEnabled}
              active={navigation.state.index === 1}
              onPress={() => navigate(navigation, 'FilterContent', 1)}
            >
              {filteredShows && filteredShows.length > 0
                ? <Icon style={{ color: '#2acd50' }} type="MaterialIcons" name="filter-list" />
                : <Icon type="MaterialIcons" name="filter-list" style={(shows && shows.length === 0) ? style.buttonDisabled : style.buttonEnabled} />
              }
              <Text
                style={(shows && shows.length === 0) ? style.buttonDisabled : style.buttonEnabled}
              >
                {t('header.title.filter')}
              </Text>
            </Button>
            <Button
              vertical
              disabled={shows && shows.length === 0}
              style={(shows && shows.length === 0) ? style.buttonDisabled : style.buttonEnabled}
              active={navigation.state.index === 2}
              onPress={() => navigate(navigation, 'NotificationContent', 2)}
            >
              {notificationsForExistingShows(shows, notifications)
                ? <Icon style={{ color: '#2acd50' }} type="MaterialIcons" name="notifications" />
                : <Icon type="MaterialIcons" name="notifications" style={(shows && shows.length === 0) ? style.buttonDisabled : style.buttonEnabled} />
              }
              <Text
                style={(shows && shows.length === 0) ? style.buttonDisabled : style.buttonEnabled}
              >
                {t('header.title.notifications')}
              </Text>
            </Button>
            <Button
              vertical
              style={style.button}
              active={navigation.state.index === 3}
              onPress={() => navigate(navigation, 'MoreContent', 3)}
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
