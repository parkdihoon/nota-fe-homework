import { ChatProps } from '../models/chat.interface';
import useChatStore from '../stores/useChatStore.ts';
import { first, isNil } from 'lodash-es';

export const Chat = ({ chat }: ChatProps) => {
  const { selectedChat, setSelectedChat } = useChatStore(state => state);

  const onHandleClick = () => {
    setSelectedChat(chat);
  };

  return (
    <>
      {
        !isNil(first(chat.dialogues)?.prompt) &&
        <li
          className={`flex flex-col gap-y-1 m-1 cursor-pointer ${selectedChat?.id === chat.id ? 'bg-secondary' : 'bg-neutral'}`}
          onClick={onHandleClick}>
          <span className="self-start">{chat.dialogues?.[0]?.prompt ?? ''}</span>
          <span className="self-end">{chat.modelName}</span>
        </li>
      }
    </>
  );
};
