import { createContext, ReactNode, useContext, useState } from "react";
import { ArrendatarioLoginReponse, ArrendatarioRegisterPayload, loginArrendatario, registerArrendatario } from "../api/arrendatarioApi";

interface AuthState {
    token: string | null;
    arrendatarioId: number | null;
    nombreCompleto: string | null;
    email: string | null;
}

interface AuthContextProps extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (data: ArrendatarioRegisterPayload) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AuthState>({
        token: null,
        arrendatarioId: null,
        nombreCompleto: null,
        email: null,
    });

    const [loading, setLoading] = useState(false);

    const handleLoginResponse = (data: ArrendatarioLoginReponse) => {
        setState({
            token: data.token,
            arrendatarioId: data.arrendatario.id,
            nombreCompleto: data.arrendatario.nombreCompleto,
            email: data.arrendatario.email,
        });
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const data = await loginArrendatario(email, password);
            handleLoginResponse(data);
        } finally {
            setLoading(false);
        }
    };

    const register = async (payload: ArrendatarioRegisterPayload) => {
        setLoading(true);
        try {
            await registerArrendatario(payload);
            const data = await loginArrendatario(payload.email, payload.password);
            handleLoginResponse(data);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setState({
            token: null,
            arrendatarioId: null,
            nombreCompleto: null,
            email: null,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};