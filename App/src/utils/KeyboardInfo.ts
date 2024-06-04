import {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';

const HandelKeyboard = () => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [heightKB, setHeightKB] = useState(0);

  useEffect(() => {
    let showSubscription;
    let hideSubscription;
    if (Platform.OS === 'android') {
      showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setShowKeyboard(true);
      });
      hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setShowKeyboard(false);
      });
    } else {
      showSubscription = Keyboard.addListener('keyboardWillShow', e => {
        setShowKeyboard(true);
        setHeightKB(e.endCoordinates.height);
      });
      hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
        setShowKeyboard(false);
        setHeightKB(0);
      });
    }

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return {showKeyboard, heightKB};
};

export default HandelKeyboard;
