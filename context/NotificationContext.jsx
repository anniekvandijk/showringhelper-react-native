import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getNotifications, postNotification } from '../firebase/firebaseCalls';

const NotificationContext = React.createContext([[], () => {}]);

const useNotificationContext = () => {
  const [notifications, setNotifications] = React.useContext(NotificationContext);
  return [notifications, setNotifications];
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = React.useState([]);

  useEffect(() => {
    console.log('load notifications');
    let not = getNotifications();
    if (not) {
      setNotifications(not);
    }
  }, []);

  useEffect(() => {
    console.log('save notifications');
    notifications.map((notification) => {
      console.log(notification);
      //postNotification(notification);
    });
  }, [notifications]);

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
