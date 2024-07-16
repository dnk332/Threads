import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import {colors} from '@themes/color';

const SvgComponent = ({size = 25, color = colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.5 9C16.3284 9 17 8.32843 17 7.5C17 6.67157 16.3284 6 15.5 6C14.6716 6 14 6.67157 14 7.5C14 8.32843 14.6716 9 15.5 9Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 5.55C3 4.14168 4.14168 3 5.55 3H17.45C18.8584 3 20 4.14168 20 5.55V17.45C20 18.8584 18.8584 20 17.45 20H5.55C4.14168 20 3 18.8584 3 17.45V5.55ZM5.55 4.7H17.45C17.9195 4.7 18.3 5.08055 18.3 5.55V17.45C18.3 17.6437 18.2352 17.8223 18.1261 17.9652C18.1001 17.9305 18.0719 17.8966 18.0415 17.8634L10.2837 9.40039C9.2405 8.26237 7.43331 8.30503 6.44498 9.49102L4.7 11.585V5.55C4.7 5.08056 5.08055 4.7 5.55 4.7ZM4.7 14.2405V17.45C4.7 17.9195 5.08056 18.3 5.55 18.3H16.1355L9.03053 10.5491C8.6828 10.1698 8.0804 10.184 7.75096 10.5794L4.7 14.2405Z"
      fill={color}
    />
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
