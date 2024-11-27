import { useState, useEffect } from 'react';


function useSearchFun(setData, searchTerm, searchFunction, delay = 500) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  useEffect(() => {
    if (debouncedTerm) {
        const performSearch = async () => {
            const searchResults = await searchFunction({name: debouncedTerm});
            console.log(debouncedTerm, searchResults)
            setData(searchResults);
        }
      performSearch();
    }
  }, [debouncedTerm, searchFunction]);
}

export default useSearchFun;
