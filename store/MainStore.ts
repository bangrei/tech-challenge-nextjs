import { create } from "zustand";
import { getBanners, getShortcuts, getCollections } from "@/lib/services";

interface MainState {
  loading: boolean;
  scrollUp: boolean;
  banners: any[];
  shortcuts: any[];
  collections: any[];
  mainCollection: any | null;
  activeFooterId: Number;
  setFooterId: (id: Number) => void;
  setBanners: (payload: any[]) => void;
  setShortcuts: (payload: any[]) => void;
  setCollections: (payload: any[]) => void;
  setMainCollection: (payload: any) => void;
  retrieveData: () => void;
}

export const useMainStore = create<MainState>((set, get) => ({
  loading: true,
  scrollUp: false,
  banners: [],
  shortcuts: [],
  collections: [],
  mainCollection: null,
  activeFooterId: 0,
  setFooterId: (id: Number) => {
    set({ activeFooterId: id });
  },
  setBanners: (payload: any[]) => {
    set({ banners: payload });
  },
  setShortcuts: (payload: any[]) => {
    set({ shortcuts: payload });
  },
  setCollections: (payload: any[]) => {
    set({ collections: payload });
  },
  setMainCollection: (payload: any) => {
    set({ mainCollection: payload });
  },
  retrieveData: async () => {
    set({loading: true})
    const res: any = await getBanners();
    const res2: any = await getShortcuts();
    const res3: any = await getCollections();

    set({ banners: res });
    set({ shortcuts: res2 });

    var collections: any[] = [];
    if (res3 && res3.items.length) {
      for (var it in res3.items) {
        if (res3.items[it].type == "SINGLE" && res3.items[it].viewType == "TILE") collections.push(res3.items[it])
      }
    }
    set({ collections: collections });

    const mainCollection = collections.length ? collections[0] : null;
    if (collections.length) collections.splice(0, 1);
    set({ mainCollection: mainCollection });
    set({ loading: false });
  },
}));
