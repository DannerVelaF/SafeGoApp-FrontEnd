import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import api from "../service/api";
import { useUserStore } from "../store/store";
import { useRouter } from "expo-router"; // Importa el hook useRouter
const backArrow = require("../assets/BackArrow.png");

export default function RegisterScreen() {
  const [isChecked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("CITIZEN");
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "",
    firstName: "",
    lastName: "",
    dni: "",
    address: "",
  });
  const { setUser } = useUserStore(); // Desestructura el store
  const router = useRouter(); // Importa el hook useRouter
  const handleSubmit = async () => {
    if (
      !data.username ||
      !data.password ||
      !data.email ||
      !data.phone ||
      !data.firstName ||
      !data.lastName ||
      !data.dni
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const userData = {
      username: data.username,
      password: data.password,
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      dni: data.dni,
      address: data.address,
      role: selectedRole, // Agregar el rol seleccionado
    };

    try {
      const response = await api.registerUser(userData); // Enviar JSON directamente
      alert("Registro exitoso");
      setUser(response); // Almacenar la información del usuario en el store
      router.push("/home"); // Navegar a la página de inicio
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert(
        "Error al registrar usuario: " +
          (error.response?.data || error.message || "Error desconocido")
      );
    }
  };
  const { userData } = useUserStore();
  useEffect(() => {
    if (userData !== null) {
      router.push("/home");
    }
  }, [userData]);
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#00120B" barStyle="dark" />
      <View style={styles.loginBox}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 50,
          }}
          onPress={() => router.push("/")}
        >
          <Image source={backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>Registrarse</Text>
        <Text style={styles.subtitle}>Ingresa tus datos</Text>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Nombres"
              onChangeText={(text) => setData({ ...data, firstName: text })}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Apellidos"
              onChangeText={(text) => setData({ ...data, lastName: text })}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <FontAwesome
              name="phone"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              maxLength={9}
              placeholder="Teléfono"
              onChangeText={(text) => setData({ ...data, phone: text })}
            />
          </View>
          <View style={styles.inputGroup}>
            <FontAwesome
              name="file"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="DNI"
              maxLength={8}
              onChangeText={(text) => setData({ ...data, dni: text })}
            />
          </View>
        </View>

        <View style={styles.singleInput}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            onChangeText={(text) => setData({ ...data, email: text })}
          />
        </View>

        <View style={styles.singleInput}>
          <TextInput
            style={styles.input}
            placeholder="Distrito/Ciudad/Calle y número"
            onChangeText={(text) => setData({ ...data, address: text })}
          />
        </View>

        <View style={styles.singleInput}>
          <FontAwesome name="user" size={20} color="#666" style={styles.icon} />

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            onChangeText={(text) => setData({ ...data, username: text })}
          />
        </View>

        <View style={styles.singleInput}>
          <FontAwesome name="lock" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            onChangeText={(text) => setData({ ...data, password: text })}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <FontAwesome
              name={passwordVisible ? "eye-slash" : "eye"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onPress={() => setChecked(!isChecked)}
            onValueChange={setChecked}
            tintColors={{ true: "#66bb6a", false: "#ccc" }}
          />
          <Text style={styles.checkboxLabel}>
            Acepto las políticas de privacidad{" "}
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/loginScreen")}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: "bold",
              borderBottomColor: "#000",
              borderBottomWidth: 1,
              alignSelf: "center",
            }}
          >
            Ya estas registrado? Inicia sesión aquí!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            !isChecked && styles.buttonDisabled, // Aplica el estilo de deshabilitado
          ]}
          onPress={handleSubmit}
          disabled={!isChecked} // Deshabilita el botón si el checkbox no está marcado
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.registerMessage}>
        {" "}
        Regístrate y mantente alerta.{" "}
      </Text>

      <View style={styles.socialMedia}>
        <FontAwesome
          name="facebook"
          size={24}
          color="#31E981"
          style={styles.socialIcon}
        />
        <FontAwesome
          name="twitter"
          size={24}
          color="#31E981"
          style={styles.socialIcon}
        />
        <FontAwesome
          name="instagram"
          size={24}
          color="#31E981"
          style={styles.socialIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: "#ccc", // Color gris para el botón deshabilitado
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00120B",
  },
  loginBox: {
    backgroundColor: "white",
    width: 350,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 50,
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    color: "#35605A",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "49%",
  },

  inputGroupPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "49%",
    backgroundColor: "#00120B",
  },

  pickerItem: {
    fontSize: 12, // Ajusta el tamaño aquí si es necesario
    color: "#fff",
    backgroundColor: "#00120B",
  },
  singleInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    textAlign: "left",
    fontSize: 14, // Ajusta el tamaño aquí también si es necesario
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 13,
    color: "#666",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#00120B",
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
  registerMessage: {
    fontSize: 15,
    color: "#31E981",
    textAlign: "center",
  },
  socialMedia: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});
