// Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from 'react-query';

interface Country {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
    _id: number;
  };
}

const Map: React.FC = () => {
  const { data: countries } = useQuery('countryData', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    return response.json();
  });

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {countries && countries.map((country: Country) => (
        <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
          <Popup>
            <div>
              <h2>{country.country}</h2>
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
