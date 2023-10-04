import { useState, useCallback, useRef, useEffect, memo } from 'react';

import styles from './SearchInput.module.scss';
import DropDown from '@components/DropDown';
// import useAxios from 'axios-hooks';

const formatted = i => i?.properties?.formatted;

const SearchInputMain = ({
  result,
  query,
  setQuery,
  children,
  className,
  setLatLng,
  setItem,
  ...props
}) => {
  const [ active, setActive ] = useState(false);
  // const [ result, setResult ] = useState([]);
  const searchRef = useRef(null);

  let buttonClassName = styles.input;

  if (className) {
    buttonClassName = `${buttonClassName} ${className}`;
  }

  const buttonProps = {
    className: buttonClassName,
    ...props,
  };

  const onChange = useCallback((event) => {
    const q = event.target.value;
    setQuery(q);
  }, []);

  const onDropDownClick = useCallback((item) => {
    if (!item?.properties?.lat && !item?.properties?.lon) {
      setActive(true)
      return;
    } else {
      setItem(item);
      setLatLng([item?.properties?.lat, item?.properties?.lon]);
      setActive(false);
    }
    setQuery(item.properties.formatted);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

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
        displayValueFunc={formatted}
        list={result?.features}
        isOpen={active}
        onClick={onDropDownClick}
      />
    </div>
  )
}

export const SearchInputWithDropDown = memo(SearchInputMain);