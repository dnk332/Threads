import {Alert, AlertButton} from 'react-native';

interface AlertOptions {
  title: string;
  message: string;
  buttons?: AlertButton[];
  cancelable?: boolean;
}

const showAlert = ({
  title,
  message,
  buttons = [{text: 'OK'}],
  cancelable = true,
}: AlertOptions): void => {
  Alert.alert(title, message, buttons, {cancelable});
};

export default showAlert;
