import React from 'react';
export const Avatar = ({ src, alt, ...props }) => (
  <img src={src} alt={alt} {...props} style={{ width: 32, height: 32, borderRadius: '50%' }} />
);
export default Avatar;
