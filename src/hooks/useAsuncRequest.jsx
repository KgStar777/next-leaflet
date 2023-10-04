import { useEffect, useMemo, useState } from "react";

// export const useAxios = ({ url, method, body = null, headers = null }) => {
export const useAsuncRequest = ({ getUrl, params }) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState();
  const [ result, setResult ] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController();
    if (params) {
      setLoading(true);
      fetch(
        getUrl(params),
        { signal: controller.signal }
      )
      .then(response => response.json())
      .then(data => {
        setResult(data);
        // setActive(true); // надо не?
      })
      .catch(error => {
        if (error.name === "AbortError") {
          setError("API failure");
        } else {
          setError("Some other error");
        }
        setResult([]);
      }).finally(() => {
        setLoading(false);
      })
    }
    return () => controller.abort();
  }, [params])

  return useMemo(() => {
    return { result, error, loading }
  }, [result, loading, error]);
};