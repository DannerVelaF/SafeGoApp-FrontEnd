import { create } from "zustand";

export const useUserStore = create((set) => ({
  userData: null, // Aquí guardamos la información del usuario
  setUser: (userData) => set({ userData }), // Función para actualizar `userData`
  clearUser: () => set({ userData: null }), // Función para eliminar la información del usuario
}));

export const useLanguageStore = create((set) => ({
  languageData: "es", // Idioma inicial (español)
  setLanguage: (languageData) => set({ languageData }), // Cambiar el idioma
  toggleLanguage: () =>
    set((state) => ({
      languageData: state.languageData === "es" ? "qu" : "es", // Alternar entre español y quechua
    })), // Cambiar entre idiomas
}));
