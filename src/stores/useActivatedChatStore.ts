import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatModel, IChat } from '../models/chat.interface.ts';

type State = {
  chatDetail: IChat | null;
  selectedChatModel: ChatModel | null;
  isChangedModel: boolean;
}

type Action = {
  setChatDetail: (chatDetail: IChat | null) => void;
  setSelectedChatModel: (selectedChatModel: ChatModel | null) => void;
  setIsChangedModel: (isChangedModel: boolean) => void;
}

const store = (set: (state: Partial<State & Action>) => void) => ({
    chatDetail: null,
    selectedChatModel: null,
    isChangedModel: false,
    setChatDetail: (chatDetail: IChat | null) => set({ chatDetail: chatDetail }),
    setSelectedChatModel: (selectedChatModel: ChatModel | null) => set({ selectedChatModel }),
    setIsChangedModel: (isChangedModel: boolean) => set({ isChangedModel }),
  }
);

const useActivatedChatStore = create<State & Action>()(
  process.env.NODE_ENV !== 'production' ? store : devtools<State & Action>(store),
);

export default useActivatedChatStore;
