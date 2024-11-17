import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const icon = require("../assets/safegoIcon.png");
const menu = require("../assets/Menu.png");
const search = require("../assets/Search.png");
const Siren = require("../assets/Siren.png");

import Panel from "./panel";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUserStore } from "../store/store";
import { useRouter } from "expo-router";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import ModalRuta from "./modalRuta";
import GPSAlert from "../components/gpsAlert";
import darkMapStyle from "../util/darkMapStyle";
import Map from "../components/map";
export default function App() {
  const [hoverGPS, setHoverGPS] = useState(false);
  const [hoverIndicaciones, setHoverIndicaciones] = useState(false);
  const [hoverHomeSafe, setHoverHomeSafe] = useState(false);
  const [hoverChat, setHoverChat] = useState(false);
  const [hoverStar, setHoverStar] = useState(false);
  const [hoverSiren, setHoverSiren] = useState(false);

  const [address, setAddress] = useState(""); // Estado para almacenar la dirección]
  const [places, setPlaces] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false); // Estado para controlar si el panel está abierto o cerrado]
  const route = useRouter();
  // Referencia al MapView para centrar el mapa
  const mapRef = useRef(null);

  const [location, setLocation] = useState({
    latitude: -6.778267750927057,
    longitude: -79.84472684077221,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [GPSPress, setGPSPress] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Evitar que el clic se propague al input
    setPanelOpen(!panelOpen);
  };

  const getSuggestions = async (query) => {
    if (query.length > 2) {
      // Solo realizar la búsqueda si el texto tiene más de 2 caracteres
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
          {
            params: {
              input: query,
              key: GOOGLE_MAPS_API_KEY,
              language: "es", // Puedes ajustar el idioma de las sugerencias
            },
          }
        );
        setSuggestions(response.data.predictions); // Guardar las sugerencias
      } catch (error) {
        console.error("Error al obtener las sugerencias:", error);
      }
    } else {
      setSuggestions([]); // Limpiar sugerencias si el campo de búsqueda está vacío o tiene menos de 3 caracteres
    }
  };

  const getCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: address,
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );
      const location = response.data.results[0]?.geometry?.location;
      if (location) {
        setDestination({
          latitude: location.lat,
          longitude: location.lng,
        }); // Pasar las coordenadas a la prop setDestination
      }
    } catch (error) {
      alert("Error al obtener las coordenadas:", error);
    }
  };
  useEffect(() => {
    if (query) {
      getSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);
  const GOOGLE_MAPS_API_KEY = "AIzaSyD4ZYfbcWceAE9FEXWU4pBq-K4Ys9s0idM";

  const fetchNearbyPlaces = async () => {
    try {
      const { latitude, longitude } = location;
      const radius = 1000; // Radio de búsqueda (en metros)
      const placesTypes = ["hospital", "police", "pharmacy"]; // Tipos de lugares que deseas buscar
      let allPlaces = [];

      for (const type of placesTypes) {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`;

        const response = await axios.get(url);
        allPlaces = [...allPlaces, ...response.data.results];
      }

      setPlaces(allPlaces);
    } catch (error) {
      console.error(error);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [vehicleType, setVehicleType] = useState("car");

  const { userData } = useUserStore();
  useEffect(() => {
    getLocationAsync();
    if (userData === null) {
      route.push("/loginScreen");
    }
  }, []);

  const [keyboardView, setKeyboardView] = useState(true);
  useEffect(() => {
    if (keyboardView) {
      setSuggestions([]);
    }
  }, [keyboardView]);

  return (
    <View style={styles.container}>
      {GPSPress ? <GPSAlert /> : null}
      <StatusBar backgroundColor="#000" />
      {openModal ? (
        <ModalRuta
          vehicleType={vehicleType}
          setOpenModal={setOpenModal}
          setDestination={setDestination}
          setVehicleType={setVehicleType}
          destination={destination}
          location={location}
        />
      ) : null}

      <Map
        places={places}
        destination={destination}
        location={location}
        setLocation={setLocation}
        mapRef={mapRef}
        setPanelOpen={setPanelOpen}
      />
      <Panel isOpen={panelOpen} togglePanel={() => setPanelOpen(!panelOpen)} />

      <View style={styles.header} id="Search bar">
        <View style={styles.inputContainer}>
          <Image source={icon} style={styles.icon} />
          <TouchableOpacity
            style={styles.menuboxleft}
            onPress={handleMenuClick} // Abrir o cerrar el menú al hacer clic
          >
            <Image source={menu} style={styles.menuIconLeft} />
          </TouchableOpacity>
          <TextInput
            placeholder="Ingresa una dirección"
            style={styles.buscadorDireccion}
            onFocus={() => setKeyboardView(false)}
            onBlur={() => setKeyboardView(true)}
            onChangeText={(text) => setQuery(text)}
          />
          <Image source={search} style={styles.menuIconRight} />
        </View>
      </View>
      {/* Mostrar las sugerencias de lugares si existen */}

      <View
        style={{
          position: "absolute",
          width: "100%",
          top: 80,
          zIndex: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setQuery(item.description); // Establecer la dirección seleccionada
                  setSuggestions([]); // Limpiar sugerencias después de seleccionar
                  getCoordinates(item.description); // Obtener las coordenadas del destino seleccionado
                  setOpenModal(false); // Cerrar el modal
                }}
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  borderBottomColor: "#ccc",
                }}
              >
                <Text style={{ color: "black" }}>{item.description}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.place_id}
            style={{
              width: "80%",
              backgroundColor: "#00120B",
              borderRadius: 10,
              marginTop: 10,
              maxHeight: 200, // Limitar la altura de la lista
            }}
          />
        )}
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          <Text
            style={{
              color: "#31E981",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            Ubicado en:
          </Text>{" "}
          {address ? address : `${location.latitude}, ${location.longitude}`}
        </Text>
      </View>

      {keyboardView ? (
        <>
          <View style={styles.buttonContainerLeft}>
            <TouchableOpacity
              style={[styles.botonesLeft, hoverGPS && styles.botonHover]}
              onPressIn={() => setHoverGPS(true)}
              onPressOut={() => setHoverGPS(false)}
              onPress={getLocationAsync} // Ejecutar la función al presionar el botón
            >
              <Ionicons name="locate-sharp" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.botonesLeft,
                hoverIndicaciones && styles.botonHover,
              ]}
              onPressIn={() => setHoverIndicaciones(true)}
              onPressOut={() => setHoverIndicaciones(false)}
              onPress={() => setOpenModal(true)}
            >
              <FontAwesome6 name="road" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainerRight}>
            <TouchableOpacity
              style={[styles.botonesLeft, hoverStar && styles.botonHover]}
              onPressIn={() => setHoverStar(true)}
              onPressOut={() => setHoverStar(false)}
            >
              <FontAwesome name="star" size={30} color="#31E981" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botonesLeft, hoverChat && styles.botonHover]}
              onPressIn={() => setHoverChat(true)}
              onPressOut={() => setHoverChat(false)}
              onPress={() => route.push("/chat")}
            >
              <Ionicons name="chatbubbles" size={30} color="#31E981" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botonesLeft, hoverHomeSafe && styles.botonHover]}
              onPressIn={() => setHoverHomeSafe(true)}
              onPressOut={() => setHoverHomeSafe(false)}
              onPress={fetchNearbyPlaces} // Llamar la función al presionar el botón
            >
              <FontAwesome6 name="house-lock" size={30} color="#31E981" />
            </TouchableOpacity>
          </View>
          <View
            style={[styles.sirenButton, hoverSiren && styles.sirenButtonHover]}
          >
            <TouchableOpacity
              onPressIn={() => setHoverSiren(true)}
              onPressOut={() => setHoverSiren(false)}
            >
              <Image source={Siren} style={styles.iconSize} />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 27,
    paddingHorizontal: 20,
  },
  icon: {
    width: 35,
    height: 35,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,

    flex: 1,
    gap: 16,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 16,
    borderColor: "#000",
    borderWidth: 1,
  },
  menuIconLeft: {
    width: 20,
    height: 20,
    zIndex: 10,
  },

  menuIconRight: {
    width: 20,
    height: 20,
    zIndex: 10,
  },
  buscadorDireccion: {
    flex: 1,
    borderColor: "#000",
    textAlign: "center",
    height: 50,
  },
  locationContainer: {
    marginTop: 56,
    height: 50,
    width: "100%",
    textAlign: "start",
  },
  locationText: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    padding: 10,
    backgroundColor: "#00120B",
    color: "white",
    width: "70%",
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    fontSize: 10,
  },
  buttonContainerLeft: {
    position: "absolute",
    bottom: 200,
    left: 20,
    display: "flex",
    gap: 26,
  },
  buttonContainerRight: {
    position: "absolute",
    bottom: 200,
    right: 20,
    display: "flex",
    gap: 26,
  },
  botonesLeft: {
    width: 62,
    height: 62,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  iconSize: {
    width: 50,
    height: 50,
  },
  botonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  sirenButton: {
    backgroundColor: "red",
    position: "absolute",
    bottom: 50,
    borderRadius: 50,
    padding: 20,
    shadowColor: "red",
    shadowColor: "#f00",
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 26.0,

    elevation: 24,
  },
  sirenButtonHover: {
    shadowColor: "red",
    shadowOffset: { width: 0, height: 15 }, // Ajustar el desplazamiento de la sombra
    shadowOpacity: 1, // Sombra más fuerte cuando está en hover
    shadowRadius: 30, // Aumentar el radio de la sombra
    elevation: 15, // Aumentar la elevación al estado hover
  },
});
