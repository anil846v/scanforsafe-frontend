import { useState, useEffect } from 'react';
import { getDB, subscribe } from '@/data/db';

export function useDB() {
  const [db, setDb] = useState(getDB());

  useEffect(() => {
    // Subscribe to changes in localStorage or direct writes
    const unsubscribe = subscribe(() => {
      setDb(getDB());
    });
    return unsubscribe;
  }, []);

  return db;
}
