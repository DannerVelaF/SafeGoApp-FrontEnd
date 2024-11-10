// src/CommunityDetail.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Image,
} from "react-native";
const ingresar = require("../assets/Ingresar.png");
export default function CommunityDetail({ communityId, data }) {
  const key = "AIzaSyD4ZYfbcWceAE9FEXWU4pBq-K4Ys9s0idM";
  const community = data.find((item) => item.id === communityId);
  const [placePhoto, setPlacePhoto] = useState(null); // Estado para la foto del lugar

  const contactos = [
    { tipo: "Teléfono 1", telefono: community.phone1 },
    { tipo: "Teléfono 2", telefono: community.phone2 },
    { tipo: "Teléfono 3", telefono: community.phone3 },
    { tipo: "Teléfono 4", telefono: community.phone4 },
  ];

  // Función para obtener el Place ID basado en la latitud y longitud
  const fetchPlaceId = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=${key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].place_id; // Obtener el Place ID del primer resultado
      }
      alert("No se encontró un lugar cerca de estas coordenadas.");
    } catch (error) {
      alert("Error al obtener Place ID: " + error.message);
    }
  };

  // Función para obtener la foto de un lugar usando el Place ID
  const fetchPlacePhoto = async (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.result && data.result.photos && data.result.photos.length > 0) {
        const photoReference = data.result.photos[0].photo_reference;
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${key}`;
        setPlacePhoto(photoUrl); // Guardar la URL de la foto en el estado
      } else {
        alert("No se encontró foto para este lugar.");
      }
    } catch (error) {
      alert("Error al obtener la foto del lugar: " + error.message);
    }
  };

  // useEffect para obtener el Place ID y la foto cuando el componente se monta
  useEffect(() => {
    if (community && community.location) {
      const { latitude, longitude } = community.location;
      fetchPlaceId(latitude, longitude).then((placeId) => {
        if (placeId) {
          fetchPlacePhoto(placeId);
        }
      });
    }
  }, [community]);

  return (
    <View style={styles.container}>
      <View
        style={{
          borderColor: "black",
          borderRadius: 10, // Se usa "borderRadius" en lugar de "rounded"
          borderWidth: 1,
          paddingHorizontal: 18,
          paddingVertical: 23,
        }}
      >
        <View
          style={{
            dispslay: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>{community.name}</Text>

            {placePhoto ? (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 100,
                  overflow: "hidden",
                  width: 100,
                  height: 100,
                }}
              >
                <Image
                  source={{ uri: placePhoto }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            ) : (
              <Text>Cargando foto del lugar...</Text>
            )}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              paddingHorizontal: 16,
              borderRadius: 15,
              marginBottom: "auto",
            }}
          >
            <Text style={{ color: "#fff" }}>Unirse</Text>
            <Image source={ingresar} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

        {/* <Text>Seguridad: {Seguridad}</Text> */}
        <Text>Miembros: {community.totalUsuarios}</Text>
        {/* <Text>Activos: {activos}</Text> */}
        <Text style={styles.subTitle}>Contactos de Emergencia:</Text>
        <FlatList
          data={contactos}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <Text>
                {item.tipo}: {item.telefono}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Unirse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  contactItem: {
    paddingVertical: 5,
  },
  joinButton: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
