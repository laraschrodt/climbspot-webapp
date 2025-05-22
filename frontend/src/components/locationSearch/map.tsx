import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

type Location = {
  name: string;
  city: string;
  lat: number;
  lng: number;
  rating: number;
  difficulty: string;
};

const Map = () => {
  useEffect(() => {
    const existingMap = document.getElementById("map");
    if (!existingMap) return;
    if ((existingMap as HTMLElement & { _leaflet_id?: number })._leaflet_id) return;

    const map = L.map("map", {
      center: [51.1657, 10.4515],
      zoom: 6,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const locations: Location[] = [
      {
        name: "Kletterwand Ost",
        city: "Berlin",
        lat: 52.52,
        lng: 13.405,
        rating: 4,
        difficulty: "Mittel",
      },
      {
        name: "Felswand Süd",
        city: "München",
        lat: 48.1351,
        lng: 11.582,
        rating: 5,
        difficulty: "Schwer",
      },
    ];

    const markers = L.markerClusterGroup();

    locations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng]).bindPopup(
        `<b>${loc.name}</b><br>` +
        `📍 Ort: ${loc.city}<br>` +
        `⭐ Bewertung: ${"⭐".repeat(loc.rating)}<br>` +
        `🧗‍♂️ Schwierigkeit: ${loc.difficulty}`
      );

      markers.addLayer(marker);
    });

    map.addLayer(markers);
  }, []);

  return (
    <div className="flex-1 bg-gray-200">
      <div
        id="map"
        style={{
          height: "600px",
          width: "100%",
        }}
      ></div>
    </div>
  );
};

export default Map;
