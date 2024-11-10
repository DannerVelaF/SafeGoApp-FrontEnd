import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUserStore } from "../store/store";

const back = require("../assets/BackArrow.png");
export default function Seguimiento() {
  const router = useRouter();
  const { userData } = useUserStore();
  useEffect(() => {
    if (userData === null) {
      route.push("/loginScreen");
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 33, paddingVertical: 43 }}>
        <TouchableOpacity
          onPress={() => router.push("/home")}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Image source={back} style={{ width: 35, height: 35 }} />
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Seguimiento</Text>
        </TouchableOpacity>
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
});
