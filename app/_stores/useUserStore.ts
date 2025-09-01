/* PLUGINS */
import { create } from "zustand";
/* UTILITIES */
import { createSelectors } from "@app/_utils";

interface UserStore {
  is_add_user_modal_open: boolean;

  setAddUserModal: (is_add_user_modal_open: boolean) => void;
}

const useUserStore = create<UserStore>()((set) => ({
  is_add_user_modal_open: false,
  setAddUserModal: (is_add_user_modal_open) => set({ is_add_user_modal_open }),
}));

export default createSelectors(useUserStore);
