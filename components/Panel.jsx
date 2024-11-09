import { StyleSheet, Text, View } from "react-native";

const icon = require("../assets/safegoIcon.png");

export default function Panel({ isOpen, togglePanel }) {
  return (
    <View
      style={[styles.container, isOpen ? styles.containerOpen : null]}
    >
      <View>
        <Text>Panel abierto</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    position: "absolute",
    width: "0%",
    top: 0,
    left: 0,
    height: "100%",
    zIndex: 10,
  },
  containerOpen: {
    width: "70%",
  },
});
