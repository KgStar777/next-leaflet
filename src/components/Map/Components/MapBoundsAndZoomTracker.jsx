import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { SearchMoreInfoByType } from './SearchMoreInfoByType';
import { MapButton } from './MapButton';
import MarkerClusterGroup from 'react-leaflet-markercluster';

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

  // поменьше запросов
  useEffect(() => {
    setSearchButtonType(null);
  }, [position, mapZoom, mapBounds ])

  return (
    <>
      <div style={{ position: "absolute", zIndex: 500, top: 50, left: 65, display: "flex", gap: "6px" }}>
        <MapButton className="food" onClick={() => setSearchButtonType("catering")} />
        <MapButton className="leisure" onClick={() => setSearchButtonType("leisure")} />
        <MapButton className="food-market" onClick={() => setSearchButtonType("Commercial.food_and_drink")} />
        <MapButton className="accommodation" onClick={() => setSearchButtonType("accommodation")} />
      </div>
      {/* <MarkerClusterGroup> */}
      <SearchMoreInfoByType
        searchType={searchButtonType}
        rect={`${mapBounds?._northEast.lng},${mapBounds?._northEast.lat},${mapBounds?._southWest.lng},${mapBounds?._southWest.lat}`}
      />
      {/* </MarkerClusterGroup> */}
    </>
  );
}