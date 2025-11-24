import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

const PlacesListScreen: React.FC = () => {
    const { nombreCompleto, logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis lugares</Text>
            <Text style={styles.subtitle}>
                Hola, {nombreCompleto ?? "Arrendatario"}
            </Text>

            {/* Aquí luego mostraremos la lista real de lugares y el botón "Agregar lugar" */}

            <View style={{ marginTop: 24 }}>
                <Button title="Cerrar sesión" onPress={logout} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 16,
    },
});

export default PlacesListScreen;
