import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { register, loading } = useAuth();
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegisterPress = async () => {
        if (!nombreCompleto || !telefono || !email || !password) {
            Alert.alert("Error", "Completa todos los campos");
            return;
        }

        try {
            await register({
                nombreCompleto,
                telefono,
                email,
                password,
            });
            // Al terminar, ya quedará logueado (por el AuthContext)
            // y AppNavigator te mandará a PlacesList
        } catch (err: any) {
            console.error(err);
            Alert.alert("Error", "No se pudo registrar. Revisa los datos.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Arrendatario</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={nombreCompleto}
                onChangeText={setNombreCompleto}
            />

            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                keyboardType="phone-pad"
                value={telefono}
                onChangeText={setTelefono}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button
                title={loading ? "Registrando..." : "Registrarse"}
                onPress={handleRegisterPress}
                disabled={loading}
            />

            <View style={{ height: 16 }} />

            <Button
                title="Ya tengo cuenta"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 12,
    },
});

export default RegisterScreen;
