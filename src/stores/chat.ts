import { create } from 'zustand';
import { IChat } from '../models/chat.interface.ts';

export const useChatStore = create<{
  chats: IChat[];
  actions: {
    setChats: (chats: IChat[]) => void;
    getChats: () => IChat[];
  }
}>((set, get) => ({
  chats: [] as IChat[],
  actions: {
    setChats: (chats: IChat[]) => set({ chats }),
    getChats: () => get().chats,
  },
}));
