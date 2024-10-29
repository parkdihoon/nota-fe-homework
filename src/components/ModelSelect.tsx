import { ChangeEvent, useEffect } from 'react';
import { fetchChatModels } from '../services/api.ts';
import { useChatStore } from '../stores/chat.ts';
import { useActivatedChatStore } from '../stores/activatedChat.ts';
import { first, isEmpty } from 'lodash-es';

export const ModelSelect = () => {
  const selectedChat = useChatStore(state => state.selectedChat);
  const { chatModels, selectedChatModel } = useActivatedChatStore(state => state);
  const { setChatModels, setSelectedChatModel } = useActivatedChatStore(state => state.actions);

  useEffect(() => {
    const getChatModel = async () => {
      try {
        const response = await fetchChatModels();
        setChatModels(response);
        if (isEmpty(selectedChat)) {
          setSelectedChatModel(first(response));
        } else {
          const selectModel = response.find((model) => model.id === selectedChat.modelId)
          setSelectedChatModel(selectModel);
        }
      } catch (e: unknown) {
        console.error(e);
      }
    };

    getChatModel();
  }, [selectedChat]);

  const onHandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = chatModels.find((model) => model.id === e.target.value);
    setSelectedChatModel(selectedModel);
  };

  return (
    <>
      <select className="w-1/4" name="modelName" value={selectedChatModel?.id} onChange={onHandleChange}>
        <option value="">--Please select an option --</option>
        {
          chatModels.map((model) => (
            <option key={model.id} value={model.id}>{model.name}</option>
          ))
        }
      </select>
    </>
  );
};
