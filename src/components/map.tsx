import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from 'react-query';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { Icon } from 'leaflet'; 

interface Country {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
    flag: string; // Add flag property to Country interface
    _id: number;
  };
}

const Map: React.FC = () => {
  const { data: countries } = useQuery('countryData', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    return response.json();
  });

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {countries && countries.map((country: Country) => (
        <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]} icon={
          new Icon({
            iconUrl: country.countryInfo.flag,
            iconSize: [20, 20], // Size of the flag icon
          })
        }>
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <img src={country.countryInfo.flag} alt={country.country} style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <p>Active: {country.active}</p>
              <p>Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
