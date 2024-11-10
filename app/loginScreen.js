// src/LoginScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router"; // Importa el hook useRouter
import api from "../service/api";
import { useUserStore } from "../store/store";

export default function LoginScreen() {
  const [isChecked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para alternar visibilidad de la contraseña
  const router = useRouter();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const { setUser, userData } = useUserStore();
  useEffect(() => {
    if (userData !== null) {
      router.push("/home");
    }
  }, [userData]);
  const handleSubmit = async () => {
    if (!data.username || !data.password) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await api.loginUser(data);
      alert("Inicio de sesión exitoso");
      setUser(response);
      router.push("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:");
      alert(
        "Error al iniciar sesión: " + (error.response?.data || error.message)
      );
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Login.png")}
      style={styles.background}
    >
      <StatusBar animated={true} backgroundColor="#00120B" barStyle="dark" />
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Tu seguridad, nuestra prioridad </Text>

          <View style={styles.inputGroup}>
            <FontAwesome
              name="user"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Usuario"
              onChangeText={(text) =>
                setData((prevData) => ({ ...prevData, username: text }))
              }
            />
          </View>
          <View style={styles.inputGroup}>
            <FontAwesome
              name="lock"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!passwordVisible} // Cambia el estado según `passwordVisible`
              onChangeText={(text) =>
                setData((prevData) => ({ ...prevData, password: text }))
              }
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <FontAwesome
                name={passwordVisible ? "eye" : "eye-slash"}
                size={20}
                color="#666"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.options}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                tintColors={{ true: "#66bb6a", false: "#ccc" }}
              />
              <Text style={styles.checkboxLabel}>Recordarme </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>
                {" "}
                ¿Olvidaste tu contraseña?{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => router.push("/registerScreen")}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                borderBottomColor: "#000",
                borderBottomWidth: 1,
              }}
            >
              No estas registrado? Registrate aqui!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  forgotPassword: {
    fontSize: 10,
    color: "#66bb6a",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    backgroundColor: "white",
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    color: "#000",
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});
