import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

type Location = {
  name: string;
  city: string;
  lat: number;
  long: number;
  rating: number;
  difficulty: string;
};

async function fetchLocations(): Promise<Location[]> {
  const res = await fetch("http://localhost:3001/api/locations/all");
  if (!res.ok) {
    throw new Error("Fehler beim Laden der Locations");
  }
  return res.json();
}

const Map = () => {
  const [locations, setLocations] = useState<Location[]>([]);

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

    const markers = L.markerClusterGroup();

fetchLocations()
  .then((data) => {
    console.log(" Geladene Locations:", data); 

    setLocations(data);

    data.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.long]).bindPopup(
        `<b>${loc.name}</b><br>` +
        `📍 Ort: ${loc.city}<br>` +
        `⭐ Bewertung: ${"⭐".repeat(loc.rating)}<br>` +
        `🧗‍♂️ Schwierigkeit: ${loc.difficulty}`
      );
      markers.addLayer(marker);
    });

    map.addLayer(markers);
  })


      .catch((error) => {
        console.error("Fehler beim Laden der Locations:", error);
      });
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
