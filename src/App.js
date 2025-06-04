import Map from "./Components/MapBoxMap";
import SearchBar from "./Components/SearchBar";
import { LocationProvider } from "./contexts/locationContext";

function App() {
  return (
    <LocationProvider>
      <div style={{ position: 'relative', height: '100vh'}}>
         <Map />
         <div style={{
            position: 'absolute',
            top: 10,
            left: 10
         }} >
          <SearchBar></SearchBar>
          </div>
      </div>
    </LocationProvider>
  );
}

export default App;
