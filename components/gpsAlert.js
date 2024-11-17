import { Text } from "react-native";

export default function GPSAlert() {
  return (
    <Text
      style={{
        backgroundColor: "#FFFFFF",
        zIndex: 10,
        position: "absolute",
        bottom: 150,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
      }}
    >
      Se actualizo la ubicación de tu dispositivo.
    </Text>
  );
}
