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
import api from "../service/api";
import { useUserStore } from "../store/store";
const ingresar = require("../assets/Ingresar.png");
const chatDark = require("../assets/ChatDark.png");

export default function CommunityDetail({ communityId, data }) {
  const key = "AIzaSyD4ZYfbcWceAE9FEXWU4pBq-K4Ys9s0idM";
  const [community, setCommunity] = useState(
    data.find((item) => item.id === communityId)
  );
  const [placePhoto, setPlacePhoto] = useState(null); // Estado para la foto del lugar

  const contactos = [
    { tipo: "Teléfono 1", telefono: community.phone1 },
    { tipo: "Teléfono 2", telefono: community.phone2 },
    { tipo: "Teléfono 3", telefono: community.phone3 },
    { tipo: "Teléfono 4", telefono: community.phone4 },
  ];

  const { userData } = useUserStore();
  const { token } = userData;
  //   alert(JSON.stringify(data));
  const fetchData = async () => {
    try {
      const comunidad = await api.consultarComunidad(token);
      // Luego consulta el total de usuarios para la comunidad específica
      const usuarios = await api.consultarTotalUsuarios(communityId, token);
      // Agrega la cantidad de usuarios al objeto de comunidad
      const comunidadConUsuarios = comunidad.map((com) => ({
        ...com,
        totalUsuarios: usuarios.length,
      }));

      setCommunity(comunidadConUsuarios[0]);
    } catch (error) {
      alert("Error al obtener los datos:", error.mes);
    }
  };

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
          borderRadius: 10, // Se usa "borderRadius" en lugar de "rounded"
          paddingHorizontal: 18,
          paddingVertical: 23,
          backgroundColor: "#fff",
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
            <Text
              style={{
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              {community.totalUsuarios}{" "}
              {community.totalUsuarios === 1 ? "Miembro" : "Miembros"}
            </Text>
          </View>
          <View>
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
            <TouchableOpacity
              onPress={fetchData}
              style={{
                backgroundColor: "#35605A",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 15,
                marginBottom: "auto",
              }}
            >
              <Text style={{ color: "#fff" }}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Text>Seguridad: {Seguridad}</Text> */}
        {/* <Text>Activos: {activos}</Text> */}
        <View
          style={{
            backgroundColor: "#D9D9D9",
            borderRadius: 10,
            paddingVertical: 17,
            paddingHorizontal: 23,
            marginTop: 20,
          }}
        >
          <Text style={styles.subTitle}>Contactos de Emergencia:</Text>
          <View
            style={{
              display: "flex",
              gap: 13,
            }}
          >
            {contactos.map((contacto, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingStart: 16,
                  borderRadius: 10,
                }}
              >
                <Text style={{ width: "50%" }}>{contacto.tipo}</Text>

                <Text
                  style={{
                    width: "50%",
                    backgroundColor: "black",
                    color: "white",
                    paddingStart: 16,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}
                >
                  {contacto.telefono}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", marginTop: 10 }}
        >
          Números de Contacto con atencion 24/7
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#31E981",
            width: "40%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 10,
            marginHorizontal: "auto",
            marginTop: 20,
            paddingVertical: 6,
            paddingHorizontal: 27,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              display: "flex",
              gap: 10,
            }}
          >
            Unirse
          </Text>
          <Image source={chatDark} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 35,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
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
