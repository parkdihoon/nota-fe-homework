import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatModel, IChat } from '../models/chat.interface.ts';

export const useActivatedChatStore = create(
  devtools<{
    chatDetail: IChat | null;
    selectedChatModel: ChatModel | null;
    actions: {
      setChatDetail: (chatDetail: IChat | null) => void;
      setSelectedChatModel: (selectedChatModel: ChatModel | null) => void;
    }
  }>((set) => ({
      chatDetail: null,
      selectedChatModel: null,
      actions: {
        setChatDetail: (chatDetail: IChat | null) => set({ chatDetail: chatDetail }),
        setSelectedChatModel: (selectedChatModel: ChatModel | null) => set({ selectedChatModel }),
      },
    }
  )),
);
