import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
    const initial = localStorage.getItem(key);
    const saved = JSON.parse(initial);
    return saved || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

    useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};