import clsx from "clsx";
import { useState, useCallback, useRef, useEffect } from "react";
import { Puff } from "react-loader-spinner";

import DropDown from "@components/DropDown";

import styles from "./SearchInput.module.scss";

const SearchInput = ({ children, href, className, setLatLng, setItem, ...rest }) => {
  const searchRef = useRef(null);
  const [ query, setQuery ] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(query);
  const [ active, setActive ] = useState(false);
  const [ loading, setLoading ] = useState(false);
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
      setLoading(true);
      fetch(
        searchEndPoint(debouncedValue),
        { signal: controller.signal }
      )
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
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
      }).finally(() => {
        setLoading(false);
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

  const onClear = () => {
    setQuery("");
  };

  return (
    <div className={styles.searchInput} ref={searchRef}>
      <div className={styles.inputContainer}>
        <input {...rest}
          className={clsx(buttonClassName)}
          type="text"
          name="search-input"
          onChange={onChange}
          onFocus={onFocus}
          value={query}
          placeholder='search it!'
          autoComplete="off"
        />
        <div className={styles.iconContainer}>
          {loading && (
            <Puff
              className={styles.loader}
              height="20"
              width="20"
              radius={1}
              color="#3A4239D6"
              ariaLabel="puff-loading"
              wrapperStyle={{zIndex: 2000}}
              wrapperClass=""
              visible={true}
            />
          )}
          {!loading && query && query !== "" && (
            <button
              className="close mapButtonImg"
              onClick={onClear}
            />
          )}
        </div>
      </div>
      <DropDown
        displayValueFunc={i => i?.properties?.formatted}
        list={result.features}
        isOpen={active}
        onClick={(item) => {
          if (!item?.properties?.lat && !item?.properties?.lon) {
            setActive(true)
            return;
          } else {
            setItem(item);
            setLatLng([item?.properties?.lat, item?.properties?.lon]);
            setActive(false);
          }
          setQuery(item.properties.formatted);
        }}
      />
    </div>
  );
};

export default SearchInput;
