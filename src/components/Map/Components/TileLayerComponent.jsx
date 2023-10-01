import { useState } from "react";
import * as ReactLeaflet from "react-leaflet";

import Image from "next/image";
import { CommonMapComponent } from "./CommonMapComponent";

import "leaflet/dist/leaflet.css";


export function TileLayerComponent() {
  const map = ReactLeaflet.useMap();
  const [layerPanel, setLayerPanel] = useState("basic-v2");

  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

  return (
    <>
      <ReactLeaflet.TileLayer
        crossOrigin
        // maxNativeZoom={17}
        // minNativeZoom={1}
        minZoom={2}
        maxZoom={17}
        maxBounds={[[-175, -180], [175, 255]]}
        maxBoundsViscosity={0.95}
        url={`https://api.maptiler.com/maps/${layerPanel}/{z}/{x}/{y}.png?key=${apiKey}`}
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={"\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"}
        // attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <CommonMapComponent map={map}>
        <div title="Change tile" style={{
          position: "absolute", bottom: 10, left: 10,
          zIndex: 2000,
          margin: 0, padding: 0,
          border: "1px solid grey",
          // width: "fit-content",
          // height: "auto",
          width: "85px",
          height: "60px",
          borderRadius: "3px", cursor: "pointer",
          }}>
            <Image
              onClick={() => {
                setLayerPanel(layerPanel === "streets-v2"
                  ? "basic-v2"
                  // ? "topo-v2"
                  : "streets-v2"
                )
              }}
              alt="map tile"
              width={85}
              height={60}
              src={layerPanel === "streets-v2"
              ? "/map/tiles/basic.png"
              : "/map/tiles/streets.png"}
            />
        </div>
      </CommonMapComponent>
    </>
  )
}