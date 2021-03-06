import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNotificationTokenContext } from './NotificationTokenContext';
import { getNotifications } from '../firebase/firebaseCalls';

const NotificationContext = React.createContext([[], () => {}]);

const useNotificationContext = () => {
  const [notifications, setNotifications] = React.useContext(NotificationContext);
  return [notifications, setNotifications];
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = React.useState([]);
  const [notificationToken] = useNotificationTokenContext();

  async function Get() {
    getNotifications(notificationToken)
      .then((result) => {
        if (result) {
          setNotifications(result);
        }
      })
      .catch((error) => { 
        throw new Error(`Firebase error: Error in notificationsprovider: ${error}`);
      });
  }

  useEffect(() => {
    if (notificationToken) {
      Get();
    }
  }, [notificationToken]);

  return (
    <NotificationContext.Provider value={[notifications, setNotifications]}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.object.isRequired
};

export { NotificationProvider, useNotificationContext };
