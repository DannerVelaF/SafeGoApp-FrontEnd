import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
const back = require("../assets/BackArrow.png");
const sinImagen = require("../assets/default.png");
const copy = require("../assets/copy.png");

export default function CommunityForm() {
  const [selectedRole, setSelectedRole] = useState("Vecino");
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginVertical: 50,
          marginHorizontal: 30,
        }}
      >
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
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
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
                padding: 10,
              }}
            >
              <Image source={sinImagen} style={{ width: 80, height: 80 }} />
            </View>
            <View style={styles.inputGroupPicker}>
              <Picker
                selectedValue={selectedRole}
                style={styles.input}
                onValueChange={(itemValue) => setSelectedRole(itemValue)}
                dropdownIconColor="#fff"
                prompt="Selecciona un rol"
                onChangeText={(text) => setData({ ...data, role: text })}
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
              placeholderTextColor="gray" // Color del texto del placeholder
              multiline={true} // Habilita varias líneas como en un textarea
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            juscefyContent: "justify-between",
            marginHorizontal: 20,
            padding: 16,
            borderRadius: 10,
            backgroundColor: "#D9D9D9",
          }}
        >
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
            <View
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
              <Text style={{ paddingStart: 5 }}>Celular 1: </Text>
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
              />
            </View>
            <View
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
              <Text style={{ paddingStart: 5 }}>Celular 2: </Text>
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
              />
            </View>
            <View
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
              <Text style={{ paddingStart: 5 }}>Celular 3: </Text>
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
              />
            </View>
            <View
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
              <Text style={{ paddingStart: 5 }}>Celular 4: </Text>
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
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: "50%",
            marginTop: 20,
            alignSelf: "center", // Centra el botón horizontalmente
          }}
        >
          <Button title="Guardar" color="black" />
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
  pickerItem: {
    fontSize: 12, // Ajusta el tamaño aquí si es necesario
    color: "#fff",
    backgroundColor: "#00120B",
  },
  input: {
    flex: 1,
    padding: 10,
    textAlign: "left",
    fontSize: 14, // Ajusta el tamaño aquí también si es necesario
  },
});
