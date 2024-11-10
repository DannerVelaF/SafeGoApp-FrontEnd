import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router"; // Importa el hook useRouter

export default function Index() {
  const [isChecked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Vecino");

  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00120B"  barStyle="dark" />
      <View style={styles.loginBox}>
        <Text style={styles.title}>
          Safe<Text style={styles.go}>GO</Text>{" "}
        </Text>
        <Text style={styles.subtitle}>Tu seguridad, nuestra prioridad! </Text>
      </View>
      <View style={styles.containerBottom}>
        <ImageBackground
          source={require("../assets/home.png")}
          style={styles.background}
        >
          <View style={styles.overlay} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                router.push("/loginScreen");
              }}
            >
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿Aún no tienes cuenta? </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/registerScreen");
                }}
              >
                <Text style={styles.registerLink}> Registrate </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({


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
    backgroundColor: "#00120B",
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
