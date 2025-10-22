// "use client";

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster";
// import L from "leaflet";
// import { Occurrence } from "@/types/occurrence";
// import "leaflet/dist/leaflet.css";

// // Corrige o bug do ícone padrão do Leaflet no React
// const DefaultIcon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// type AppMapaProps = {
//   occurrences: Occurrence[];
// };

// export default function AppMapa({ occurrences }: AppMapaProps) {
//   const [mounted, setMounted] = useState(false);

//   // Garante que só renderiza no cliente
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <MapContainer
//       key="main-map"
//       center={[-8.05, -34.9]}
//       zoom={7}
//       className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-full"
//       maxBounds={[
//         [-9.6, -41.5],
//         [-6.0, -34.7],
//       ]}
//       maxBoundsViscosity={1.0}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <MarkerClusterGroup>
//         {occurrences
//           .filter((o) => o.latitude !== undefined && o.longitude !== undefined)
//           .map((o) => (
//             <Marker key={o.id} position={[o.latitude, o.longitude]}>
//               <Popup>
//                 <strong>{o.titulo}</strong>
//                 <br />
//                 {o.cidade} - {o.regiao}
//                 <br />
//                 Status: {o.status}
//               </Popup>
//             </Marker>
//           ))}
//       </MarkerClusterGroup>
//     </MapContainer>
//   );
// }
