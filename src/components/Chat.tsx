import { ChatProps } from '../models/chat.interface';
import { useChatStore } from '../stores/chat.ts';
import { isEmpty } from 'lodash-es';

export const Chat = ({ chat }: ChatProps) => {
  const selectedChat = useChatStore(state => state.selectedChat);
  const { setSelectedChat } = useChatStore(state => state.actions);

  const onHandleClick = () => {
    setSelectedChat(chat);
  };

  return (
    <>
      {
        !isEmpty(chat.dialogues) &&
        <div className={`flex flex-col gap-y-1 m-1 ${selectedChat?.id === chat.id ? 'bg-secondary' : 'bg-neutral'}`}
             onClick={onHandleClick}>
          <span className="self-start">{chat.dialogues?.[0]?.prompt ?? ''}</span>
          <span className="self-end">{chat.modelName}</span>
        </div>
      }
    </>
  );
};
