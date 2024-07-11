import React from 'react';
import {SVG_NAME} from '@svg/svgList';
import {colors} from '@themes/color';

interface SvgComponentProps {
  name: keyof typeof SVG_NAME;
  size?: number;
  color?: string;
}

function SvgComponent({
  name,
  size = 24,
  color = colors.white,
}: SvgComponentProps) {
  let svgName = name.toUpperCase();

  let SvgIcon = SVG_NAME[svgName];

  if (!SvgIcon) {
    console.error(`SVG component with name ${name} not found.`);
    return null;
  }

  return <SvgIcon size={size} color={color} />;
}

export default SvgComponent;
