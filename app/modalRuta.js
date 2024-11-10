import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importar FontAwesome
import axios from "axios"; // Para hacer solicitudes HTTP
import calculateDuration from "../service/calculatedTime";
const location = require("../assets/Location.png");
const clock = require("../assets/Clock.png");
const close = require("../assets/Close.png");
export default function ModalRuta({
  setOpenModal,
  setDestination,
  vehicleType,
  setVehicleType,

  location,
}) {
  // Función para manejar la selección de transporte
  const handleTransportSelect = (transport) => {
    if (vehicleType === transport) {
      setVehicleType(null); // Desmarcar si el mismo ícono es tocado
    } else {
      setVehicleType(transport); // Marcar el ícono seleccionado
    }
  };
  const GOOGLE_MAPS_API_KEY = "AIzaSyD4ZYfbcWceAE9FEXWU4pBq-K4Ys9s0idM";
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [latLng, setLatLng] = useState({
    latitude: 0,
    longitude: 0,
  });

  // Función para obtener las sugerencias de Google Places
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

  // Obtener las coordenadas del destino seleccionado usando la API de Geocoding
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
        setLatLng({
          latitude: location.lat,
          longitude: location.lng,
        }); // Establecer latitud y longitud del destino
        setDestination({
          latitude: location.lat,
          longitude: location.lng,
        }); // Pasar las coordenadas a la prop setDestination
        
      }
    } catch (error) {
      console.error("Error al obtener las coordenadas:", error);
    }
  };

  useEffect(() => {
    if (query) {
      getSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(29, 31, 30, 0.7)", // Fondo semitransparente
        justifyContent: "center", // Centrado vertical
        alignItems: "center", // Centrado horizontal
        zIndex: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "#00120B",
          width: "74%",
          paddingVertical: 39,
          paddingHorizontal: 20,
          alignItems: "center",
          gap: 10,
          borderRadius: 10,
          position: "relative",
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 10 }}
          onPress={() => setOpenModal(false)}
        >
          <Image source={close} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          Iniciar Ruta
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 43,
            marginBottom: 20,
          }}
        >
          <Image source={location} style={{ width: 30, height: 30 }} />
          <TextInput
            placeholder="Dirección"
            onChangeText={(text) => setQuery(text)}
            style={{
              borderColor: "white",
              backgroundColor: "white",
              borderWidth: 1,
              fontSize: 12,
              borderRadius: 10,
              paddingHorizontal: 5,
              paddingVertical: 2,
              width: "80%",
            }}
          />
        </View>

        {/* Mostrar las sugerencias de lugares si existen */}
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
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 1,
                }}
              >
                <Text style={{ color: "white" }}>{item.description}</Text>
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

        {/* Sección con íconos y botón */}
        <View
          style={{
            display: "flex",
            marginTop: 27,
            backgroundColor: "#455A64",
            borderRadius: 20,
            alignItems: "center",
            width: "80%",
          }}
        >
          {/* Íconos para cada tipo de transporte */}
          <View style={{ display: "flex", flexDirection: "row" }}>
            {/* Carro */}
            <TouchableOpacity
              onPress={() => handleTransportSelect("car")}
              style={{
                backgroundColor: vehicleType === "car" ? "black" : "white", // Fondo dinámico
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                width: "25%",
              }}
            >
              <Icon
                name="car"
                size={20}
                color={vehicleType === "car" ? "white" : "black"}
              />
            </TouchableOpacity>

            {/* Moto */}
            <TouchableOpacity
              onPress={() => handleTransportSelect("motorcycle")}
              style={{
                backgroundColor:
                  vehicleType === "motorcycle" ? "black" : "white", // Fondo dinámico
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                width: "25%",
              }}
            >
              <Icon
                name="motorcycle"
                size={20}
                color={vehicleType === "motorcycle" ? "white" : "black"}
              />
            </TouchableOpacity>

            {/* Bus */}
            <TouchableOpacity
              onPress={() => handleTransportSelect("bus")}
              style={{
                backgroundColor: vehicleType === "bus" ? "black" : "white", // Fondo dinámico
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                width: "25%",
              }}
            >
              <Icon
                name="bus"
                size={20}
                color={vehicleType === "bus" ? "white" : "black"}
              />
            </TouchableOpacity>

            {/* A pie */}
            <TouchableOpacity
              onPress={() => handleTransportSelect("person-walking")}
              style={{
                backgroundColor:
                  vehicleType === "person-walking" ? "black" : "white", // Fondo dinámico
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                width: "25%",
              }}
            >
              <FontAwesome6
                name="person-walking"
                size={20}
                color={vehicleType === "person-walking" ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Image source={clock} style={{ width: 30, height: 30 }} />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            Sin actividad reciente
          </Text>
        </View>

        <View>
          <Text
            style={{
              color: "#31E981",
              marginTop: 20,
            }}
          >
            Mas elementos recientes
          </Text>
        </View>
      </View>
    </View>
  );
}
