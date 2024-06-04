import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {memo} from 'react';
import {moderateScale} from '@themes/responsive';
import colors from '@themes/color';

const SvgComponent = ({size = 24, color = colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={moderateScale(size)}
    height={moderateScale(size)}
    fill="none">
    <G clipPath="url(#clip0_33_24585)">
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 9H21M3 15H21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.95192 4.99609C9.87673 1.50604 14.1233 1.50604 15.0481 4.99609C15.638 7.22218 15.9641 9.58777 16 12C15.9641 14.4122 15.638 16.7778 15.0481 19.0039C14.1233 22.494 9.87673 22.494 8.95192 19.0039C8.36205 16.7778 8.0359 14.4122 8 12C8.0359 9.58777 8.36205 7.22218 8.95192 4.99609Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_33_24585">
        <Rect
          width={moderateScale(size)}
          height={moderateScale(size)}
          fill={color}
        />
      </ClipPath>
    </Defs>
  </Svg>
);

const Memo = memo(SvgComponent);
export default Memo;
