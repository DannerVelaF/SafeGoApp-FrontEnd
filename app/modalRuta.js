import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TextInput, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importar FontAwesome

const location = require("../assets/Location.png");
const clock = require("../assets/Clock.png");
const close = require("../assets/Close.png");
export default function ModalRuta({ setOpenModal }) {
  const [transportSelected, setTransportSelected] = useState("car"); // Estado para la selección del transporte

  // Función para manejar la selección de transporte
  const handleTransportSelect = (transport) => {
    if (transportSelected === transport) {
      setTransportSelected(null); // Desmarcar si el mismo ícono es tocado
    } else {
      setTransportSelected(transport); // Marcar el ícono seleccionado
    }
  };

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
                backgroundColor:
                  transportSelected === "car" ? "black" : "white", // Fondo dinámico
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
                color={transportSelected === "car" ? "white" : "black"}
              />
            </TouchableOpacity>

            {/* Moto */}
            <TouchableOpacity
              onPress={() => handleTransportSelect("motorcycle")}
              style={{
                backgroundColor:
                  transportSelected === "motorcycle" ? "black" : "white", // Fondo dinámico
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                width: "25%",
              }}
            >
              <Icon
                name="motorcycle"
                size={20}
                color={transportSelected === "motorcycle" ? "white" : "black"}
              />
            </TouchableOpacity>

            {/* Bus */}
            <TouchableOpacity
              onPress={() => handleTransportSelect("bus")}
              style={{
                backgroundColor:
                  transportSelected === "bus" ? "black" : "white", // Fondo dinámico
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                width: "25%",
              }}
            >
              <Icon
                name="bus"
                size={20}
                color={transportSelected === "bus" ? "white" : "black"}
              />
            </TouchableOpacity>

            {/* A pie */}
            <TouchableOpacity
              onPress={() => handleTransportSelect("person-walking")}
              style={{
                backgroundColor:
                  transportSelected === "person-walking" ? "black" : "white", // Fondo dinámico
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
                color={
                  transportSelected === "person-walking" ? "white" : "black"
                }
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
