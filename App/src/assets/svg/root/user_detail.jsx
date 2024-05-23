import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import colors from '@themes/color';

const SvgComponent = ({size = 24, color = colors.white}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <Path
      d="M8.46647 26.4103H23.4972C24.9332 26.4103 25.9244 24.9722 25.4134 23.6302C24.2021 20.4495 21.1523 18.3474 17.7487 18.3474H14.1657C10.7482 18.3474 7.70253 20.5034 6.56673 23.7266C6.10499 25.0369 7.07717 26.4103 8.46647 26.4103Z"
      fill={color}
    />
    <Path
      d="M16.0465 13.7292C18.2942 13.7292 20.1162 11.9071 20.1162 9.65952C20.1162 7.4119 18.2942 5.58984 16.0465 5.58984C13.7989 5.58984 11.9769 7.4119 11.9769 9.65952C11.9769 11.9071 13.7989 13.7292 16.0465 13.7292Z"
      fill={color}
    />
    <Path
      d="M8.46647 26.4103H23.4972C24.9332 26.4103 25.9244 24.9722 25.4134 23.6302C24.2021 20.4495 21.1523 18.3474 17.7487 18.3474H14.1657C10.7482 18.3474 7.70253 20.5034 6.56673 23.7266C6.10499 25.0369 7.07717 26.4103 8.46647 26.4103Z"
      stroke={color}
      strokeWidth={2}
    />
    <Path
      d="M16.0465 13.7292C18.2942 13.7292 20.1162 11.9071 20.1162 9.65952C20.1162 7.4119 18.2942 5.58984 16.0465 5.58984C13.7989 5.58984 11.9769 7.4119 11.9769 9.65952C11.9769 11.9071 13.7989 13.7292 16.0465 13.7292Z"
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
