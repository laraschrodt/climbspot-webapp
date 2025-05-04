import { Navbar } from "../components/general/Navbar";
import FilterSidebar from "../components/locationSearch/FilterSidebar";

function LocationList() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <FilterSidebar />
      </div>
    </div>
  );
}

export default LocationList;
