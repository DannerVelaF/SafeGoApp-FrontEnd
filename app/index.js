import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";
import { useRouter } from "expo-router"; // Importa el hook useRouter
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useLanguageStore } from "../store/store";
import { translations } from "../util/translations";
const internet = require("../assets/internet.png");
export default function Index() {
  const [isChecked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showlang, setShowlang] = useState(false);
  const [pressedLang, setPressedLang] = useState(null); // Estado para rastrear el idioma presionado

  const router = useRouter();

  const { languageData, setLanguage } = useLanguageStore();
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/home.png")}
    >
      <StatusBar backgroundColor="#00120B" barStyle="dark" />

      <View style={styles.loginBox}>
        <Text style={styles.title}>
          Safe<Text style={styles.go}>GO</Text>{" "}
        </Text>
        <Text style={styles.subtitle}>
          {translations[languageData].subtitle}
        </Text>
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.overlay} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              router.push("/home");
            }}
          >
            <Text style={styles.loginButtonText}>
              {translations[languageData].loginButtonText}
            </Text>
          </TouchableOpacity>

          {showlang && (
            <View
              style={{
                backgroundColor: "white",
                position: "absolute",
                bottom: 100,
                right: 20,
                padding: 5,
                height: 100,
                width: 40,
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPressIn={() => setPressedLang("es")}
                onPressOut={() => setPressedLang(null)}
                onPress={() => {
                  setLanguage("es");
                  setShowlang(false);
                }}
              >
                <Text
                  style={[
                    styles.normalText,
                    pressedLang === "es" && styles.pressedText,
                  ]}
                >
                  Es
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPressIn={() => setPressedLang("qu")}
                onPressOut={() => setPressedLang(null)}
                onPress={() => {
                  setLanguage("qu");
                  setShowlang(false);
                }}
              >
                <Text
                  style={[
                    styles.normalText,
                    pressedLang === "qu" && styles.pressedText,
                  ]}
                >
                  Qu
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 20,
              right: 25,
            }}
            onPress={() => setShowlang(!showlang)}
          >
            <FontAwesome5 name="globe" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              {translations[languageData].registerText}
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/registerScreen");
              }}
            >
              <Text style={styles.registerLink}>
                {translations[languageData].registerLink}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  normalText: {
    fontWeight: "bold",
  },

  pressedText: {
    backgroundColor: "#66bb6a",
    color: "white",
  },

  subtitle: {
    fontSize: 15,
    color: "#66bb6a",
    textAlign: "center",
  },

  go: {
    color: "#66bb6a",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start", // Esto asegura que el contenido comienza en la parte superior
    alignItems: "center",
    backgroundColor: "#00120B",
  },
  containerBottom: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end", // Asegura que los elementos se coloquen al final de la pantalla
    alignItems: "center",
  },
  loginBox: {
    width: "100%",
    height: "15%",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  background: {
    flex: 1,
    resizeMode: "cover", // Ajusta la imagen de fondo a toda la pantalla
    width: "100%",
    height: "100%",
    justifyContent: "flex-end", // Esto asegura que los elementos (botón y texto) se alineen en la parte inferior
    alignItems: "center", // Centra los elementos dentro de la imagen
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Crea una capa oscura para mejorar la visibilidad de los botones
  },
  buttonsContainer: {
    justifyContent: "flex-end", // Alinea los elementos hacia la parte inferior
    alignItems: "center", // Alinea los elementos horizontalmente en el centro
    marginBottom: 30, // Da espacio desde el borde inferior
    width: "100%",
    paddingHorizontal: 20, // Añade algo de espacio horizontal para los botones
  },
  loginButton: {
    backgroundColor: "#66bb6a",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: "70%",
    marginBottom: 10, // Espacio entre los botones
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#00120B",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center", // Centra el texto de registro
  },
  registerText: {
    fontSize: 14,
    color: "#fff",
  },
  registerLink: {
    fontSize: 14,
    color: "#66bb6a", // Color verde
    textDecorationLine: "underline", // Subraya el texto para hacerlo un enlace
  },
});
