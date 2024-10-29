import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IChat } from '../models/chat.interface.ts';

export const useActivatedChatStore = create(
  devtools<{
    chatDetail: IChat | null;
    actions: {
      setChatDetail: (chatDetail: IChat) => void;
    }
  }>(( set ) => ({
      chatDetail: null,
      actions: {
        setChatDetail: (chatDetail: IChat) => set({ chatDetail }),
      }
    }
  ))
);
