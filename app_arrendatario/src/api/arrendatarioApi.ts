import api from "./apiClient";

export interface ArrendatarioLoginReponse {
    token: string;
    arrendatario: {
        id: number;
        nombreCompleto: string;
        email: string;
        telefono: string;
    };
}

export interface ArrendatarioRegisterPayload {
    email: string;
    nombreCompleto: string;
    password: string;
    telefono: string;
}

export async function loginArrendatario(email: string, password: string): Promise<ArrendatarioLoginReponse> {
    const res = await api.post<ArrendatarioLoginReponse>(
        "api/arrendatario/login",
        { email, password }
    );
    return res.data;
}

export async function registerArrendatario(payload: ArrendatarioRegisterPayload) {
    const res = await api.post("api/arrendatario/registro", payload);
    return res.data;
}