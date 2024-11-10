import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as Contacts from "expo-contacts";
import * as Linking from "expo-linking"; // Importamos Linking
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons"; // Para los iconos
import AsyncStorage from "@react-native-async-storage/async-storage";

const back = require("../assets/BackArrow.png");
const marker = require("../assets/marker.png");
const phone = require("../assets/Phone.png");

export default function Emergency() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [permissions, setPermissions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]); // Estado para los contactos favoritos
  const [showFavorites, setShowFavorites] = useState(false); // Estado para mostrar solo favoritos

  // Función para alternar entre todos los contactos y solo favoritos
  const toggleShowFavorites = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
  };

  // Función para obtener los contactos
  const getPermissions = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      setPermissions(true);
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
      });

      if (data.length > 0) {
        // Filtrar contactos con números válidos
        const validContacts = data.filter((contact) => {
          if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            const phoneNumber = contact.phoneNumbers[0].number;
            const validPhoneNumber =
              phoneNumber &&
              phoneNumber !== "null" &&
              !/^(116|123|999|buzón de voz|atención al cliente)$/i.test(
                phoneNumber
              );
            const isValidNumber = /^\+?\d{10,15}$/.test(phoneNumber);
            return validPhoneNumber && isValidNumber;
          }
          return false;
        });

        setContacts(validContacts);
        setFilteredContacts(validContacts);
      } else {
        setContacts([]);
      }
    } else {
      setPermissions(false);
    }
  };

  // Cargar favoritos de AsyncStorage al iniciar la app
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error al cargar favoritos", error);
    }
  };

  useEffect(() => {
    getPermissions();
    loadFavorites(); // Llamar a la carga de favoritos al iniciar
  }, []);

  // Guardar favoritos en AsyncStorage cada vez que se actualice la lista de favoritos
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error al guardar favoritos", error);
      }
    };
    saveFavorites();
  }, [favorites]);

  // Función para filtrar los contactos
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = contacts.filter((contact) => {
      const name = contact.name.toLowerCase();
      const phoneNumber =
        contact.phoneNumbers && contact.phoneNumbers.length > 0
          ? contact.phoneNumbers[0].number
          : "";
      return name.includes(query.toLowerCase()) || phoneNumber.includes(query);
    });
    setFilteredContacts(filtered);
  };

  // Función para manejar los favoritos
  const toggleFavorite = (contact) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === contact.id)) {
        return prevFavorites.filter((fav) => fav.id !== contact.id); // Si ya es favorito, lo quitamos
      } else {
        return [...prevFavorites, contact]; // Si no es favorito, lo agregamos
      }
    });
  };

  // Función para renderizar cada item de la lista
  const renderItem = ({ item }) => {
    const phoneNumber =
      item.phoneNumbers && item.phoneNumbers.length > 0
        ? item.phoneNumbers[0].number
        : "Sin número de teléfono";

    const handleCall = (phoneNumber) => {
      if (phoneNumber && phoneNumber !== "Sin número de teléfono") {
        Linking.openURL(`tel:${phoneNumber}`);
      }
    };

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
          justifyContent: "space-between",
          padding: 13,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#000",

          // Sombras en iOS
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,

          // Sombra en Android
          elevation: 8,
          backgroundColor: "#FFF", // Fondo blanco para destacar la sombra
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Image source={phone} style={{ width: 30, height: 30 }} />
          <View>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleCall(phoneNumber)}>
              <Text style={{ color: "blue" }}>{phoneNumber}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ícono para agregar a favoritos */}
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Ionicons
            name={
              favorites.some((fav) => fav.id === item.id)
                ? "star"
                : "star-outline"
            }
            size={24}
            color={
              favorites.some((fav) => fav.id === item.id) ? "gold" : "gray"
            }
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 53, paddingVertical: 43 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Llamada de emergencia
          </Text>
        </View>
        <TextInput
          placeholder="Busca un contacto"
          value={searchQuery}
          onChangeText={handleSearch} // Actualizamos el texto de búsqueda
          style={{
            marginTop: 20,
            width: "100%",
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        />
        <View>
          {permissions ? (
            <FlatList
              data={
                showFavorites
                  ? filteredContacts.filter((contact) =>
                      favorites.some((fav) => fav.id === contact.id)
                    )
                  : filteredContacts
              }
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                showFavorites ? (
                  <Text>No hay contactos favoritos</Text>
                ) : (
                  <Text>No hay contactos</Text>
                )
              }
              renderItem={renderItem}
              style={{ elevation: 2 }}
              ListFooterComponent={<View style={{ height: 50 }} />} // Espaciador al final
            />
          ) : (
            <Text>Permisos no concedidos</Text>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={toggleShowFavorites}
        >
          <FontAwesome name="star" size={24} color="#31E981" />
          <Text style={styles.footerText}>Favoritos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    display: "flex",
  },
  footerText: {
    fontSize: 12,
    color: "#31E981",
    marginTop: 5,
    marginLeft: 8,
  },
});
