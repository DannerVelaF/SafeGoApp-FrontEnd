import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
const hackaton = require('../assets/hackaton.png');

export default function NewsInterface() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: "", // Dirección solo con la ciudad
  });
  const [direccion, setDireccion] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const locations = [
    { key: '1', value: 'San Isidro ' },
    { key: '2', value: 'Miraflores ' },
    { key: '3', value: 'Surco ' },
    { key: '4', value: 'San Borja ' },
    { key: '5', value: 'Chiclayo ' },
  ];

  // Obtener la ubicación del usuario y obtener la ciudad
  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
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

  const NewsCard = () => (
    <View style={styles.card}>
      <Image
        source={hackaton}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          Descubrimiento científico revolucionario
        </Text>
        <Text style={styles.cardSubtitle}>
          Científicos logran un avance significo
        </Text>
        <View style={styles.cardMetrics}>
          <View style={styles.metric}>
            <Feather name="clock" size={12} color="#666" />
            <Text style={styles.metricText}>Hace 2 horas </Text>
          </View>
          <View style={styles.metric}>
            <Feather name="share-2" size={12} color="#666" />
            <Text style={styles.metricText}>234 </Text>
          </View>
          <View style={styles.metric}>
            <Feather name="heart" size={12} color="#666" />
            <Text style={styles.metricText}>56 </Text>
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
            source={require('../assets/ElComercio.png')}
            style={styles.logo}
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar noticias"
          />
          <View style={styles.dropdown}>
            <SelectList
              setSelected={(val) => console.log(val)}
              data={locations}
              defaultOption={locations.find(loc => loc.value.trim() === direccion) || locations[0]}
              search={false}
              boxStyles={styles.selectBox}
              inputStyles={styles.selectText}
            />
          </View>
        </View>
      </View>

      {/* Featured News */}
      <View style={styles.featuredContainer}>
        <Image
          source={hackaton}
          style={styles.featuredImage}
        />
      </View>

      <View style={styles.newsSection}>
        <Text style={styles.sectionTitle}>Noticias Destacadas</Text>
        <View style={styles.newsGrid}>
          {[1, 2, 3, 4].map((item) => (
            <NewsCard key={item} />
          ))}
        </View>
      </View>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  searchContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    flexDirection: 'row',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
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
    width: '100%',
    height: 170,
    borderRadius: 20,
    overflow: 'hidden',
    resizeMode: 'cover', // Cambia a 'cover' si prefieres este ajuste
    borderWidth: 2, // Añade esta línea para el ancho del borde
  },
  newsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  newsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: (Dimensions.get('window').width - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  cardMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 12,
    color: '#666',
  },
});