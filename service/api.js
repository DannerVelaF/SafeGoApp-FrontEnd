import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.101.4:8080/",
});

const registerUser = async (userData) => {
  try {
    const response = await api.post("auth/register", userData); // Axios manejará el JSON automáticamente
    console.log("Registro exitoso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error.response || error.message);
    throw error;
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await api.post("auth/login", credentials);
    return response.data; // Aquí puedes almacenar el token o la respuesta que necesites
  } catch (error) {
    console.error(
      "Error en el inicio de sesión:",
      error.response || error.message
    );
    throw error;
  }
};
// Exporta la función
export default {
  registerUser,
  loginUser,
};
