
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseStyles = "w-full text-center px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-60 shadow-md hover:shadow-lg";

  const variantStyles = {
    primary: 'bg-festive-red text-snow-white hover:bg-red-700 focus:ring-red-400',
    secondary: 'bg-gold-leaf text-gray-800 hover:bg-yellow-500 focus:ring-yellow-400',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
