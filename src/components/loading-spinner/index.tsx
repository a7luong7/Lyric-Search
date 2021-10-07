import React from 'react';
import { IconWithLoad } from '../icon';

const LoadingSpinner = ({ text } : { text:string }) => {
  const style = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
  };
  return (
    <div style={style}>
      <IconWithLoad icon="spinner" isLoading />
      <div style={{ marginLeft: '.5rem' }}>{text}</div>
    </div>
  );
};

export default LoadingSpinner;
