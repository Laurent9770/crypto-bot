import React from 'react';
export const Progress = ({ value, max = 100 }) => (
  <progress value={value} max={max} style={{ width: '100%' }} />
);
export default Progress;
