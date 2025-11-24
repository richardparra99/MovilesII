import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginPress = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Completa todos los campos");
            return;
        }

        try {
            await login(email, password);
            // Si login es correcto, el contexto cambia y AppNavigator mostrará PlacesList
        } catch (err: any) {
            console.error(err);
            Alert.alert("Error", "Credenciales inválidas o problema de conexión");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido, Arrendatario</Text>

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
                title={loading ? "Ingresando..." : "Iniciar sesión"}
                onPress={handleLoginPress}
                disabled={loading}
            />

            <View style={{ height: 16 }} />

            <Button
                title="Crear nueva cuenta"
                onPress={() => navigation.navigate("Register")}
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

export default LoginScreen;
