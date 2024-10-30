import { Chat } from './Chat.tsx';
import { useChatStore } from '../stores/chat.ts';
import { useEffect } from 'react';
import { addChat, fetchChatList } from '../services/api.ts';
import { useActivatedChatStore } from '../stores/activatedChat.ts';
import { last } from 'lodash-es';

export const ChatList = () => {
  const chats = useChatStore(state => state.chats);
  const { selectedChatModel, chatDetail, isChangedModel } = useActivatedChatStore(state => state);
  const { setChats, setSelectedChat } = useChatStore(state => state.actions);

  useEffect(() => {
    getChatList();
  }, [chatDetail]);

  useEffect(() => {
    setSelectedChat(null);
  }, [isChangedModel]);

  const getChatList = async () => {
    try {
      const response = await fetchChatList();
      setChats(response);
      return response;
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const onHandleClickNewButton = async () => {
    await addChat(selectedChatModel!.id);
    const list = await getChatList();
    setSelectedChat(last(list));
  };

  return (
    <>
      <div className="flex flex-col gap-y-1 w-1/3 border-2 rounded">
        <button className="h-1/10 w-1/4 m-2 self-end" onClick={onHandleClickNewButton}>New</button>
        <div className="h-full overflow-y-auto">
          {
            chats.map((chat) => (
              <Chat key={chat.id} chat={chat} />
            ))
          }
        </div>
      </div>
    </>
  );
};
