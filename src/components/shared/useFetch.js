import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  console.log(url);
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // Use effect runs after every render. Second value passed in is the dependency. So, it will only run if the dependency changes. If empty [], it will only run once
  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {    
      fetch(url, options)
        .then(res => {
          if(!res.ok) {
            throw Error('Could not fetch the data for that resource');
          }
          console.log(res);
          return res.json();
        })
        .then((data) => {
          setError(null);
          setData(data)
          setIsPending(false);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log("fetch aborted");
          } else {
            setError(err.message);
            setIsPending(false);
          }
        })
    }, 1000);
// When we abort, we still get an error. Need to recognize it's an abort error in catch block
    return () => abortCont.abort();

  }, [url]);

  return { data, isPending, error }
}

export default useFetch;