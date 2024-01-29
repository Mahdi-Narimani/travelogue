import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';

import { useCities } from '../contexts/CitiesContext';
import useGeolocation from '../hooks/useGeoLocation';
import useUrlPosition from '../hooks/useUrlPosition';
import Button from '../components/Button';
import styles from './Map.module.css';

const Map = () =>
{
  const { cities } = useCities();
  const [lat, lng] = useUrlPosition();
  const { isLoading, position, getPosition } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([30, 1])

  useEffect(() =>
  {
    if (lat && lng)
    {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng])

  useEffect(() =>
  {
    if (position.lat && position.lng)
    {
      setMapPosition([position.lat, position.lng])
    }

  }, [position])


  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>
        {isLoading ? 'Loading...' : 'Use Your Position'}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          cities.map(city => (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))
        }
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

const ChangeCenter = ({ position }) =>
{
  const map = useMap();
  map.setView(position);
}

const DetectClick = () =>
{
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}
export default Map