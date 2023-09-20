import { useState, useCallback, useRef, useEffect } from 'react';

import styles from './SearchInput.module.scss';
import DropDown from '@components/DropDown';

const SearchInput = ({ children, href, className, setLatLng, setItem, searchType, ...rest }) => {
  const searchRef = useRef(null);
  const [ query, setQuery ] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(query);
  const [ active, setActive ] = useState(false);
  const [ result, setResult ] = useState([]);
  const delay = 800;
  
  let buttonClassName = styles.input;

  if (className) {
    buttonClassName = `${buttonClassName} ${className}`;
  }

  const buttonProps = {
    className: buttonClassName,
    ...rest,
  };

  // запрос по россии
  // const searchEndPoint = (queryParams) => `/api/search?q=${queryParams}`;
  
  // запрос по хз
  const searchEndPoint = (queryParams) => `/api/search?q=${queryParams}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(query), delay || 500);
    return () => clearTimeout(timer);
  }, [query, delay]);

  // function fetching(url, opts) {
  //   const searchEndPoint = (queryParams) => `/api/reverse?q=${queryParams}`;
  //   return fetch(
  //     searchEndPoint(`${item.geo_lat}-${item.geo_lon}`),
  //     // { signal: controller.signal }
  //   ).then(response => response.json())
  // };

  useEffect(() => {
    const controller = new AbortController();
    if (debouncedValue) {
      fetch(
        searchEndPoint(debouncedValue),
        { signal: controller.signal }
      )
      .then(response => response.json())
      .then(data => {
        setResult(data);
        // setActive(true); // надо не
      })
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
        autoComplete="off"
      />
      <DropDown
        displayValueFunc={i => i.value}
        list={result.suggestions}
        isOpen={active}
        onClick={(item, e) => {
          const data = item?.data;
          if (!data.geo_lat && !data.geo_lon) {
            setActive(true)
            return;
          } else {
            setItem(item.data);
            setLatLng([item.data?.geo_lat, item.data?.geo_lon]);
            setActive(false);
          }
          setQuery(item.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
