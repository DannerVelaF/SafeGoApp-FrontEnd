import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import * as Location from "expo-location";
import MapView from "react-native-maps";

const icon = require("./assets/safegoIcon.png");
const menu = require("./assets/Menu.png");
const search = require("./assets/Search.png");
const Indicaciones = require("./assets/Indicaciones.png");
const GPS = require("./assets/GPS.png");

const Star = require("./assets/Star.png");
const Chat = require("./assets/Chat.png");
const HomeSafe = require("./assets/HomeSafe.png");

const Siren = require("./assets/Siren.png");

export default function App() {
  const [hoverGPS, setHoverGPS] = useState(false);
  const [hoverIndicaciones, setHoverIndicaciones] = useState(false);
  const [hoverHomeSafe, setHoverHomeSafe] = useState(false);
  const [hoverChat, setHoverChat] = useState(false);
  const [hoverStar, setHoverStar] = useState(false);
  const [hoverSiren, setHoverSiren] = useState(false); // Agregar estado para la sirena

  // Estados para la ubicación del usuario
  const [location, setLocation] = useState({
    latitude: -6.77137,
    longitude: -79.84088,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {}, []);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <MapView style={styles.map} initialRegion={location} />
      <View style={styles.header} id="Search bar">
        <Image source={icon} style={styles.icon} />
        <View style={styles.inputContainer}>
          <Image source={menu} style={styles.menuIconLeft} />
          <TextInput
            placeholder="Ingresa tu dirección"
            style={styles.buscadorDireccion}
          />
          <Image source={search} style={styles.menuIconRight} />
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Ubicado en: Direccion actual</Text>
      </View>

      <View style={styles.buttonContainerLeft}>
        <TouchableOpacity
          style={[styles.botonesLeft, hoverGPS && styles.botonHover]}
          onPressIn={() => setHoverGPS(true)}
          onPressOut={() => setHoverGPS(false)}
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
          onPressIn={() => setHoverSiren(true)} // Activar hover al presionar
          onPressOut={() => setHoverSiren(false)} // Desactivar hover al soltar
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

  // Estilo del botón de la sirena
  sirenButton: {
    backgroundColor: "red",
    position: "absolute",
    bottom: 50,
    borderRadius: 50,
    padding: 20,
  },
  sirenButtonHover: {
    shadowColor: "red", // Establece el color de la sombra a rojo
    shadowOffset: { width: 0, height: 10 }, // Desplazamiento de la sombra
    shadowOpacity: 0.8, // Opacidad de la sombra
    shadowRadius: 10, // Radio de la sombra
    elevation: 10, // Elevación para Android
  },
});
