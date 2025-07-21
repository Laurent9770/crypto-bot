import React from 'react';
export const Card = ({ children, ...props }) => (
  <div {...props} style={{ border: '1px solid #222', borderRadius: '12px', background: '#181A20', padding: '20px', margin: '8px 0', boxShadow: '0 2px 8px #0002' }}>
    {children}
  </div>
);
export const CardHeader = ({ children }) => <div style={{ marginBottom: 8 }}>{children}</div>;
export const CardTitle = ({ children }) => <h3 style={{ fontWeight: 'bold', color: '#F0B90B' }}>{children}</h3>;
export const CardContent = ({ children }) => <div>{children}</div>;
export const CardDescription = ({ children }) => <div style={{ color: '#aaa', fontSize: '0.95em', margin: '8px 0' }}>{children}</div>;
