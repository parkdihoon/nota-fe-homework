import { ChatProps } from '../models/chat.interface';
import { useChatStore } from '../stores/chat.ts';

export const Chat = ({ chat }: ChatProps) => {
  const { setSelectedChat } = useChatStore(state => state.actions);

  const onHandleClick = () => {
    setSelectedChat(chat);
  };

  return (
    <>
      <div className="flex flex-col gap-y-1 m-1 bg-neutral" onClick={onHandleClick}>
        <span className="self-start">{chat.dialogues?.[0].prompt ?? ''}</span>
        <span className="self-end">{chat.modelName}</span>
      </div>
    </>
  );
};
