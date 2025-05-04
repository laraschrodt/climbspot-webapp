import { Navbar } from "../components/general/Navbar";
import FilterSidebar from "../components/locationSearch/FilterSidebar";
import Map from "../components/locationSearch/map";

function LocationList() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        {/* links: Filter – nimmt per md:w-1/3 ein Drittel, sonst 100% */}
        <FilterSidebar />

        {/* rechts: Map – füllt den restlichen Platz */}
        <div className="flex-1">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default LocationList;
