import React from 'react';
import { useCanteen } from '../context/CanteenContext';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useCanteen();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'warning':
        return <AlertTriangle size={18} color="#f59e0b" />;
      case 'info':
        return <Info size={18} color="#3b82f6" />;
      default:
        return <CheckCircle2 size={18} color="#10b981" />;
    }
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={`toast-bubble ${toast.type || ''}`}>
        {getIcon()}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
