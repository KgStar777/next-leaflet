import { useEffect, useState } from 'react';
import L from "leaflet";
import * as ReactLeaflet from 'react-leaflet';

import "leaflet.markercluster";

//** Искать подробнее по типу */
export function SearchMoreInfoByType({ searchType, rect }) {
  const map = ReactLeaflet.useMap();
  const [result, setResult] = useState([]);

  const customIcon = L.icon({
    iconUrl: "https://img.icons8.com/color/48/marker--v1.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // console.log("searchType: ", searchType);
  // console.log("rect: ", rect);
  // console.log("result: ", result);
  useEffect(() => {
    console.log("go search");
    const controller = new AbortController();
    if (searchType !== null) {
      fetch(`/api/near-places?category=${searchType}&rect=${rect}&zoom=${map.getZoom()}`,
        { signal: controller.signal })
      .then(response => response.json())
      .then(data => {
        setResult(data);
      })
      .catch(error => {
        if (error.name === "AbortError") {
          console.log("API failure");
        } else {
          console.log("Some other error");
        }
        setResult([]);
      })
    }
    return () => controller.abort();
  }, [searchType]);

  useEffect(() => {
    if (result?.features?.length > 0) {
      const markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
      });
      result.features.forEach(item => {
        const marker = new L.marker(
          [item.properties.lat, item.properties.lon], {
          icon: customIcon,
        });
        marker.bindPopup(`
          <h2>${item.properties.name}</h2>
          <p>${item.properties.formatted}</p>
          <p>${item.properties?.datasource?.raw?.phone}</p>
          `)
          // <a target="_blank" href={${item.properties?.datasource?.raw?.website}}>${item.properties?.datasource?.raw?.website}</a>
        markers.addLayer(marker);
        // или это(без кластеров)
        // marker.addTo(map);
      });
      map.addLayer(markers);
    } 
  }, [result]);

  return null;
}