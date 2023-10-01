import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { SearchMoreInfoByType } from './SearchMoreInfoByType';
import { MapButton } from './MapButton';
import { CommonMapComponent } from './CommonMapComponent';

export function MapBoundsAndZoomTracker() {
  const map = useMap();
  const [mapBounds, setMapBounds] = useState(null);
  const [mapZoom, setMapZoom] = useState(map.getZoom());
  const [searchButtonType, setSearchButtonType] = useState(null);

  // Отслеживаем изменения границ карты и устанавливаем LocalStorage
  useEffect(() => {
    if (map) {
      const updateMapBounds = () => {
        const zoom = map.getZoom();
        const center = map.getCenter();
        setMapBounds(map.getBounds());
        setMapZoom(zoom);
        const ls = JSON.parse(localStorage.getItem("your-favorite-map"));
        localStorage.setItem("your-favorite-map", JSON.stringify(
          Object.assign(!ls ? {} : ls, {
            zoom: zoom,
            position: center
          })
        ));
      };

      map.on('moveend', updateMapBounds);
      // Установим начальное значение границ и зума
      updateMapBounds();
      return () => {
        map.off('moveend', updateMapBounds);
      };
    }
  }, [map]);

  // поменьше запросов
  useEffect(() => {
    setSearchButtonType(null);
  }, [mapZoom, mapBounds])

  return (
    <CommonMapComponent map={map}>
      <div style={{ position: "absolute", zIndex: 500, top: 50, left: 65, display: "flex", gap: "6px" }}>
        <MapButton className="food" onClick={() => setSearchButtonType("catering")} />
        <MapButton className="leisure" onClick={() => setSearchButtonType("leisure")} />
        <MapButton className="food-market" onClick={() => setSearchButtonType("Commercial.food_and_drink")} />
        <MapButton className="accommodation" onClick={() => setSearchButtonType("accommodation")} />
      </div>
      <SearchMoreInfoByType
        searchType={searchButtonType}
        rect={`${mapBounds?._northEast.lng},${mapBounds?._northEast.lat},${mapBounds?._southWest.lng},${mapBounds?._southWest.lat}`}
      />
    </CommonMapComponent>
  );
}