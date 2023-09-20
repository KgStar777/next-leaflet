import styles from './DropDown.module.scss';

const DropDown = ({
  list,
  isOpen,
  onClick,
  displayValueFunc = (i) => i,
}) => {
  return (
    <div className={styles.dropdown}>
      {isOpen && list?.length > 0 && (
        <ul>
          {list.map((item, idx) => {
            return (
              <li
                key={idx}
                onClick={(e) => onClick(item, e)}
              >{displayValueFunc(item)}</li>
          )})}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
