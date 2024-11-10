import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import api from "../service/api";
import { useUserStore } from "../store/store";
const hackaton = require("../assets/hackaton.png");

export default function NewsInterface() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: "", // Dirección solo con la ciudad
  });
  const [direccion, setDireccion] = useState("");
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const locations = [
    { key: "san-isidro", value: "San Isidro " },
    { key: "miraflores", value: "Miraflores " },
    { key: "surco", value: "Surco" },
    { key: "san-borja", value: "San Borja" },
    { key: "chiclayo", value: "Chiclayo " },
    { key: "lima", value: "Lima" },
  ];

  // Obtener la ubicación del usuario y obtener la ciudad
  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

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
      const address = geocodedLocation[0].city;
      setLocation((prevState) => ({
        ...prevState,
        address,
      }));
      setDireccion(address);
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  const { userData } = useUserStore();

  useEffect(() => {
    if (userData === null) {
      route.push("/loginScreen");
    }
  }, []);

  const { token } = userData;

  useEffect(() => {
    if (direccion) {
      getNews(direccion.trim().toLowerCase());
    }
  }, [direccion]); // Llama a getNews cuando dirección esté lista
  0;
  const getNews = async (locationAddress) => {
    try {
      setIsLoading(true); // Comienza la carga
      const response = await api.consultarNoticias(token, locationAddress);
      setNews(response);
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  const handleDropdownChange = (selectedLocation) => {
    setDireccion(selectedLocation);
    setLocation((prevState) => ({
      ...prevState,
      address: selectedLocation,
    }));
    getNews(selectedLocation.trim().toLowerCase()); // Llamar a getNews con la nueva ubicación
  };

  const NewsCard = ({ title, description, imageUrl, date }) => (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{description}</Text>
        <View style={styles.cardMetrics}>
          <View style={styles.metric}>
            <Feather name="clock" size={12} color="#666" />
            <Text style={styles.metricText}>{date}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const router = useRouter(); // Instanciamos el hook useRouter
  const handlePress = () => {
    router.push("/home");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.return}>
          <TouchableOpacity>
            <FontAwesome
              name="arrow-circle-left"
              size={30}
              color="black"
              onPress={handlePress}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <ImageBackground
            source={require("../assets/ElComercio.png")}
            style={styles.logo}
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput style={styles.searchInput} placeholder="Buscar noticias" />
          <View style={styles.dropdown}>
            <SelectList
              setSelected={handleDropdownChange}
              data={locations}
              defaultOption={
                locations.find((loc) => loc.value.trim() === direccion) ||
                locations[0]
              }
              search={false}
              boxStyles={styles.selectBox}
              inputStyles={styles.selectText}
            />
          </View>
        </View>
      </View>

      {/* Indicador de carga */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Cargando noticias...</Text>
        </View>
      ) : (
        <View>
          {/* Featured News */}
          <View style={styles.featuredContainer}>
            <Image source={hackaton} style={styles.featuredImage} />
          </View>

          <View style={styles.newsSection}>
            <Text style={styles.sectionTitle}>Noticias Destacadas</Text>
            <View style={styles.newsGrid}>
              {news.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  date={item.date}
                />
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 200,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  searchContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchBar: {
    flexDirection: "row",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  dropdown: {
    width: 150,
  },
  selectBox: {
    borderRadius: 8,
    height: 45,
    width: 150, // Aumenta el ancho del cuadro de selección
  },
  selectText: {
    fontSize: 16, // Ajusta el tamaño de la fuente si es necesario
  },
  featuredContainer: {
    padding: 16,
  },
  featuredImage: {
    width: "100%",
    height: 170,
    borderRadius: 20,
    overflow: "hidden",
    resizeMode: "cover", // Cambia a 'cover' si prefieres este ajuste
    borderWidth: 2, // Añade esta línea para el ancho del borde
  },
  newsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  newsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  card: {
    width: (Dimensions.get("window").width - 48) / 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  cardMetrics: {
    flexDirection: "row",
    gap: 12,
  },
  metric: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metricText: {
    fontSize: 12,
    color: "#666",
  },
});
