import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import darkMapStyle from "../util/darkMapStyle";
export default function Map({
  places,
  destination,
  location,
  setLocation,
  mapRef,
  setPanelOpen,
}) {
  const GOOGLE_MAPS_API_KEY = "AIzaSyD4ZYfbcWceAE9FEXWU4pBq-K4Ys9s0idM";

  const getIconForPlace = (place) => {
    // Asigna un ícono según el tipo de lugar
    if (place.types.includes("hospital")) {
      return require("../assets/hospital.png"); // o una URL
    } else if (place.types.includes("police")) {
      return require("../assets/policeman.png"); // o una URL
    } else if (place.types.includes("pharmacy")) {
      return require("../assets/medicine.png"); // o una URL
    } else {
      return require("../assets/default.png"); // Ícono por defecto si no se encuentra tipo específico
    }
  };

  return (
    <MapView
      ref={mapRef} // Asigna la referencia al MapView
      style={styles.map}
      initialRegion={location}
      customMapStyle={darkMapStyle}
      onPress={() => setPanelOpen(false)}
    >
      {/* Mostrar marcador para la ubicación del usuario */}
      <Marker
        coordinate={location}
        draggable
        onDragEnd={(e) => {
          setLocation(e.nativeEvent.coordinate);
        }}
      />
      <Marker coordinate={destination} />

      {/* Mostrar los lugares cercanos en el mapa */}
      {places.map((place) => (
        <Marker
          key={place.place_id}
          coordinate={{
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          }}
          title={place.name}
          image={getIconForPlace(place)}
        />
      ))}

      {destination.latitude !== 0 && destination.longitude !== 0 && (
        <MapViewDirections
          origin={location} // Coordenada de origen
          destination={destination}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeColor="#31E981"
          strokeWidth={2}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
});
