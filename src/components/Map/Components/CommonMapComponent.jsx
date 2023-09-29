import { useRef, useEffect } from "react";
import { DomEvent } from "leaflet";

export const CommonMapComponent = ({ children, map }) => {
  const componentRef = useRef();

  useEffect(() => {
    if (componentRef.current) {
      DomEvent
        .disableClickPropagation(componentRef.current)
        .disableScrollPropagation(componentRef.current);
    }
  }, [map]);

  return (
    <div ref={componentRef}>
      {children}
    </div>
  )
} 