import {AppStyleSheet} from './responsive';

const layoutValue = (value: number) => {
  return AppStyleSheet.create({
    gap: {
      gap: value,
    },
  });
};

export default layoutValue;
