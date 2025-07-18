import React from 'react';
export const Label = ({ children, ...props }) => (
  <label {...props} style={{ color: '#fff', fontWeight: 'bold', marginBottom: 4, display: 'block' }}>
    {children}
  </label>
);
export default Label;
