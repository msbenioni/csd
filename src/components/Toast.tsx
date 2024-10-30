import React from "react";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'success' | 'error' | 'info' | 'warning';
}

export function Toast({ 
  message, 
  onConfirm, 
  onCancel, 
  variant = 'info' 
}: ToastProps) {
  return (
    <div className={styles.container}>
      <div className={`
        ${styles.toast}
        bg-white
        p-3
        rounded-lg
        shadow-lg
        mb-2
        ${variant === 'success' && 'bg-toast-success text-white'}
        ${variant === 'error' && 'bg-toast-error text-white'}
        ${variant === 'info' && 'bg-toast-info text-white'}
        ${variant === 'warning' && 'bg-toast-warning text-white'}
      `}>
        <p>{message}</p>
        <div className="flex gap-2">
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-white/20 rounded hover:bg-white/30 transition-colors"
          >
            Confirm
          </button>
          <button 
            onClick={onCancel}
            className="px-4 py-2 bg-white/20 rounded hover:bg-white/30 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
