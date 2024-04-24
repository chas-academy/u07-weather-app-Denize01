import { create } from "zustand";

//set används som en konkatenerings funktion som gör att vi inte behöver skriva en uppdatering på något? det förminskar mängden kod
export const useUserLocationStore = create((set) => ({
  userLocation: {
    latitude: 0,
    longitude: 0,
  },

  //en metod:
  updateUserLocation: (updatedLocation: any) =>
    set({ userLocation: updatedLocation }),
}));
