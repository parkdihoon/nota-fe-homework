import { Chat } from './Chat.tsx';
import useChatStore from '../stores/useChatStore.ts';
import { useEffect } from 'react';
import { addChat, fetchChatList } from '../services/api.ts';
import useActivatedChatStore from '../stores/useActivatedChatStore.ts';
import { last } from 'lodash-es';
import { useQuery } from '@tanstack/react-query';

export const ChatList = () => {
  const { selectedChat, setSelectedChat } = useChatStore(state => state);
  const { selectedChatModel, isChangedModel } = useActivatedChatStore(state => state);

  const {data: chatList, refetch} = useQuery({
    queryKey: ['chatList'],
    queryFn: fetchChatList
  });

  useEffect(() => {
    refetch()
  }, [selectedChat]);

  useEffect(() => {
    setSelectedChat(null);
  }, [isChangedModel]);

  const onHandleClickNewButton = async () => {
    await addChat(selectedChatModel!.id);
    refetch().then(({data}) => setSelectedChat(last(data) ?? null));
  };

  return (
    <>
      <div className="flex flex-col gap-y-1 w-1/3 border-2 rounded">
        <button className="h-1/10 w-1/4 m-2 self-end" onClick={onHandleClickNewButton}>New</button>
        <ul className="h-full overflow-y-auto">
          {
            chatList?.map((chat) => (
              <Chat key={chat.id} chat={chat} />
            ))
          }
        </ul>
      </div>
    </>
  );
};
