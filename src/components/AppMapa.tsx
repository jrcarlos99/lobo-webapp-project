"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Occurrence } from "@/types/occurrence";
import { useEffect } from "react";

// Corrige o bug do ícone padrão do Leaflet no React
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type AppMapaProps = {
  occurrences: Occurrence[];
};

export function AppMapa({ occurrences }: AppMapaProps) {
  return (
    <MapContainer
      center={[-8.05, -34.9]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      maxBounds={[
        [-9.6, -41.5],
        [-6.0, -34.7],
      ]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {occurrences
          .filter((o) => o.latitude !== undefined && o.longitude !== undefined)
          .map((o) => (
            <Marker key={o.id} position={[o.latitude, o.longitude]}>
              <Popup>
                <strong>{o.titulo}</strong>
                <br />
                {o.cidade} - {o.regiao}
                <br />
                Status: {o.status}
              </Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
