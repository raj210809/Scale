import { createAuthSlice } from "./slice/auth.slice";
import { createChatSlice } from "./slice/chat.slice";
import { create } from "zustand";

export const useAppStore = create()((...a) => ({
    ...createAuthSlice(a[0]),
    ...createChatSlice(a[0], a[1]),
}));
