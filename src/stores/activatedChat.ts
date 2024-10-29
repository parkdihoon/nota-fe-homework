import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatModel, IChat } from '../models/chat.interface.ts';

export const useActivatedChatStore = create(
  devtools<{
    chatDetail: IChat | null;
    chatModels: ChatModel[];
    selectedChatModel: ChatModel | null;
    actions: {
      setChatDetail: (chatDetail: IChat | null) => void;
      setChatModels: (chatModels: ChatModel[]) => void;
      setSelectedChatModel: (selectedChatModel: ChatModel | null) => void;
    }
  }>((set) => ({
      chatDetail: null,
      chatModels: [],
      selectedChatModel: null,
      actions: {
        setChatDetail: (chatDetail: IChat | null) => set({ chatDetail }),
        setChatModels: (chatModels: ChatModel[]) => set({ chatModels }),
        setSelectedChatModel: (selectedChatModel: ChatModel | null) => set({ selectedChatModel }),
      },
    }
  )),
);
