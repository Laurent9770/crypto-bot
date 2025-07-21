import React from 'react';
export const Alert = ({ children }) => <div>{children}</div>;
export const AlertDescription = ({ children }) => (
  <div style={{ color: '#aaa', fontSize: '0.95em', margin: '8px 0' }}>{children}</div>
);
export default Alert;
