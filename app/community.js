// src/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useRouter } from "expo-router"; // Importa el hook useRouter

export default function Community() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const icon = require("../assets/safegoIcon.png");
  const menu = require("../assets/Menu.png");
  const search = require("../assets/Search.png");
  const [panelOpen, setPanelOpen] = useState(false);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setPanelOpen(!panelOpen);
  };

  const DATA = [
    {
      id: "1",
      name: "San Isidro",
      Seguridad: "Buena",
      activos: "120",
      miembros: "200",
    },
    {
      id: "2",
      name: "Cercado de Lima",
      Seguridad: "Mala",
      activos: "120",
      miembros: "200",
    },
    {
      id: "3",
      name: "Chiclayo",
      Seguridad: "Peligrosa",
      activos: "1220",
      miembros: "2300",
    },
    {
      id: "4",
      name: "Miraflores",
      Seguridad: "Alta",
      activos: "300",
      miembros: "500",
    },
    {
      id: "5",
      name: "Barranco",
      Seguridad: "Moderada",
      activos: "200",
      miembros: "400",
    },
    {
      id: "6",
      name: "La Molina",
      Seguridad: "Buena",
      activos: "500",
      miembros: "600",
    },
    {
      id: "7",
      name: "Callao",
      Seguridad: "Peligrosa",
      activos: "1500",
      miembros: "2000",
    },
    {
      id: "8",
      name: "Surco",
      Seguridad: "Alta",
      activos: "320",
      miembros: "450",
    },
    {
      id: "9",
      name: "Rímac",
      Seguridad: "Moderada",
      activos: "80",
      miembros: "150",
    },
    {
      id: "10",
      name: "San Miguel",
      Seguridad: "Alta",
      activos: "400",
      miembros: "520",
    },
    {
      id: "11",
      name: "Jesús María",
      Seguridad: "Buena",
      activos: "250",
      miembros: "300",
    },
    {
      id: "12",
      name: "Magdalena",
      Seguridad: "Alta",
      activos: "360",
      miembros: "470",
    },
  ];

  const Item = ({ name, Seguridad, activos, miembros }) => (
    <View style={styles.item}>
      <View style={styles.members}>
        <Image source={icon} style={{ width: 50, height: 50 }} />
        <Text>{miembros} Miembros </Text>
      </View>

      <View style={styles.joinContainer}>
        <Text style={styles.name}> {name} </Text>
        <TouchableOpacity style={styles.buttonJoin}>
          <Text style={styles.addText}>Unirse</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activePersons}>
        <View style={styles.lock}>
          <FontAwesome name="lock" size={15} color="#000" style={styles.icon} />
          <Text>Seguridad: {Seguridad} </Text>
        </View>
        <View style={styles.lock}>
          <MaterialIcons
            name="circle"
            size={24}
            color="#0f1"
            style={styles.icon}
          />
          <Text>{activos} Activos </Text>
        </View>
      </View>
    </View>
  );
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#000" />
      <View style={styles.header}>
        <FontAwesome
          name="arrow-circle-left"
          size={40}
          color="black"
          onPress={() => router.push("/home")}
        />
        <Text style={styles.CommunityText}>Comunidad</Text>
        <TouchableOpacity style={styles.addItem}>
          <Text style={styles.addText}>Añadir</Text>
          <FontAwesome name="plus" size={12} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.search} id="Search bar">
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.menuboxleft}
            onPress={handleMenuClick}
          >
            <Image source={menu} style={styles.menuIconLeft} />
          </TouchableOpacity>
          <TextInput
            placeholder="Buscar Comunidad"
            style={styles.buscadorDireccion}
          />
          <Image source={search} style={styles.menuIconRight} />
        </View>
      </View>

      <View style={styles.listComunity}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              Seguridad={item.Seguridad}
              activos={item.activos}
              miembros={item.miembros}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }} // Espacio extra en la parte inferior
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome name="location-arrow" size={24} color="#31E981" />
          <Text style={styles.footerText}>Más cercanos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome6 name="map-location" size={24} color="#31E981" />
          <Text style={styles.footerText}>Provincias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome6 name="users-viewfinder" size={24} color="#31E981" />
          <Text style={styles.footerText}>Distritos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  lock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  activePersons: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  joinContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  members: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonJoin: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  CommunityText: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    fontWeight: "bold",
    color: "#000",
  },
  addText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 5,
  },
  addItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#000",
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuIconRight: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 10,
    zIndex: 10,
  },
  buscadorDireccion: {
    flex: 1,
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  menuIconLeft: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 10,
    zIndex: 10,
  },
  menuboxleft: {
    width: "15%",
    position: "absolute",
    left: 10,
    zIndex: 10,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "10%",
    paddingVertical: 10,
    backgroundColor: "#00120B",
    borderTopWidth: 1,
    borderColor: "#ccc",
    position: "absolute",
    bottom: 0,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#31E981",
    marginTop: 5,
    marginLeft: 8,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  search: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
    marginVertical: 10,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  listComunity: {
    flex: 1,
    marginBottom: 10,
  },
  item: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
