import React, { useEffect, useState } from "react";
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
import Inbox from "./inbox";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useRouter } from "expo-router"; // Importamos useRouter para la navegación
import api from "../service/api";
import { useUserStore } from "../store/store";

export default function ChatScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  const [selectedChat, setSelectedChat] = useState(null); // Estado para manejar el chat seleccionado
  const icon = require("../assets/safegoIcon.png");
  const search = require("../assets/Search.png");
  const [Community, setCommunity] = useState([]);

  const { userData } = useUserStore();
  const token = userData.token;

  const fetchData = async () => {
    try {
      // Consulta todas las comunidades
      const comunidades = await api.consultarComunidad(token);

      // Itera sobre cada comunidad y consulta el total de usuarios
      const comunidadesConUsuarios = await Promise.all(
        comunidades.map(async (comunidad) => {
          const usuarios = await api.consultarTotalUsuarios(
            comunidad.id,
            token
          );
          return {
            ...comunidad,
            totalUsuarios: usuarios.length,
          };
        })
      );
      // Actualiza el estado con los datos combinados
      setCommunity(comunidadesConUsuarios);
    } catch (error) {
      alert("Error al obtener las comunidades:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Item = ({
    nombre,
    ultimoMensaje,
    activos,
    mensajes,
    miembros,
    ultimaPersonaEnEnviarMensaje,
    id,
  }) => {
    const handlePress = () => {
      setSelectedChat(id); // Cambia el estado para mostrar el inbox
    };

    return (
      <TouchableOpacity style={styles.item} onPress={handlePress}>
        <View style={styles.members}>
          <Image source={icon} style={{ width: 50, height: 50 }} />
          <Text>
            {miembros} {miembros === 1 ? "Miembro" : "Miembros"}{" "}
          </Text>
        </View>

        <View style={styles.joinContainer}>
          <Text style={styles.name}>{nombre}</Text>
          <Text style={styles.addText}>
            {ultimaPersonaEnEnviarMensaje} : {ultimoMensaje}
          </Text>
        </View>

        <View style={styles.activePersons}>
          <View style={styles.lock}>
            <FontAwesome
              name="comments"
              size={15}
              color="#000"
              style={styles.icon}
            />
            <Text> + {mensajes} Mensajes </Text>
          </View>
          <View style={styles.active}>
            <MaterialIcons
              name="circle"
              size={24}
              color="#0f1"
              style={styles.icon}
            />
            <Text>{activos} Activos </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const router = useRouter(); // Instanciamos el hook useRouter
  const handlePress = () => {
    // Si hay un chat seleccionado, navega a la página de chats
    if (selectedChat) {
      router.push("/chat");
    } else {
      // Si no hay chat seleccionado, navega a la página de inicio
      router.push("/home");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#000" />
      <View style={styles.header}>
        <FontAwesome
          name="arrow-circle-left"
          size={40}
          color="black"
          onPress={handlePress}
        />
        <Text style={styles.CommunityText}>Chats</Text>

        {!selectedChat ? (
          <View style={styles.search} id="Search bar">
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Buscar Vecindad "
                style={styles.buscadorDireccion}
              />
              <Image source={search} style={styles.menuIconRight} />
            </View>
          </View>
        ) : (
          <View style={styles.search} />
        )}
      </View>
      <Text style={{ marginTop: 10, marginBottom: 20, paddingHorizontal: 20 }}>
        Avisos rápidos, respuesta segura.{" "}
      </Text>

      {/* Condición para mostrar el Inbox o la lista de chats */}
      {selectedChat ? (
        <Inbox communityId={selectedChat} /> // Renderiza el inbox cuando se selecciona un chat
      ) : (
        <View style={styles.listComunity}>
          <FlatList
            data={Community}
            renderItem={({ item }) => (
              <Item
                nombre={item.name}
                ultimoMensaje={item.ultimoMensaje}
                activos={item.activos}
                mensajes={item.mensajes}
                miembros={item.totalUsuarios}
                ultimaPersonaEnEnviarMensaje={item.ultimaPersonaEnEnviarMensaje}
                id={item.id}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }} // Espacio extra en la parte inferior
          />
        </View>
      )}

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
    backgroundColor: "#6B818C",
    padding: 5,
    borderRadius: 10,
  },

  active: {
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
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    fontWeight: "bold",
    color: "#000",
  },
  addText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
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
    width: "53%",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  listComunity: {
    flex: 1,
    marginBottom: 0,
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
