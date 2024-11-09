// src/CommunityDetail.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function CommunityDetail({ route, navigation }) {
    const { name, Seguridad, activos, miembros, contactos } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text>Seguridad: {Seguridad}</Text>
            <Text>Miembros: {miembros}</Text>
            <Text>Activos: {activos}</Text>
            <Text style={styles.subTitle}>Contactos de Emergencia:</Text>
            <FlatList
                data={contactos}
                renderItem={({ item }) => (
                    <View style={styles.contactItem}>
                        <Text>{item.tipo}: {item.telefono}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Unirse</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    contactItem: {
        paddingVertical: 5,
    },
    joinButton: {
        marginTop: 20,
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    joinButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
