/* eslint-disable react/require-default-props */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

export const Icon = ({
  icon,
  size,
  color = '',
} : {
  icon: IconProp,
  size?: SizeProp,
  color?: string
}) => (<FontAwesomeIcon icon={icon} size={size} color={color} />);

export const IconWithLoad = ({
  isLoading,
  icon,
  size,
  color = '',
} : {
  isLoading : boolean,
  icon : IconProp,
  size? : SizeProp,
  color? : string
}) => {
  if (isLoading) {
    return (
      <FontAwesomeIcon
        icon={faSpinner}
        pulse
        spin
      />
    );
  }
  return (<Icon icon={icon} size={size} color={color} />);
};
