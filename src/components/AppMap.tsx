import {
  MapContainer,
  TileLayer,
  Popup,
  useMap,
  Marker,
  ZoomControl,
} from "react-leaflet";
import { Icon, LatLngLiteral, Map as MapType } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leafleft-defaulticon-compatibility/dist/leafleft-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useState } from "react";

type MapLocation = LatLngLiteral & { id: string };

type MapProps = {
  center: LatLngLiteral;
  locations: MapLocation[];
};

const SelectedLocation = ({ center }: { center: LatLngLiteral }) => {
  const map = useMap();
  map.panTo(center, { animate: true });
  return null;
};

export const AppMap: React.FC<MapProps> = ({ center, locations }) => {
  const [selectedLocation, setSelectedLocation] = useState<
    MapLocation | undefined
  >();

  const mapMarkIcon = new Icon({
    iconUrl: "",
    iconSize: [47, 55],
  });

  const mapMarkActiveIcon = new Icon({
    iconUrl: "",
    iconSize: [55, 65],
  });

  const renderMarks = () => {
    return locations.map((location) => {
      <div key={location.id}>
        <Marker
          icon={
            location.id === SelectedLocation?.id
              ? mapMarkActiveIcon
              : mapMarkIcon
          }
          position={{ lat: location.lat, lng: location.lng }}
          eventHandlers={{
            click: () => {
              setSelectedLocation(location);
            },
          }}
        />
      </div>;
    });
  };

  return (
    <div
      style={{
        width: "80%",
        height: "80vh",
        borderRadius: "28px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        minZoom={5}
        zoomControl={false}
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedLocation && <SelectedLocation center={selectedLocation} />}
        {renderMarks()}
        <ZoomControl position="topright" />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            <h2>Hello World</h2>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
