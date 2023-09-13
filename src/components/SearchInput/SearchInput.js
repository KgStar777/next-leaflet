import { useState, useCallback, useRef, useEffect } from 'react';

import styles from './SearchInput.module.scss';

const SearchInput = ({ children, href, className, ...rest }) => {
  const searchRef = useRef(null);
  const [ query, setQuery ] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(query);
  const [ active, setActive ] = useState(false);
  const [ latLng, setLatLng ] = useState();
  const [ result, setResult ] = useState([]);
  const delay = 4000;
  
  console.log("latLng: ", latLng);
  let buttonClassName = styles.input;

  if (className) {
    buttonClassName = `${buttonClassName} ${className}`;
  }

  const buttonProps = {
    className: buttonClassName,
    ...rest,
  };

  const searchEndPoint = (queryParams) => `/api/search?q=${queryParams}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(query), delay || 500);

    return () => clearTimeout(timer);
  }, [query, delay]);

  useEffect(() => {

    const controller = new AbortController();
    if (debouncedValue) {
      fetch(
        searchEndPoint(debouncedValue),
        { signal: controller.signal }
      )
      .then(response => response.json())
      .then(data => setResult(data))
      .catch(error => {
        if (error.name === "AbortError") {
          console.log("API failure");
        } else {
          console.log("Some other error");
        }
        setResult([]);
      })
    }
    return () => controller.abort();
  }, [debouncedValue])
  
  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, [])

  return (
    <div className={styles.searchInput} ref={searchRef}>
      <input {...buttonProps}
        type="text"
        name="search-input"
        onChange={onChange}
        onFocus={onFocus}
        value={query}
        placeholder='search it!'
      />
      <div className={styles.dropdown}>
        {active && result?.suggestions?.length > 0 && (
            <ul>
              {result.suggestions.map((item, idx) => {
                  return (
                    <>
                      <li onClick={setLatLng} key={idx}>{item.value}</li>
                    </>
              )})}
            </ul>
          )}
        </div>
    </div>
  );
};

export default SearchInput;
