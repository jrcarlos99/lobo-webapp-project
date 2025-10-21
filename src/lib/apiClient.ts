import axios, { AxiosError, AxiosInstance } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

if (typeof window !== "undefined") {
  console.log("🌐 API_BASE_URL em runtime:", API_BASE_URL);
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// Request interceptor para autenticação
apiClient.interceptors.request.use((config) => {
  try {
    if (config.url?.includes("/auth/login")) {
      return config;
    }

    let token: string | null = null;

    if (typeof window !== "undefined") {
      token = localStorage.getItem("authToken");
    }

    if (!token) {
      const sessionCookie = Cookies.get("session");
      if (sessionCookie) {
        try {
          const sessionData = JSON.parse(
            Buffer.from(sessionCookie, "base64").toString()
          );
          token = sessionData.token;
        } catch (e) {
          console.error("Erro ao decodificar cookie de sessão:", e);
        }
      }
    }

    if (!token) {
      token = Cookies.get("authToken") || null;
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.error("Erro no interceptor de request:", e);
  }

  return config;
});

// Response interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject({
        status: 0,
        message: error.message || "Erro de conexão",
        data: null,
      });
    }

    if (error.response.status === 403) {
      console.error("Acesso negado - verifique permissões e autenticação");
    }

    if (error.response.status === 401) {
      console.error("Não autorizado - token inválido ou expirado");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    const contentType = error.response.headers?.["content-type"] ?? "";
    if (contentType.includes("application/json")) {
      const data: { message?: string } = error.response.data as {
        message?: string;
      };
      const message = (data && data.message) || error.message;
      return Promise.reject({ status: error.response.status, message, data });
    }

    return Promise.reject(error);
  }
);

export async function downloadBlob(responseData: Blob, filename = "download") {
  const url = window.URL.createObjectURL(new Blob([responseData]));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export default apiClient;
