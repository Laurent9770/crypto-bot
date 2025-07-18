import React from 'react';
export const Button = ({ children, ...props }) => (
  <button {...props} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#F0B90B', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
    {children}
  </button>
);
export default Button;
