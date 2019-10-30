import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = React.createContext([[], () => {}]);

const useNotificationContext = () => {
  const [notifications, setNotifications] = React.useContext(NotificationContext);
  return [notifications, setNotifications];
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = React.useState(null);

  useEffect(() => {
    console.log('load notifications');
  }, []);

  useEffect(() => {
    console.log('save notifications');
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
