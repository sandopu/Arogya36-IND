import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "rounded-xl font-bold transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-[0.98] tracking-wide relative overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-royal-700 to-royal-600 text-white hover:from-royal-600 hover:to-royal-500 focus:ring-royal-500 border border-transparent hover:-translate-y-0.5 shadow-royal-900/50",
    secondary: "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 focus:ring-royal-500 border border-white/10",
    outline: "border-2 border-slate-600 text-slate-300 hover:border-white hover:text-white hover:bg-white/5 focus:ring-slate-500",
    danger: "bg-gradient-to-r from-red-700 to-red-600 text-white hover:from-red-600 hover:to-red-500 focus:ring-red-500 border border-transparent",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};