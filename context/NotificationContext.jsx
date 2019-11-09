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

  useEffect(() => {
    if (notificationToken) {
      getNotifications(notificationToken)
        .then((result) => {
          console.log(result);
          if (result) {
            setNotifications(result);
            console.log(result);
          }
        })
        .catch((error) => { console.log(error); });
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
