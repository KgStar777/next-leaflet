import { CommonMapComponent } from "./CommonMapComponent";
import { MapButton } from "./MapButton";

export const CommonMapButton = ({
  map,
  style,
  className,
  onClick,
  absolute
}) => {
  return (
    <CommonMapComponent map={map}>
      <MapButton
        onClick={onClick}
        style={absolute ? { position: "absolute", ...style } : style}
        className={className}
        absolute={absolute}
      />
    </CommonMapComponent>
  )
}