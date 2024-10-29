"use client";

import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  serviceAreas: { name: string; coordinates: [number, number][][] }[];
}

const Map: React.FC<MapProps> = ({ center, zoom, serviceAreas }) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {serviceAreas.map((area, index) => (
        <Polygon key={index} positions={area.coordinates} color="blue" />
      ))}
    </MapContainer>
  );
};

export default Map;
