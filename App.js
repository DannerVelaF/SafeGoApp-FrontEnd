import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import RegisterScreen from "./components/RegisterScreen";

import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const icon = require("./assets/safegoIcon.png");
const menu = require("./assets/Menu.png");
const search = require("./assets/Search.png");
const Indicaciones = require("./assets/Indicaciones.png");
const GPS = require("./assets/GPS.png");
const Star = require("./assets/Star.png");
const Chat = require("./assets/Chat.png");
const HomeSafe = require("./assets/HomeSafe.png");
const Siren = require("./assets/Siren.png");
import Panel from "./components/Panel";

export default function App() {
  const [hoverGPS, setHoverGPS] = useState(false);
  const [hoverIndicaciones, setHoverIndicaciones] = useState(false);
  const [hoverHomeSafe, setHoverHomeSafe] = useState(false);
  const [hoverChat, setHoverChat] = useState(false);
  const [hoverStar, setHoverStar] = useState(false);
  const [hoverSiren, setHoverSiren] = useState(false);

  const [location, setLocation] = useState({
    latitude: -6.77137,
    longitude: -79.84088,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Referencia al MapView para centrar el mapa
  const mapRef = useRef(null);
  const [address, setAddress] = useState(""); // Estado para almacenar la dirección

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
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
  const [panelOpen, setPanelOpen] = useState(false); // Estado para controlar si el panel está abierto o cerrado
  const handleMenuClick = (e) => {
    e.stopPropagation(); // Evitar que el clic se propague al input
    setPanelOpen(!panelOpen);
  };
  return (

    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <MapView
        ref={mapRef} // Asigna la referencia al MapView
        style={styles.map}
        initialRegion={location}
        onPress={() => setPanelOpen(false)}
      >
        <Marker
          draggable
          coordinate={location}
          onDragEnd={(direction) =>
            setLocation(direction.nativeEvent.coordinate)
          }
        />
      </MapView>
      <Panel isOpen={panelOpen} togglePanel={() => setPanelOpen(!panelOpen)} />

      <View style={styles.header} id="Search bar">
        <Image source={icon} style={styles.icon} />
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.menuboxleft}
            onPress={handleMenuClick} // Abrir o cerrar el menú al hacer clic
          >
            <Image source={menu} style={styles.menuIconLeft} />
          </TouchableOpacity>
          <TextInput
            placeholder="Ingresa una dirección"
            style={styles.buscadorDireccion}
          />
          <Image source={search} style={styles.menuIconRight} />
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          Ubicado en:{" "}
          {address ? address : `${location.latitude}, ${location.longitude}`}
        </Text>
      </View>

      <View style={styles.buttonContainerLeft}>
        <TouchableOpacity
          style={[styles.botonesLeft, hoverGPS && styles.botonHover]}
          onPressIn={() => setHoverGPS(true)}
          onPressOut={() => setHoverGPS(false)}
          onPress={getLocationAsync} // Ejecutar la función al presionar el botón
        >
          <Image source={GPS} style={styles.iconSize} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botonesLeft, hoverIndicaciones && styles.botonHover]}
          onPressIn={() => setHoverIndicaciones(true)}
          onPressOut={() => setHoverIndicaciones(false)}
        >
          <Image source={Indicaciones} style={styles.iconSize} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainerRight}>
        <TouchableOpacity
          style={[styles.botonesLeft, hoverStar && styles.botonHover]}
          onPressIn={() => setHoverStar(true)}
          onPressOut={() => setHoverStar(false)}
        >
          <Image source={Star} style={styles.iconSize} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botonesLeft, hoverChat && styles.botonHover]}
          onPressIn={() => setHoverChat(true)}
          onPressOut={() => setHoverChat(false)}
        >
          <Image source={Chat} style={styles.iconSize} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botonesLeft, hoverHomeSafe && styles.botonHover]}
          onPressIn={() => setHoverHomeSafe(true)}
          onPressOut={() => setHoverHomeSafe(false)}
        >
          <Image source={HomeSafe} style={styles.iconSize} />
        </TouchableOpacity>
      </View>
      <View style={[styles.sirenButton, hoverSiren && styles.sirenButtonHover]}>
        <TouchableOpacity
          onPressIn={() => setHoverSiren(true)}
          onPressOut={() => setHoverSiren(false)}
        >
          <Image source={Siren} style={styles.iconSize} />
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: 57,
    paddingHorizontal: 16,
  },
  icon: {
    width: 48,
    height: 48,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  menuIconLeft: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 10,
    zIndex: 10,
  },
  menuboxleft: {
    width: "15%",
    height: "100%",
    position: "absolute",
    left: 10,
    zIndex: 10,
    display: "flex",
    marginStart: -10,
    justifyContent: "center",
  },
  menuIconRight: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 10,
    zIndex: 10,
  },
  buscadorDireccion: {
    flex: 1,
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 8,
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
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
  },
  sirenButtonHover: {
    shadowColor: "red",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
});
