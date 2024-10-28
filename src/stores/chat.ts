import { create } from 'zustand';
import { IChat } from '../models/chat.interface.ts';

export const useChatStore = create<{
  chats: IChat[];
  selectedChat: IChat | null;
  actions: {
    setChats: (chats: IChat[]) => void;
    getChats: () => IChat[];
    setSelectedChat: (chat: IChat) => void;
    getSelectedChat: () => IChat | null;
  }
}>((set, get) => ({
  chats: [] as IChat[],
  selectedChat: null,
  actions: {
    setChats: (chats: IChat[]) => set({ chats }),
    getChats: () => get().chats,
    setSelectedChat: (chat: IChat) => set({ selectedChat: chat }),
    getSelectedChat: () => get().selectedChat,
  },
}));
