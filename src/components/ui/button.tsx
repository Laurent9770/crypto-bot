import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';

export function Button({ variant = "default", children, ...props }) {
  const baseStyle = "px-4 py-2 rounded font-semibold";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    premium: "bg-yellow-400 text-black hover:bg-yellow-500",
  };

  return (
    <button className={cn(baseStyle, variants[variant])} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  asChild: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
