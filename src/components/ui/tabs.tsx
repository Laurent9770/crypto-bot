import React, { useState } from 'react';
export const Tabs = ({ value, onValueChange, children }) => <div>{children}</div>;
export const TabsList = ({ children }) => <div style={{ display: 'flex', gap: 8 }}>{children}</div>;
export const TabsTrigger = ({ value, children, ...props }) => <button {...props}>{children}</button>;
export const TabsContent = ({ value, children }) => <div>{children}</div>;
