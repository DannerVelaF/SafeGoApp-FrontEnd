import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUserStore } from "../store/store";
import { useEffect, useState } from "react";
import api from "../service/api";
import { FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
export default function Inbox({ communityId }) {
  const [community, setCommunity] = useState([]);
  const [message, setMessage] = useState(""); // Estado para el texto
  const [inputHeight, setInputHeight] = useState(20); // Altura dinámica del TextInput
  const [placePhoto, setPlacePhoto] = useState(null); // Estado para la foto del lugar
  const key = "AIzaSyD4ZYfbcWceAE9FEXWU4pBq-K4Ys9s0idM";

  const { userData } = useUserStore();
  const { user, token } = userData;

  const fetchData = async () => {
    try {
      const comunidad = await api.consultarComunidadPorID(token, communityId);
      const { latitude, longitude } = comunidad.location;
      fetchPlaceId(latitude, longitude).then((placeId) => {
        if (placeId) {
          fetchPlacePhoto(placeId);
        }
      });
      // Luego consulta el total de usuarios para la comunidad específica
      const usuarios = await api.consultarTotalUsuarios(communityId, token);
      const comunidadConUsuarios = {
        ...comunidad,
        totalUsuarios: usuarios.length,
      };
      setCommunity(comunidadConUsuarios);
    } catch (error) {
      alert("Error al obtener los datos:", error);
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
  const handleSendMessage = async () => {
    try {
      const response = await api.enviarMensaje(token, {
        communityId: communityId,
        message: message,
        userId: user.userId,
      });
      alert(JSON.stringify(response));
    } catch (error) {
      alert("Error al enviar mensaje: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          borderWidth: 2,
          height: "90%",
          borderColor: "#35605A",
          borderWidth: 3,
          borderRadius: 20,
          display: "flex",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            borderColor: "#35605A",
            borderBottomWidth: 3,
          }}
        >
          <View>
            {placePhoto && (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 100,
                  overflow: "hidden",
                  width: 65,
                  height: 65,
                  borderColor: "black",
                  borderWidth: 2,
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
            )}
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {community.name}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {community.totalUsuarios} miembros
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
                backgroundColor: "#31E981",
                padding: 5,
                borderRadius: 10,
                width: 107,
              }}
            >
              <FontAwesome6 name="shield" size={10} color="black" />
              <Text
                style={{
                  fontSize: 10,
                }}
              >
                Seguridad: Buena
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-evenly",
                gap: 10,
                backgroundColor: "#35605A",
                paddingVertical: 5,
                paddingHorizontal: 7,
                borderRadius: 10,
                width: 107,
              }}
            >
              <FontAwesome6 name="bell" size={10} color="white" />
              <Text
                style={{
                  fontSize: 10,
                  color: "white",
                }}
              >
                4 alertas hoy
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <FontAwesome6 name="ellipsis-vertical" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Text>Mensajes</Text>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <View
            style={{
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              backgroundColor: "#35605A",
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                alignContent: "center",
              }}
            >
              <FontAwesome name="image" size={20} color="white" />
            </TouchableOpacity>
            <TextInput
              placeholder="Escribe un mensaje"
              multiline={true}
              value={message}
              onChangeText={(text) => setMessage(text)}
              onContentSizeChange={(event) => {
                setInputHeight(event.nativeEvent.contentSize.height);
              }}
              placeholderTextColor={"white"}
              style={{
                width: "80%",
                height: Math.min(100, Math.max(40, inputHeight)), // Altura entre 40 y 100
                padding: 10,
                maxHeight: 100, // Limita la altura máxima
                overflow: "hidden", // Asegura que el contenido no exceda el límite
                color: "white",
              }}
              scrollEnabled={true} // Permite el desplazamiento
            />
            <TouchableOpacity
              style={{
                alignContent: "center",
              }}
              onPress={handleSendMessage}
            >
              <FontAwesome name="paper-plane" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
