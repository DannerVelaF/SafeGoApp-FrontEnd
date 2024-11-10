import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const back = require("../assets/BackArrow.png");
const inicio = require("../assets/tutorial/Home.png");

export default function Tutorial() {
  const route = useRouter();

  return (
    <View
      style={{
        paddingVertical: 53,
        paddingHorizontal: 30,
        display: "flex",
        flex: 1,
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => route.push("/home")}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Image source={back} style={{ width: 35, height: 35 }} />
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Tutorial de uso
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor para la imagen */}
      <View style={{ position: "relative" }}>
        <Image
          source={inicio}
          style={{
            width: "100%", // Ajusta el tamaño de la imagen
            height: "100%", // Ajusta el tamaño de la imagen
          }}
        />
      </View>
    </View>
  );
}
