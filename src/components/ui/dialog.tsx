import React from 'react';
export const Dialog = ({ children }) => <div>{children}</div>;
export const DialogContent = ({ children }) => <div>{children}</div>;
export const DialogHeader = ({ children }) => <div>{children}</div>;
export const DialogTitle = ({ children }) => <h2>{children}</h2>;
export const DialogDescription = ({ children }) => <div style={{ color: '#aaa', fontSize: '0.95em', margin: '8px 0' }}>{children}</div>;
export const DialogTrigger = ({ children, ...props }) => <button {...props}>{children}</button>;
