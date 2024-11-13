import { Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import MapViewDirections from "react-native-maps-directions";
export default function Map() {
  const mapRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  const [location, setLocation] = useState({
    latitude: -6.778267750927057,
    longitude: -79.84472684077221,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const darkMapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ];

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setGPSPress(true);
      setTimeout(() => {
        setGPSPress(false);
      }, 2000);
      const currentLocation = await Location.getCurrentPositionAsync({});
      const newLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLocation(newLocation);

      // Centrar el mapa en la nueva ubicación
      if (mapRef.current) {
        mapRef.current.animateToRegion(newLocation, 1000); // Tiempo en ms para la animación
      }

      // Obtener la dirección a partir de las coordenadas
      const addressData = await Location.reverseGeocodeAsync({
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
      });

      if (addressData.length > 0) {
        // Aquí se mejorará la concatenación de la dirección
        const { street, city, region, country, postalCode } = addressData[0];
        let formattedAddress = ` ${city || ""}, ${region || ""}, ${
          country || ""
        }`;
        if (postalCode) {
          formattedAddress += `, ${postalCode}`; // Agregar el código postal si está disponible
        }
        setAddress(formattedAddress.trim());
      } else {
        setAddress("Dirección no disponible");
      }
    } else {
      alert("Permission to access location was denied");
    }
  };

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

  const [GPSPress, setGPSPress] = useState(false);
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
