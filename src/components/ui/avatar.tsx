import React from 'react';
export const Avatar = ({ children, ...props }) => (
  <div {...props} style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </div>
);
export const AvatarFallback = ({ children }) => (
  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </div>
);
export const AvatarImage = ({ src, alt, ...props }) => (
  <img src={src} alt={alt} {...props} style={{ width: 32, height: 32, borderRadius: '50%' }} />
);
export default Avatar;
