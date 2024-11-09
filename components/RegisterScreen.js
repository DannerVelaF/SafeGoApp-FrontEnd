import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Checkbox from 'expo-checkbox';

export default function RegisterScreen() {
    const [isChecked, setChecked] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState("Vecino");

    return (
        <View style={styles.container}>
            <StatusBar animated={true} backgroundColor="#000" />
            <View style={styles.loginBox}>
                <Text style={styles.title}>Registrarse</Text>
                <Text style={styles.subtitle}>Ingresa tus datos</Text>

                <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <TextInput style={styles.input} placeholder="Nombres" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput style={styles.input} placeholder="Apellidos" />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <FontAwesome name="phone" size={20} color="#666" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="Teléfono" />
                    </View>
                    <View style={styles.inputGroup}>
                        <FontAwesome name="file" size={20} color="#666" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="DNI" />
                    </View>
                </View>

                <View style={styles.singleInput}>
                    <TextInput style={styles.input} placeholder="Correo electrónico" />
                </View>

                <View style={styles.singleInput}>
                    <TextInput style={styles.input} placeholder="Distrito/Ciudad/Calle y número" />
                </View>

                <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <FontAwesome name="user" size={20} color="#666" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="Usuario" />
                    </View>
                    <View style={styles.inputGroupPicker}>
                       <Picker
                            selectedValue={selectedRole}
                            style={styles.input}
                            onValueChange={(itemValue) => setSelectedRole(itemValue)}
                            dropdownIconColor="#fff"
                            prompt="Selecciona un rol"
                            >
                            <Picker.Item label="Vecino" value="Vecino" style={styles.pickerItem} />
                            <Picker.Item label="Autoridad" value="Autoridad" style={styles.pickerItem} />
                        </Picker>

                    </View>
                </View>

                <View style={styles.singleInput}>
                    <FontAwesome name="lock" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <FontAwesome
                            name={passwordVisible ? "eye-slash" : "eye"}
                            size={20}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        tintColors={{ true: "#66bb6a", false: "#ccc" }}
                    />
                    <Text style={styles.checkboxLabel}>Acepto las políticas de privacidad </Text>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.registerMessage}> Regístrate y mantente alerta. </Text>

            <View style={styles.socialMedia}>
                <FontAwesome name="facebook" size={24} color="#31E981" style={styles.socialIcon} />
                <FontAwesome name="twitter" size={24} color="#31E981" style={styles.socialIcon} />
                <FontAwesome name="instagram" size={24} color="#31E981" style={styles.socialIcon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00120B",
    },
    loginBox: {
        backgroundColor: "white",
        width: 350,
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        marginBottom:50,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    subtitle: {
        color: "#35605A",
        marginTop: 20,
        marginBottom: 10,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        width: "49%",
    },

    inputGroupPicker: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        width: "49%",
        backgroundColor: "#00120B",
    },

    pickerItem: {
        fontSize: 12, // Ajusta el tamaño aquí si es necesario
        color: "#fff",
        backgroundColor: "#00120B",
    },
    singleInput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        width: "100%",
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        textAlign: "left",
        fontSize: 14, // Ajusta el tamaño aquí también si es necesario
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    checkboxLabel: {
        fontSize: 13,
        color: "#666",
        marginLeft: 5,
    },
    button: {
        backgroundColor: "#00120B",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    registerMessage: {
        fontSize: 15,
        color: "#31E981",
        textAlign: "center",
    },
    socialMedia: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    socialIcon: {
        marginHorizontal: 10,
    },
});
