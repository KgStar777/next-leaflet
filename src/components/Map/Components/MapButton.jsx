import clsx from "clsx"

export const MapButton = ({
  className,
  onClick,
  style,
}) => {
  return (
    <button className={"mapButton"} onClick={onClick}style={style}>
      <div className={clsx("mapButtonImg", className)}/>
    </button>
  );
}
