import { useActivatedChatStore } from '../stores/activatedChat.ts';
import { useChatStore } from '../stores/chat.ts';

export const Dialogue = () => {
  const { isNonSelected } = useChatStore(state => state.actions);
  const chatDetail = useActivatedChatStore(state => state.chatDetail);

  return (
    <>
      {
        !isNonSelected() &&
        chatDetail?.dialogues?.map((dialogue) => (
          <div className="flex flex-col gap-y-1" key={dialogue.id}>
            <span className="self-end bg-neutral p-2 rounded-lg">{dialogue.prompt}</span>
            <span
              className="self-start bg-neutral p-2 rounded-lg">{dialogue.completion}</span>
          </div>
        ))
      }
    </>
  );
};
