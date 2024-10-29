import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IChat } from '../models/chat.interface.ts';


export const useChatStore = create(
  devtools<{
    chats: IChat[];
    selectedChat: IChat | null;
    actions: {
      setChats: (chats: IChat[]) => void;
      setSelectedChat: (chat: IChat | null) => void;
    }
  }>((set) => ({
    chats: [] as IChat[],
    selectedChat: null,
    actions: {
      setChats: (chats: IChat[]) => set({ chats }),
      setSelectedChat: (chat: IChat | null) => set({ selectedChat: chat }),
    },
  })),
);
