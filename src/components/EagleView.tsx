import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function EagleView() {
  return (
    <MapContainer
      center={[46.3502, -72.5798]} // UQTR coordinates
      zoom={15}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[46.3502, -72.5798]}>
        <Popup>
          Université du Québec à Trois-Rivières (UQTR)
        </Popup>
      </Marker>

    </MapContainer>
  );
}