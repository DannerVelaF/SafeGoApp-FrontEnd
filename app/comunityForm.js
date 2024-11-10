import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker"; // Importa ImagePicker
import * as Location from "expo-location";
import api from "../service/api";
import { useUserStore } from "../store/store";
import { useRouter } from "expo-router";
const back = require("../assets/BackArrow.png");
const sinImagen = require("../assets/default.png");
const copy = require("../assets/copy.png");
const GPS = require("../assets/GPS.png");
export default function CommunityForm() {
  const [selectedRole, setSelectedRole] = useState("NEIGHBORS");
  const [image, setImage] = useState(sinImagen); // Estado para la imagen
  const [data, setData] = useState({
    name: "",
    type: selectedRole,
    description: "",
    phones: {
      phone1: "",
      phone2: "",
      phone3: "",
      phone4: "",
    },
    locationId: "", // Este campo debería definirse de alguna manera
  });

  // Función para seleccionar una imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri });
      setData((prevState) => ({
        ...prevState,
        imageUri: result.assets[0].uri, // Actualiza la URI de la imagen en el estado
      }));
    }
  };

  // Función para manejar el cambio en los campos de texto
  const handleInputChange = (name, value) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para manejar el cambio en los teléfonos
  const handlePhoneChange = (phoneKey, value) => {
    setData((prevState) => ({
      ...prevState,
      phones: {
        ...prevState.phones,
        [phoneKey]: value,
      },
    }));
  };
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: "", // Dirección solo con la ciudad
  });
  const [direccion, setDireccion] = useState("");

  // Obtener la ubicación del usuario y obtener la ciudad
  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const currentLocation = await Location.getCurrentPositionAsync({});
      const newLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setLocation(newLocation);

      const geocodedLocation = await Location.reverseGeocodeAsync({
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
      });

      if (geocodedLocation.length > 0) {
        const { city } = geocodedLocation[0];
        setLocation((prevState) => ({
          ...prevState,
          address: city,
        }));
      } else {
        setLocation((prevState) => ({
          ...prevState,
          address: "No se pudo obtener la ciudad",
        }));
      }
    } else {
      alert("Permiso de ubicación no concedido.");
    }
  };
  const { userData } = useUserStore();
  const { token, user } = userData;

  const handleSubmit = async () => {
    const locationData = {
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    };

    try {
      // Esperamos la respuesta de la API
      const locationResponse = await api.crearLocalidad(locationData, token);
      const locationId = locationResponse.id; // Obtener el ID de la localidad
      const communityData = {
        community: {
          name: data.name,
          type: data.type,
          description: data.description,
          phone1: data.phones.phone1,
          phone2: data.phones.phone2,
          phone3: data.phones.phone3,
          phone4: data.phones.phone4,
          locationId: locationId,
        },
        users: [user.userId],
      };
      const responseCommunity = await api.crearComuniad(communityData, token);
    } catch (error) {
      console.error("Error al crear la localidad:", error);
    }
  };
  
  const router = useRouter();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginVertical: 50, marginHorizontal: 30 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => router.push("/home")}
          >
            <Image source={back} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Crea tu propia <Text>{"\n"}</Text>comunidad
          </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TextInput
            placeholder="Nombre de la comunidad"
            style={{
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 5,
              width: "80%",
            }}
            value={data.name} // Asociar el valor al estado
            onChangeText={(text) => handleInputChange("name", text)} // Actualiza el estado cuando cambia el nombre
          />
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <View
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 100,
                overflow: "hidden",
                width: 100,
                height: 100,
              }}
            >
              <Image source={image} style={{ width: 100, height: 100 }} />
            </View>
            <View style={styles.inputGroupPicker}>
              <Picker
                selectedValue={selectedRole}
                style={styles.input}
                onValueChange={(itemValue) => {
                  setSelectedRole(itemValue);
                  setData((prevState) => ({ ...prevState, type: itemValue })); // Actualiza el tipo en el estado
                }}
                dropdownIconColor="#fff"
              >
                <Picker.Item
                  label="Vecinal"
                  value="NEIGHBORS"
                  style={styles.pickerItem}
                />
                <Picker.Item
                  label="Familiar"
                  value="FAMILY"
                  style={styles.pickerItem}
                />
                <Picker.Item
                  label="Distrito"
                  value="ZONE"
                  style={styles.pickerItem}
                />
              </Picker>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "flex-start",
              width: "50%",
            }}
          >
            <TextInput
              style={{
                height: 110,
                width: "80%",
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
              }}
              placeholder="Descripcion"
              placeholderTextColor="gray"
              multiline={true}
              value={data.description} // Asociar el valor al estado
              onChangeText={(text) => handleInputChange("description", text)} // Actualiza el estado cuando cambia la descripción
            />
            <TouchableOpacity onPress={getLocationAsync}>
              <Image
                source={GPS}
                style={{ width: 30, height: 30, marginTop: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "justify-between",
            marginHorizontal: 20,
            padding: 16,
            borderRadius: 10,
            backgroundColor: "#D9D9D9",
          }}
        >
          <View
            style={{ marginBottom: 10, display: "flex", flexDirection: "row" }}
          >
            <Text style={{ fontWeight: "bold" }}>Ubicación: </Text>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {location.address}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>
              Añade<Text>{"\n"}</Text>Contactos de emergencia
            </Text>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={copy} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
          <View style={{ display: "flex", gap: 18 }}>
            {["phone1", "phone2", "phone3", "phone4"].map((phoneKey, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Text style={{ paddingStart: 5 }}>Celular {index + 1}: </Text>
                <TextInput
                  placeholder="########"
                  maxLength={9}
                  placeholderTextColor="white"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    width: "50%",
                    padding: 5,
                    paddingStart: 10,
                    borderRadius: 10,
                  }}
                  value={data.phones[phoneKey]} // Asociar el valor del teléfono al estado
                  onChangeText={(text) => handlePhoneChange(phoneKey, text)} // Actualiza el teléfono correspondiente
                />
              </View>
            ))}
          </View>
        </View>
        <View style={{ width: "50%", marginTop: 20, alignSelf: "center" }}>
          <Button title="Guardar" color="black" onPress={handleSubmit} />
          {/* Aquí puedes enviar el objeto data al backend */}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 12, // Ajusta el tamaño aquí si es necesario
    color: "#fff",
    backgroundColor: "#00120B",
  },
  inputGroupPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#00120B",
    width: "90%",
  },
  input: {
    flex: 1,
    padding: 10,
    textAlign: "left",
    fontSize: 14, // Ajusta el tamaño aquí también si es necesario
  },
});
