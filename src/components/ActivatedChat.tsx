import { ModelSelect } from './ModelSelect.tsx';
import { Dialogue } from './Dialogue.tsx';
import { PromptInput } from './PromptInput.tsx';
import { useEffect } from 'react';
import { fetchChatDetail } from '../services/api.ts';
import { useChatStore } from '../stores/chat.ts';
import { useActivatedChatStore } from '../stores/activatedChat.ts';

export const ActivatedChat = () => {
  const selectedChat = useChatStore(state => state.selectedChat);
  const { setChatDetail } = useActivatedChatStore(state => state.actions);

  useEffect(() => {
    const getChatDetail = async () => {
      if (selectedChat) {
        try {
          const detail = await fetchChatDetail(selectedChat.id);
          setChatDetail(detail);
        } catch (e: unknown) {
          console.error(e);
        }
      }
    };

    getChatDetail();
  }, [selectedChat]);

  return (
    <>
      <div className="h-full w-2/3 border-2 rounded flex flex-col p-4">
        <ModelSelect />
        <Dialogue />
        <PromptInput />
      </div>
    </>
  );
};
