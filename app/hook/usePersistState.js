'use client'
import { useState, useEffect } from 'react';
import browserStorage from 'store';

const usePersistState = (storageKey, initialState) => {

  const [state, setInternalState] = useState(initialState);

  useEffect(() => {

    const storageInBrowser = browserStorage.get(storageKey);
    if (storageInBrowser) {
      setInternalState(storageInBrowser);
    }
  }, [storageKey]);

  const setState = (newState) => {
    browserStorage.set(storageKey, newState);
    setInternalState(newState);
  };

  return [state, setState];
};

export default usePersistState