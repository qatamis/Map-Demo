import React, { useState } from "react";
import "./App.css";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import GazaCities from "./data/gaza.json";
import mapStyles from "./mapStyles";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 31.354675,
  lng: 34.308826,
};

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB9YSMIlUuUM4ev3Q9f3e5DKyC8dZ_mc7w", // Replace with your actual API key
    libraries: ["geometry", "drawing", "places"],
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      defaultOptions={{ styles: mapStyles }}
    >
      {/** You can add markers or other components here */}
      {GazaCities.cities.map((city) => (
        <Marker
          key={city.CITY_ID}
          position={{ lat: city.LATITUDE, lng: city.LONGITUDE }}
          onClick={() => setSelectedCity(city)}
          icon={{
            url: "/city.svg", // Custom marker icon
            scaledSize: new window.google.maps.Size(25, 25), // Adjust size as needed
          }}
        />
      ))}

      {selectedCity && (
        <InfoWindow
          position={{ lat: selectedCity.LATITUDE, lng: selectedCity.LONGITUDE }}
          onCloseClick={() => setSelectedCity(null)}
        >
          <div>
            <h3>{selectedCity.NAME}</h3>
            <p style={{ maxWidth: "175px" }}>{selectedCity.DESCRIPTION}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
