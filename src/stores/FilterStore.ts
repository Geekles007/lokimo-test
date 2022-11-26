import create from "zustand";
import {IFilterResponse} from "../models/IFilterResponse";

export const useFilterStore = create<IFilterResponse>((set) => ({
    radius: 0,
    point: null,
    coordinates: undefined,
    setRadius: (value) => set(state => ({})),
    setPoint: (point) => set(state => ({})),
    setCoordinates: (value) => set(state => ({})),
}))
