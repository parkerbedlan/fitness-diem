import create from "zustand";
import { objectMap } from "../../objectMap";

type BaseUri = string;

type CacheyUri = string;

type CacheyUris = Record<BaseUri, CacheyUri>;

type CacheyState = {
  cacheyUris: CacheyUris;
  initialize: (baseUri: BaseUri) => void;
  revalidate: (baseUri: BaseUri) => void;
  revalidateAll: () => void;
  set: (baseUri: BaseUri, cacheyUri: CacheyUri) => void;
  get: (baseUri: BaseUri) => CacheyUri;
  getAll: () => CacheyUris;
};

export const useCacheyUriStore = create<CacheyState>((set, get) => ({
  cacheyUris: {},
  initialize: (baseUri: BaseUri) => {
    if (baseUri in get().cacheyUris) return;
    get().revalidate(baseUri);
  },
  revalidate: (baseUri: BaseUri) =>
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
        (_, baseUri) => `${baseUri}?${new Date()}`
      ),
    })),
  get: (baseUri: BaseUri) => {
    get().initialize(baseUri);
    return get().cacheyUris[baseUri];
  },
  set: (baseUri: BaseUri, cacheyUri: CacheyUri) =>
    set((state) => ({
      cacheyUris: {
        ...state.cacheyUris,
        [baseUri]: cacheyUri,
      },
    })),
  getAll: () => get().cacheyUris,
}));
