import create, { SetState, GetState } from "zustand";
import { objectMap } from "../utils/objectMap";

type BaseUri = string;

type CacheyUri = string;

type CacheyUris = Record<BaseUri, CacheyUri>;

type CacheyState = {
  cacheyUris: CacheyUris;
  revalidate: (baseUri: string) => void;
  revalidateAll: () => void;
  getCacheyUri: (baseUri: string) => string;
  getAll: () => CacheyUris;
};

export const useCacheyUriStore = create<CacheyState>((set, get) => ({
  cacheyUris: {},
  revalidate: (baseUri: string) =>
    set((state) => ({
      cacheyUris: {
        ...state.cacheyUris,
        [baseUri]: `${baseUri}?${new Date()}`,
      },
    })),
  revalidateAll: () =>
    set((state) => ({
      cacheyUris: objectMap(
        state.cacheyUris,
        (_cacheyUri, baseUri) => `${baseUri}?${new Date()}`
      ),
    })),
  getCacheyUri: (baseUri: string) => get().cacheyUris[baseUri],
  getAll: () => get().cacheyUris,
}));
