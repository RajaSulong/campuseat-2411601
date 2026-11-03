import { useEffect, useState } from "react";

// Like useState, but the value is saved in localStorage (survives a refresh).
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue; // broken saved data: start fresh
    }
  });

  useEffect(() => {
    try {
      // Save the value to localStorage
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or blocked: keep working in memory
    }
  }, [key, value]);

  return [value, setValue];
}
