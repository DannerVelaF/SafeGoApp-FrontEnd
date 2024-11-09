import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const icon = require("./assets/safegoIcon.png");
const menu = require("./assets/Menu.png");
const search = require("./assets/Search.png");
const Indicaciones = require("./assets/Indicaciones.png");
const GPS = require("./assets/GPS.png");
const Star = require("./assets/Star.png");
const Chat = require("./assets/Chat.png");
const HomeSafe = require("./assets/HomeSafe.png");
const Siren = require("./assets/Siren.png");
import Panel from "./components/Panel";
import { FontAwesome} from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Community from "./components/Community";

export default function App() {
  return (
    <View>
      <StatusBar backgroundColor="#000" />
    </View>
  );
}
