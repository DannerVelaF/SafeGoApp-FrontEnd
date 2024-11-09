import { create } from "zustand";

export const useUserStore = create((set) => ({
  userData: null, // Aquí guardamos la información del usuario
  setUser: (userData) => set({ userData }), // Función para actualizar `userData`
  clearUser: () => set({ userData: null }), // Función para eliminar la información del usuario
}));
