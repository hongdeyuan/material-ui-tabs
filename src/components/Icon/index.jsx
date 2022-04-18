/**
 * Icon Component
 * default size: 16px
 */
import { SvgIcon } from '@mui/material';
import * as icons from 'pluto-icon';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Icon = forwardRef(_Icon);

function _Icon(
  { name, size = 16, viewSize = size, isColorful = false, color, ...rest },
  ref
) {
  const componentName = `${name}${size}${isColorful ? 'Colorful' : ''}`;

  return (
    <SvgIcon
      {...rest}
      ref={ref}
      style={{ fontSize: viewSize, color }}
      viewBox={`0 0 ${size} ${size}`}
      component={icons[componentName]}
    />
  );
}

_Icon.propTypes ={
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  viewSize: PropTypes.number,
  color: PropTypes.string,
  isColorful: PropTypes.bool,
}

export default Icon;
