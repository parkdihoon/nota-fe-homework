import { useChatStore } from '../stores/chat.ts';
import { useActivatedChatStore } from '../stores/activatedChat.ts';
import { ChangeEvent, FormEvent, useState } from 'react';
import { addDialogueInChat, fetchChatDetail } from '../services/api.ts';
import { isNil } from 'lodash-es';

export const PromptInput = () => {
  const [prompt, setPrompt] = useState<string>('');
  const selectedChat = useChatStore(state => state.selectedChat);
  const { isNoneSelected } = useChatStore(state => state.actions);
  const { chatDetail } = useActivatedChatStore(state => state);
  const { setChatDetail } = useActivatedChatStore(state => state.actions);

  const onHandleSubmit = async (e: FormEvent) => {
    if (isNil(selectedChat?.id) || isNil(prompt)) {
      return;
    }

    e.preventDefault();

    const updatedChatDetail = {
      ...chatDetail,
      dialogues: [
        ...(chatDetail?.dialogues || []),
        { id: Date.now().toString(), prompt, completion: '' },
      ],
    };
    setChatDetail(updatedChatDetail);

    await addDialogueInChat(selectedChat.id, prompt);
    const newChatDetail = await fetchChatDetail(selectedChat.id);
    setChatDetail(newChatDetail);

    setPrompt('');
  };

  const onHandlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <>
      <form className="flex flex-row gap-x-1" onSubmit={onHandleSubmit}>
            <textarea className="w-full resize-none" rows={3} disabled={isNoneSelected()} value={prompt}
                      onChange={onHandlePromptChange} />
        <button disabled={isNoneSelected()} type="submit">Submit</button>
      </form>
    </>
  );
};
