import { useState, memo } from 'react';

import DropDown from '@components/DropDown';

import styles from './SearchTypeChanger.module.scss';

function SearchTypeChange({ searchType, onChange, list }) {
  const [isActive, setIsActive] = useState(false);
  const changeActive = () => {
    setIsActive(prev => !prev);
  }

  const onItemClick = (item, e) => {
    onChange(item);
    setIsActive(false);
  }

  const displayValueFunc = i => i.value;

  return (
    <div className={styles.searchTypeChangerWrapper}>
      <h5 className={styles.label}>Поиск по:</h5>
      <div className={styles.changerSelectorWrapper}>
        <div 
          onClick={changeActive}
          className={styles.searchTypeChanger}
        >{searchType.value}</div>
        {isActive && (
          <DropDown
            list={list}
            isOpen={isActive}
            onClick={onItemClick}
            displayValueFunc={displayValueFunc}
          />
        )}
      </div>
    </div>
  )
} 

export const SearchTypeChanger = memo(SearchTypeChange);