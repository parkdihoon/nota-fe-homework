import { useEffect, useState } from 'react';
import { fetchChatModels } from '../services/api.ts';
import { ChatModel } from '../models/chat.interface.ts';
import { useChatStore } from '../stores/chat.ts';
import { useActivatedChatStore } from '../stores/activatedChat.ts';

export const ModelSelect = () => {
  const [chatModels, setChatModels] = useState<ChatModel[]>([]);
  const selectedChat = useChatStore(state => state.selectedChat);
  const chatDetail = useActivatedChatStore(state => state.chatDetail);

  useEffect(() => {
    const getChatModel = async () => {
      if (selectedChat) {
        try {
          const response = await fetchChatModels();
          setChatModels(response);
        } catch (e: unknown) {
          console.error(e);
        }
      }
    };

    getChatModel();
  }, [selectedChat]);

  return (
    <>
      <select className="w-1/4" name="modelName" disabled={!chatDetail} value={chatDetail?.modelName}>
        <option value="">--Please select an option --</option>
        {
          chatModels.map((model) => (
            <option key={model.id} value={model.name}>{model.name}</option>
          ))
        }
      </select>
    </>
  );
};
