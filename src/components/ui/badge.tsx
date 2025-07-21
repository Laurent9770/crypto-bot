import React from 'react';
export const Badge = ({ children, className = '', ...props }) => (
  <span {...props} className={['pill-shaped', className].filter(Boolean).join(' ')} style={{ display: 'inline-block', background: '#F0B90B', color: '#181A20', borderRadius: '4px', padding: '2px 8px', fontWeight: 'bold', fontSize: '0.85em', marginRight: 4 }}>
    {children}
  </span>
);
export default Badge;
