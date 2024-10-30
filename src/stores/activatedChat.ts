import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatModel, IChat } from '../models/chat.interface.ts';

export const useActivatedChatStore = create(
  devtools<{
    chatDetail: IChat | null;
    selectedChatModel: ChatModel | null;
    isChangedModel: boolean;
    actions: {
      setChatDetail: (chatDetail: IChat | null) => void;
      setSelectedChatModel: (selectedChatModel: ChatModel | null) => void;
      setIsChangedModel: (isChangedModel: boolean) => void;
    }
  }>((set) => ({
      chatDetail: null,
      selectedChatModel: null,
      isChangedModel: false,
      actions: {
        setChatDetail: (chatDetail: IChat | null) => set({ chatDetail: chatDetail }),
        setSelectedChatModel: (selectedChatModel: ChatModel | null) => set({ selectedChatModel }),
        setIsChangedModel: (isChangedModel: boolean) => set({ isChangedModel }),
      },
    }
  )),
);
