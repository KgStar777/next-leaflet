import { useState } from 'react';

import Container from '@components/Container';
import Map from '@components/Map';
import SearchInput from '@components/SearchInput';

import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [38.907132, -77.036546];
const mapMaxBounds = [[-175, -180], [175, 255]];

const MapComponent = () => {
  const [ latLng, setLatLng ] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState();
  console.log("latLng: ", latLng);
  console.log("isFullScreen: ", isFullScreen);

  return (
    // <Container>
      <div className={styles.panelWrapper} style={{ position: "relative" }}>
        <div className={styles.mapPanel} style={{ position: "absolute", zIndex: 1000, top: "10px", left: "60px" }}>
          <SearchInput setLatLng={setLatLng} />
        </div>
        <div className={styles.panel}>
          <div className={styles.searchParams}>
            Поиск по: <span>документам</span>
          </div>
          <button
            title='Фильтр'
            onClick={() => {
              setIsFullScreen((v) => !v)}}
            className={styles.panelFilterButton}>{"<"}
          </button>
          {/* <button
            title='Карта'
            className={styles.panelMapButton}>🖵
          </button> */}
        </div>

        <Map
          className={styles.homeMap}
          currentPosition={latLng}
          width="100%"
          height="100vh"
          center={latLng ? latLng : DEFAULT_CENTER}
          maxBounds={mapMaxBounds}
          maxBoundsViscosity={0.95}
          maxZoom={17}
          zoom={8}>
          {({ TileLayer, Marker, Popup }) => {
            return (
            <>
              {/* <ChangeView center={latLng ? latLng : DEFAULT_CENTER} /> */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <Marker
                position={latLng ? latLng : DEFAULT_CENTER}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </>
          )}}
        </Map>
      </div>
    // </Container>
  )
}

export default MapComponent;