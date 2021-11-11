import create from "zustand";
import { objectMap } from "../../objectMap";

type BaseUri = string;

type CacheyUri = string;

type CacheyUris = Record<BaseUri, CacheyUri>;

type CacheyUriStoreState = {
  cacheyUris: CacheyUris;
  initialize: (baseUri: BaseUri) => void;
  revalidate: (baseUri: BaseUri) => void;
  revalidateAll: () => void;
  set: (baseUri: BaseUri, cacheyUri: CacheyUri) => void;
  get: (baseUri: BaseUri) => CacheyUri;
  getAll: () => CacheyUris;
};

export const useCacheyUriStore = create<CacheyUriStoreState>((set, get) => ({
  cacheyUris: {},
  initialize: (baseUri: BaseUri) => {
    console.log("initializing", baseUri);
    if (!(baseUri in get().cacheyUris)) {
      get().revalidate(baseUri);
    }
  },
  revalidate: (baseUri: BaseUri) => {
    console.log("revalidating", baseUri);
    set((state) => ({
      cacheyUris: {
        ...state.cacheyUris,
        [baseUri]: `${baseUri}?${new Date().getTime()}`,
      },
    }));
  },
  revalidateAll: () =>
    set((state) => ({
      cacheyUris: objectMap(
        state.cacheyUris,
        (_, baseUri) => `${baseUri}?${new Date().getTime()}`
      ),
    })),
  get: (baseUri: BaseUri) => {
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
