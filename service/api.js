import axios from "axios";

// Crea la instancia de axios
const api = axios.create({
  baseURL: "http://192.168.101.4:8080/",
});

const registerUser = async (userData) => {
  try {
    const response = await api.post("auth/register", userData);
    console.log("Registro exitoso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error.response || error.message);
    throw error;
  }
};

const loginUser = async (credentials, token) => {
  try {
    const response = await api.post("auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error(
      "Error en el inicio de sesión:",
      error.response || error.message
    );
    throw error;
  }
};

const crearLocalidad = async (data, token) => {
  try {
    const response = await api.post("location", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en la creación de la localidad:", error.response);
    throw error;
  }
};

const crearComuniad = async (data, token) => {
  try {
    const response = await api.post("community", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Comunidad creada con éxito");
    return response.data;
  } catch (error) {
    console.error(
      "Error en la creación de la comunidad:",
      error.response || error.message
    );
    throw error;
  }
};

const consultarComunidad = async (token) => {
  try {
    const response = await api.get(`community`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al consultar la comunidad:", error.response);
    throw error;
  }
};

const consultarTotalUsuarios = async (id, token) => {
  try {
    const response = await api.get(
      `community-user/community/${id}?communityId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al consultar la comunidad:", error.response);
    throw error;
  }
};

const consultarNoticias = async (token, location) => {
  try {
    const response = await api.get(`news/{location}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al consultar las noticias:", error.response);
    throw error;
  }
};

// Exporta las funciones
export default {
  registerUser,
  loginUser,
  crearComuniad,
  crearLocalidad,
  consultarComunidad,
  consultarTotalUsuarios,
  consultarNoticias,
};
