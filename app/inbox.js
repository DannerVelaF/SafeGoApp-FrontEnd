import { Text, View } from "react-native";
import { useUserStore } from "../store/store";

export default function Inbox({ chatId }) {
  const DATA = [
    {
      id: "1",
      nombre: "San Isidro",
      ultimoMensaje: "Buenos dias vecinos!!!",
      activos: "120",
      mensajes: "120",
      miembros: "1200",
      ultimaPersonaEnEnviarMensaje: "Maria",
    },
    {
      id: "2",
      nombre: "San Borja",
      ultimoMensaje: "Cuidado con los robos",
      activos: "1220",
      mensajes: "122",
      miembros: "1220",
      ultimaPersonaEnEnviarMensaje: "Juan Obrero",
    },
  ];
  const chatSeleccionado = DATA.find((chat) => chat.id === chatId);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      {chatSeleccionado ? (
        <View
          style={{
            borderWidth: 2,
            height: "90%",
            width: "100%",
            borderColor: "#35605A",
            borderWidth: 1,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <View style={{ flexDirection: "column", gap: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {chatSeleccionado.nombre}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {chatSeleccionado.activos} activos
            </Text>
          </View>
          <Text>Último mensaje: {chatSeleccionado.ultimoMensaje}</Text>
          <Text>Mensajes: {chatSeleccionado.mensajes}</Text>
          <Text>Miembros: {chatSeleccionado.miembros}</Text>
          <Text>
            Última persona en enviar mensaje:{" "}
            {chatSeleccionado.ultimaPersonaEnEnviarMensaje}
          </Text>
        </View>
      ) : (
        <Text>Chat no encontrado</Text>
      )}
    </View>
  );
}
