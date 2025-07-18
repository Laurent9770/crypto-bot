import React from 'react';
export const Select = ({ value, onValueChange, children }) => <select value={value} onChange={e => onValueChange(e.target.value)}>{children}</select>;
export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectValue = () => null;
export const SelectContent = ({ children }) => <>{children}</>;
export const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;
