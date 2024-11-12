import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

// Imágenes
const imagen1 = require("../assets/tutorial/1.png");
const imagen2 = require("../assets/tutorial/2.png");
const imagen3 = require("../assets/tutorial/3.png");
const imagen4 = require("../assets/tutorial/4.png");
const imagen5 = require("../assets/tutorial/5.png");
const imagen6 = require("../assets/tutorial/6.png");
// const imagen7 = require("../assets/tutorial/7.png");
const puntoHueco = require("../assets/tutorial/puntoHueco.png");
const puntoLleno = require("../assets/tutorial/puntoLleno.png");

import { useUserStore } from "../store/store";

export default function Tutorial() {
  const [imagen, setImagen] = useState(imagen1); // Inicializamos con la primera imagen
  const [indiceImagen, setIndiceImagen] = useState(0); // Índice para controlar la imagen actual
  const router = useRouter();

  // Lista de imágenes
  const imagenes = [
    imagen1,
    imagen2,
    imagen3,
    imagen4,
    imagen5,
    imagen6,
    // imagen7,
  ];
  const { userData } = useUserStore();
  useEffect(() => {
    if (userData === null) {
      route.push("/loginScreen");
    }
  }, []);
  // Función para ir a la siguiente imagen
  const siguienteImagen = () => {
    if (indiceImagen < imagenes.length - 1) {
      setIndiceImagen(indiceImagen + 1);
      setImagen(imagenes[indiceImagen + 1]);
    } else {
      // Si llega a la última imagen, se puede redirigir a otra pantalla o reiniciar
      router.push("/home");
    }
  };

  // Función para cambiar los puntos según la imagen actual
  const renderPuntos = () => {
    return imagenes.map((_, index) => (
      <Image
        key={index}
        source={index === indiceImagen ? puntoLleno : puntoHueco} // Cambia el punto según la imagen actual
        style={{
          width: 10,
          height: 10,
          marginHorizontal: 5,
          marginBottom: 20,
        }}
      />
    ));
  };

  return (
    <View style={{ display: "flex", flex: 1 }}>
      <StatusBar backgroundColor="#000" />
      <View style={{ position: "relative", flex: 1 }}>
        {/* Muestra la imagen actual */}
        <Image source={imagen} style={{ width: "100%", height: "100%" }} />

        {/* Texto "Saltar" */}
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Text
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Saltar
          </Text>
        </TouchableOpacity>

        {/* Botón "Siguiente" */}
        <TouchableOpacity onPress={siguienteImagen}>
          <Text
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Siguiente
          </Text>
        </TouchableOpacity>

        {/* Puntos abajo de la imagen */}
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: "45%",
            transform: [{ translateX: -50 }],
            flexDirection: "row",
          }}
        >
          {renderPuntos()}
        </View>
      </View>
    </View>
  );
}
