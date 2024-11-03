import useChatStore from '../stores/useChatStore.ts';
import useActivatedChatStore from '../stores/useActivatedChatStore.ts';
import { ChangeEvent, FormEvent, useState } from 'react';
import { addDialogueInChat } from '../services/api.ts';
import { isEmpty, isNil, last } from 'lodash-es';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IChat } from '../models/chat.interface.ts';

export const PromptInput = () => {
  const queryClient = useQueryClient();

  const [prompt, setPrompt] = useState<string>('');
  const { selectedChat } = useChatStore(state => state);
  const { chatDetail } = useActivatedChatStore(state => state);

  const mutation = useMutation({
    mutationFn: (data: { chatId: string, prompt: string }) => addDialogueInChat(data.chatId, data.prompt),
    onMutate: async (newData) => {

      await queryClient.cancelQueries({ queryKey: ['chatDetail'] });
      const previousChatDetail = queryClient.getQueryData(['chatDetail']);

      queryClient.setQueryData(['chatDetail'], (oldData: IChat) => ({
        ...oldData,
        dialogues: [
          ...(chatDetail?.dialogues || []),
          { id: Date.now().toString(), prompt: newData.prompt, completion: '' },
        ],
      }));

      const previousChatList = queryClient.getQueryData(['chatDetail']);
      queryClient.setQueryData(['chatList'], (oldChatList: IChat[]) => {
        const updatedChatList = [...oldChatList];
        const lastChat = last(updatedChatList);
        if (lastChat) {
          lastChat.dialogues = [...lastChat.dialogues, {
            id: Date.now().toString(),
            prompt: newData.prompt,
            completion: '',
          }];
        }
        return updatedChatList;
      });

      return { previousChatDetail, previousChatList };
    },
    onError: (_err, _newData, context) => {
      if (context?.previousChatDetail) {
        queryClient.setQueryData(['chatDetail'], context.previousChatDetail);
      }
      if (context?.previousChatList) {
        queryClient.setQueryData(['chatList'], context.previousChatList);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chatDetail'] });
      queryClient.invalidateQueries({ queryKey: ['chatList'] });
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
            <textarea className="w-full resize-none" rows={3} disabled={selectedChat === null} value={prompt}
                      onChange={onHandlePromptChange} />
        <button disabled={selectedChat === null || isEmpty(prompt)} type="submit">Submit</button>
      </form>
    </>
  );
};
