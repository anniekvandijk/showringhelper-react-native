import React from 'react';

const notificationContext = React.createContext({
  notifications: null
});

const useNotificationContext = () => {
  const { notifications } = React.useContext(notificationContext);
  return notifications;
};

export { notificationContext, useNotificationContext };
