import React from 'react';
export const Slider = ({ value, onValueChange, min = 1, max = 100, step = 1, ...props }) => (
  <input
    type="range"
    value={value}
    min={min}
    max={max}
    step={step}
    onChange={e => onValueChange([parseInt(e.target.value)])}
    style={{ width: '100%' }}
    {...props}
  />
);
export default Slider;
