import { Chat } from './Chat.tsx';
import { useChatStore } from '../stores/chat.ts';
import { useEffect } from 'react';
import { renameFields } from '../utils/renameFields.ts';
import { IChat } from '../models/chat.interface.ts';
import { fetchChatList } from '../services/api.ts';

export const ChatList = () => {
  const chats = useChatStore(state => state.chats);
  const { setChats } = useChatStore(state => state.actions);

  useEffect(() => {
    const getChatList = async () => {
      try {
        const response = await fetchChatList();
        const fieldMappings = {
          chat_id: 'id',
          chat_model_id: 'modelId',
          chat_model_name: 'modelName',
          dialogue_id: 'id',
        };
        const renameData = renameFields<IChat[]>(response.data, fieldMappings);
        setChats(renameData);
      } catch (e: unknown) {
        console.error(e);
      }
    };

    getChatList();
  }, [setChats]);

  return (
    <>
      <div className="h-full w-1/3 border-2 rounded overflow-y-auto">
        {
          chats.map((chat) => (
            <Chat key={chat.id} id={chat.id} modelName={chat.modelName} dialogues={chat.dialogues} />
          ))
        }
      </div>
    </>
  );
};
