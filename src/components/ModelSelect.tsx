import { ChangeEvent, useEffect } from 'react';
import { fetchChatModels } from '../services/api.ts';
import { useChatStore } from '../stores/chat.ts';
import { useActivatedChatStore } from '../stores/activatedChat.ts';
import { first, isEmpty } from 'lodash-es';
import { useQuery } from '@tanstack/react-query';

export const ModelSelect = () => {
  const selectedChat = useChatStore(state => state.selectedChat);
  const { setSelectedChat } = useChatStore(state => state.actions);
  const { selectedChatModel } = useActivatedChatStore(state => state);
  const { setSelectedChatModel } = useActivatedChatStore(state => state.actions);
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ['chatModels'],
    queryFn: () => fetchChatModels(),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const selectModel = isEmpty(selectedChat) ? first(data) : data?.find((model) => model.id === selectedChat.modelId);
    setSelectedChatModel(selectModel ?? null);
  }, [selectedChat, isSuccess]);

  const onHandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = data?.find((model) => model.id === e.target.value);
    setSelectedChatModel(selectedModel ?? null);
    setSelectedChat(null);
  };

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error: {error.message}</>;

  return (
    <div className="p-3">
      <select className="w-1/4" name="modelName" value={selectedChatModel?.id} onChange={onHandleChange}>
        <option value="">--Please select an option --</option>
        {
          data?.map((model) => (
            <option key={model.id} value={model.id}>{model.name}</option>
          ))
        }
      </select>
    </div>
  );
};
