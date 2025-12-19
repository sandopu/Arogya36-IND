import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, action }) => {
  return (
    <div className={`glass-dark rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-royal-900/20 hover:-translate-y-1 transition-all duration-300 ease-out ${className}`}>
      {(title || action) && (
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-white/5 rounded-t-2xl">
          {title && <h3 className="text-lg font-serif font-bold text-slate-100">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6 animate-fade-in text-slate-300">
        {children}
      </div>
    </div>
  );
};