import React from 'react';
export const Checkbox = ({ checked, onChange, ...props }) => (
  <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} {...props} />
);
export default Checkbox;
