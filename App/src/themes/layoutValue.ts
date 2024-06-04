import {AppStyleSheet} from './responsive';

const layoutValue = (value: number) => {
  return AppStyleSheet.create({
    gap: {
      gap: value,
    },
    marginTop: {
      marginTop: value,
    },
    marginVertical: {
      marginVertical: value,
    },
  });
};

export default layoutValue;
