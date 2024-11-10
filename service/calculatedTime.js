const calculateDuration = async (origin, destination, vehicleType) => {
  const mode = getVehicleMode(vehicleType); // Obtén el modo de transporte según el tipo de vehículo
  const GOOGLE_MAPS_API_KEY = "AIzaSyD4ZYfbcWceAE9FEXWU4pBq-K4Ys9s0idM";

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${GOOGLE_MAPS_API_KEY}`
    );

    const data = await response.json();

    // Verifica si la API devolvió resultados
    if (data.routes && data.routes.length > 0) {
      const durationInSeconds = data.routes[0].legs[0].duration.value;
      const minutes = Math.round(durationInSeconds / 60);
      return `${minutes} minutos`; // Devuelve la duración en minutos
    } else {
      console.error("No se pudo obtener la ruta");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la ruta:", error);
    return null;
  }
};

const getVehicleMode = (vehicleType) => {
  switch (vehicleType) {
    case "car":
      return "driving";
    case "bike":
      return "bicycling";
    case "walking":
      return "walking";
    default:
      return "driving"; // Valor predeterminado
  }
};

module.exports = calculateDuration;
