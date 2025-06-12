import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { FilterCriteria } from "./Filter";

type Location = {
  name: string;
  talort: string;
  region: string;
  lat: number;
  long: number;
  kletterart: string;
  schwierigkeit: string;
};

interface MapProps {
  filter: FilterCriteria | null;
}

async function fetchLocations(): Promise<Location[]> {
  const res = await fetch("http://localhost:3001/api/locations/all");
  if (!res.ok) {
    throw new Error("Fehler beim Laden der Locations");
  }
  return res.json();
}

const Map: React.FC<MapProps> = ({ filter }) => {
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

    const updateMarkers = async () => {
      try {
        const data = await fetchLocations();
        setLocations(data);
        console.log("📦 Geladene Locations:", data);
        console.log("🔎 Aktiver Filter:", filter);

        const filtered = data.filter((loc) => {
          if (!filter) return true;

          const matchesKletterart =
            filter.kletterart === "" ||
            loc.kletterart?.toLowerCase() === filter.kletterart.toLowerCase();

          const matchesDifficulty =
            !isNaN(parseInt(loc.schwierigkeit)) &&
            parseInt(loc.schwierigkeit) <= filter.maxDifficulty;

          const matchesRegion =
            filter.standort === "" ||
            loc.region?.toLowerCase().includes(filter.standort.toLowerCase());

          return matchesKletterart && matchesDifficulty && matchesRegion;
        });

        markers.clearLayers(); // Entferne alte Marker

        filtered.forEach((loc) => {
          const marker = L.marker([loc.lat, loc.long]).bindPopup(
            `<b>${loc.name}</b><br>` +
              `📍 Talort: ${loc.talort}<br>` +
              `🌍 Region: ${loc.region}<br>` +
              `🧗‍♂️ Schwierigkeit: ${loc.schwierigkeit}<br>` +
              `🧱 Art: ${loc.kletterart}`
          );
          markers.addLayer(marker);
        });

        map.addLayer(markers);
      } catch (error) {
        console.error("Fehler beim Laden der Locations:", error);
      }
    };

    updateMarkers();
  }, [filter]); // ← wird bei Filteränderung neu ausgeführt

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
