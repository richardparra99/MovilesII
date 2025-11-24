import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import PlacesListScreen from "./src/screens/PlacesListScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  PlacesList: undefined; // pantalla principal del arrendatario
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      {token ? (
        <Stack.Navigator>
          <Stack.Screen
            name="PlacesList"
            component={PlacesListScreen}
            options={{ title: "Mis lugares" }}
          />
          {/* luego agregamos más screens: PlaceForm, PlaceReservations, etc. */}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login Arrendatario" }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Registro Arrendatario" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}