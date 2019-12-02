import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';

const NotificationTokenContext = React.createContext([null, () => {}]);

const useNotificationTokenContext = () => {
  const [notificationToken, setNotificationToken] = React.useContext(NotificationTokenContext);
  return [notificationToken, setNotificationToken];
};

const NotificationTokenProvider = ({ children }) => {
  const [notificationToken, setNotificationToken] = React.useState(null);

  useEffect(() => {
    AsyncStorage
      .getItem('token')
      .then((result) => {
        setNotificationToken(result ? JSON.parse(result) : null);
      })
      .catch((error) => {
        throw new Error(`Error getting notifications: ${error}`);
      });
  }, []);

  useEffect(() => {
    if (notificationToken) {
      AsyncStorage.setItem('token', JSON.stringify(notificationToken));
    }
  }, [notificationToken]);

  return (
    <NotificationTokenContext.Provider value={[notificationToken, setNotificationToken]}>
      {children}
    </NotificationTokenContext.Provider>
  );
};

NotificationTokenProvider.propTypes = {
  children: PropTypes.object.isRequired
};

export { NotificationTokenProvider, useNotificationTokenContext };
