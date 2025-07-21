import React from 'react';
export const Table = ({ children }) => <table style={{ width: '100%', borderCollapse: 'collapse' }}>{children}</table>;
export const TableBody = (props) => <tbody>{props.children}</tbody>;
export const TableCell = (props) => <td>{props.children}</td>;
export const TableHead = (props) => <thead>{props.children}</thead>;
export const TableHeader = (props) => <th>{props.children}</th>;
export const TableRow = (props) => <tr>{props.children}</tr>;
export default Table;
