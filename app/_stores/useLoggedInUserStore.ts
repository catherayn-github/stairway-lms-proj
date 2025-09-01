/* PLUGINS */
import { create } from "zustand";
/* UTILITIES */
import { createSelectors } from "@app/_utils";
import { User } from "@app/_entities/interface/user.interface";

interface LoggedInUserStore {
  currentUser: User | null;
  setLoggedInUser: (user: User) => void;
  logoutUser: () => void;
}

const useLoggedInUserStore = create<LoggedInUserStore>()((set) => ({
  currentUser: null,

  setLoggedInUser: (user) => set({ currentUser: user }),

  logoutUser: () => set({ currentUser: null }),
}));

export default createSelectors(useLoggedInUserStore);
