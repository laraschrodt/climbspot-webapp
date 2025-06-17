import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { FilterCriteria } from "./Filter";


/**
 * Datenmodell für eine einfache Location mit Koordinaten,
 * das in der Karte verwendet wird.
 */

type Location = {
  ort_id: string;
  name: string;
  talort: string;
  region: string;
  lat: number;
  long: number;
  kletterart: string;
  schwierigkeit: string;
};

/**
 * Props für die Map-Komponente.
 * @property filter - Aktive Filterkriterien (optional), um die angezeigten Marker einzuschränken.
 */

interface MapProps {
  filter: FilterCriteria | null;
}

/**
 * Lädt alle Locations vom Server.
 * Wird intern für das Rendering der Marker verwendet.
 */

async function fetchLocations(): Promise<Location[]> {
  const res = await fetch("api/locations/all");
  if (!res.ok) {
    throw new Error("Fehler beim Laden der Locations");
  }
  return res.json();
}

/**
 * Interaktive Leaflet-Karte zur Darstellung von Kletterspots.
 *
 * Kontext:
 * Wird auf der Kartenübersichtsseite verwendet, um Spots geographisch anzuzeigen.
 *
 * Funktion:
 * - Initialisiert Leaflet mit MarkerCluster-Plugin.
 * - Holt alle Locations per API und filtert sie ggf. nach übergebenen Kriterien.
 * - Zeigt für jede Location einen Marker mit Popup und Direktlink zur Detailansicht.
 *
 * Hinweise:
 * - Marker und Karte werden per `useRef` persistent verwaltet.
 * - Bei Änderung des Filters wird das Markerset neu aufgebaut.
 */

const Map: React.FC<MapProps> = ({ filter }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.MarkerClusterGroup | null>(null);

      // Initialisiere die Karte (einmalig)
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map", {
      center: [51.1657, 10.4515],
      zoom: 6,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const markers = L.markerClusterGroup();
    map.addLayer(markers);

    mapRef.current = map;
    markersRef.current = markers;
  }, []);

    // Aktualisiere Marker bei Filteränderung
  useEffect(() => {
    const updateMarkers = async () => {
      if (!mapRef.current || !markersRef.current) return;

      try {
        const data = await fetchLocations();
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

        const markers = markersRef.current;
        markers.clearLayers();

        filtered.forEach((loc) => {
          const marker = L.marker([loc.lat, loc.long]).bindPopup(
            `<b>${loc.name}</b><br>` +
              `📍 Talort: ${loc.talort}<br>` +
              `🌍 Region: ${loc.region}<br>` +
              `🧗‍♂️ Schwierigkeit: ${loc.schwierigkeit}<br>` +
              `🧱 Art: ${loc.kletterart}<br><br>` +
              `<button onclick="window.location.href='/details/${loc.ort_id}'" style="background-color:#16a34a;color:white;padding:5px 10px;border:none;border-radius:4px;cursor:pointer;">➡ Zum Profil</button>`
          );

          markers.addLayer(marker);
        });
      } catch (error) {
        console.error("Fehler beim Laden oder Filtern:", error);
      }
    };

    updateMarkers();
  }, [filter]);

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
