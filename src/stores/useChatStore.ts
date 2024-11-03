import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IChat } from '../models/chat.interface.ts';

type State = {
  chats: IChat[];
  selectedChat: IChat | null;
}

type Action = {
  setSelectedChat: (chat: IChat | null) => void;
}

const store = (set: (state: Partial<State & Action>) => void) => ({
  chats: [] as IChat[],
  selectedChat: null,
  setSelectedChat: (chat: IChat | null) => set({ selectedChat: chat }),
});

const useChatStore = create<State & Action>()(
  process.env.NODE_ENV !== 'production' ? devtools<State & Action>(store) : store,
);

export default useChatStore;
