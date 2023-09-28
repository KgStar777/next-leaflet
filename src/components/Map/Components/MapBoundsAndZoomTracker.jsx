import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { SearchMoreInfoByType } from './SearchMoreInfoByType';


export function MapBoundsAndZoomTracker({position}) {
  const map = useMap();
  const [mapBounds, setMapBounds] = useState(null);
  const [mapZoom, setMapZoom] = useState(null);
  const [searchButtonType, setSearchButtonType] = useState(null);

  // Отслеживаем изменения границ карты
  useEffect(() => {
    if (map) {
      const updateMapBounds = () => {
        setMapBounds(map.getBounds());
        setMapZoom(map.getZoom());
      };

      map.on('moveend', updateMapBounds);
      // Установим начальное значение границ и зума
      updateMapBounds();

      return () => {
        map.off('moveend', updateMapBounds);
      };
    }
  }, [map]);

  useEffect(() => {
    setSearchButtonType(null);
  }, [position])

  return (
    <>
      <div style={{ position: "absolute", zIndex: 1000, top: 70, left: 70 }}>
        <button className="food" onClick={() => setSearchButtonType("catering")} />
        <button className="leisure" onClick={() => setSearchButtonType("leisure")} />
        <button className="food-market" onClick={() => setSearchButtonType("Commercial.food_and_drink")} />
        <button className="accommodation" onClick={() => setSearchButtonType("accommodation")} />
      </div>
      <SearchMoreInfoByType
        searchType={searchButtonType}
        rect={`${mapBounds?._northEast.lng},${mapBounds?._northEast.lat},${mapBounds?._southWest.lng},${mapBounds?._southWest.lat}`}
      />
    </>
  );
}