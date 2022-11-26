import create from "zustand";
import {TResponse} from "../models/IResponse";
import {IAdvertisement} from "../models/IAdvertisement";
import DataService from "../services/DataService";

export const useAdvertStore = create<TResponse<IAdvertisement>>((set) => ({
    isLoading: false,
    adverts: [],
    all: [],
    selected: undefined,
    setAdverts: (value) => set((state) => ({
        ...state,
        adverts: DataService.getData("lokimo-dataset-backend-test.json"),
        all: state.adverts
    })),
    setSelected: (item) => set((state) => ({
        ...state,
        selected: item
    })),
}));
