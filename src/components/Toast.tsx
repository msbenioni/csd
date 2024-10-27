import React from "react";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function Toast({ message, onConfirm, onCancel }: ToastProps) {
  return (
    <div className={styles.toast}>
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
