import { useEffect, useState } from "react";
import { Button } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router"; // Importamos useRouter para la navegación
import { useUserStore } from "../store/store";

const icon = require("../assets/safegoIcon.png");
const light = require("../assets/Idea.png");
const night = require("../assets/Fog.png");
const Settings = require("../assets/Settings.png");

const Facebook = require("../assets/Facebook.png");
const Twitter = require("../assets/Twitter.png");
const Instagram = require("../assets/Instagram.png");
const Tiktok = require("../assets/TikTok.png");

export default function Panel({ isOpen, togglePanel }) {
  const [selectedIndex, setSelectedIndex] = useState(null); // Estado para la opción seleccionada
  const router = useRouter(); // Instanciamos el hook useRouter
  const opts = [
    { text: "Comunidades", route: "/community" },
    { text: "Chat ", route: "/chat" },
    { text: "Seguimiento ", route: "/tracking" },
    { text: "Telefonos de emergencia ", route: "/emergency" },
    { text: "Tutorial de uso ", route: "/tutorial" },
    { text: "Noticias", route: "/news" },
  ];

  const handlePress = (index, route) => {
    setSelectedIndex(index); // Actualiza el índice de la opción seleccionada
    router.push(route); // Navega a la ruta seleccionada usando Expo Router
  };

  const { clearUser } = useUserStore();

  return (
    <View style={[styles.container, isOpen ? styles.containerOpen : null]}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={icon} style={styles.icon} />
        <Text style={{ fontSize: 32, marginLeft: 10 }}>SafeGo </Text>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 24,
          fontWeight: "bold",
        }}
      >
        Bienvenido
      </Text>
      <View
        style={{
          gap: 10,
          marginTop: 40,
          alignItems: "start",
        }}
      >
        {opts.map((opt, index) => (
          <Text
            key={index}
            onPress={() => handlePress(index, opt.route)} // Llamamos a handlePress con la ruta correspondiente
            style={[
              styles.opts,
              selectedIndex === index ? styles.textPressed : null, // Aplica el estilo cuando se selecciona
            ]}
          >
            {opt.text}
          </Text>
        ))}
      </View>
      <Text
        style={{
          marginTop: 20,
          fontSize: 14,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Estado del usuario
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            backgroundColor: "#fff",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderRadius: 10,
            overflow: "hidden",
            height: 44,
            width: 150,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              flex: 1,
            }}
          >
            <Image source={light} style={{ width: 31, height: "100%" }} />
          </View>
          <View
            style={{
              backgroundColor: "#000",
              display: "flex",
              alignItems: "center",
              padding: 5,
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Image source={night} style={{ width: 31, height: "100%" }} />
          </View>
        </View>
        <Image source={Settings} style={{ width: 30, height: 30 }} />
      </View>
      <View
        style={{
          width: 150,
          marginTop: 50,
          marginBottom: 20,
          display: "flex",
          marginHorizontal: "auto",
        }}
      >
        <Button
          title="Cerrar sesión"
          color={"red"}
          style={styles.button}
          onPress={() => {
            clearUser();
            router.push("/loginScreen");
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image source={Facebook} style={{ width: 30, height: 30 }} />
        <Image source={Twitter} style={{ width: 30, height: 30 }} />
        <Image source={Instagram} style={{ width: 30, height: 30 }} />
        <Image source={Tiktok} style={{ width: 30, height: 30 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingStart: 20,
    position: "absolute",
    width: "0%",
    top: 0,
    left: 0,
    height: "100%",
    zIndex: 10,
    display: "none",
  },
  containerOpen: {
    width: "70%",
    display: "flex",
  },
  icon: {
    height: 61,
    width: 61,
  },
  opts: {
    fontSize: 18,
    marginBottom: 10,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignSelf: "flex-start",
  },
  textPressed: {
    color: "#31E981", // Color verde para indicar selección
    fontWeight: "bold",
    transform: [
      { scale: 1.1 }, // Efecto de escala
      { translateX: 5 }, // Desplazamiento a la derecha
    ],
    borderBottomColor: "#31E981", // Color del borde inferior cuando está seleccionado
    borderBottomWidth: 2, // Agrega un grosor de borde para verlo mejor
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%", // Asegura que el botón se adapte al tamaño del contenedor
  },
});
