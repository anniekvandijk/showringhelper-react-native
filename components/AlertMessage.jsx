import { Alert } from 'react-native';

function AlertMessage(header, content) {
  Alert.alert(
    header,
    content,
    [
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ],
    { cancelable: false },
  );
}

export default AlertMessage;
