import { useChatStore } from '../stores/chat.ts';
import { useActivatedChatStore } from '../stores/activatedChat.ts';
import { ChangeEvent, FormEvent, useState } from 'react';
import { addDialogueInChat } from '../services/api.ts';
import { isEmpty, isNil } from 'lodash-es';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const PromptInput = () => {
  const queryClient = useQueryClient();

  const [prompt, setPrompt] = useState<string>('');
  const { isNoneSelected } = useChatStore(state => state.actions);
  const { chatDetail } = useActivatedChatStore(state => state);

  const mutation = useMutation({
    mutationFn: (data: { chatId: string, prompt: string }) => addDialogueInChat(data.chatId, data.prompt),
    onMutate: async (newData) => {

      await queryClient.cancelQueries({ queryKey: ['chatDetail'] });
      const previousData = queryClient.getQueryData(['chatDetail']);

      queryClient.setQueryData(['chatDetail'], (oldData) => ({
        ...oldData,
        dialogues: [
          ...(chatDetail?.dialogues || []),
          { id: Date.now().toString(), prompt: newData.prompt, completion: '' },
        ],
      }));

      return { previousData };
    },
    onError: (err, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['chatDetail'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chatDetail'] });
    },
  });

  const onHandleSubmit = async (e: FormEvent) => {
    if (isNil(chatDetail?.id)) {
      return;
    }

    e.preventDefault();

    mutation.mutate({ chatId: chatDetail.id, prompt });

    setPrompt('');
  };

  const onHandlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <>
      <form className="flex flex-row gap-x-1 p-3" onSubmit={onHandleSubmit}>
            <textarea className="w-full resize-none" rows={3} disabled={isNoneSelected()} value={prompt}
                      onChange={onHandlePromptChange} />
        <button disabled={isNoneSelected() || isEmpty(prompt)} type="submit">Submit</button>
      </form>
    </>
  );
};
