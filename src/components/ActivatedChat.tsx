import { useEffect, useState } from 'react';
import { useChatStore } from '../stores/chat';
import { ChatModel, IChat } from '../models/chat.interface.ts';
import { fetchChatDetail, fetchChatModels } from '../services/api.ts';

export const ActivatedChat = () => {
  const [chatDetail, setChatDetail] = useState<IChat | null>(null);
  const [chatModels, setChatModels] = useState<ChatModel[]>([]);
  const selectedChat = useChatStore(state => state.selectedChat);

  useEffect(() => {
    const getChatDetail = async () => {
      if (selectedChat) {
        try {
          const detail = await fetchChatDetail(selectedChat.id);
          setChatDetail(detail);
        } catch (e: unknown) {
          console.error(e);
        }
      }
    };

    const getChatModel = async () => {
      if (selectedChat) {
        try {
          const response = await fetchChatModels();
          setChatModels(response);
        } catch (e: unknown) {
          console.error(e);
        }
      }
    };

    getChatDetail();
    getChatModel();
  }, [selectedChat]);

  return (
    <>
      <div className="h-full w-2/3 border-2 rounded flex flex-col p-4">
        <div className="p-3">
          <select className="w-1/4" name="modelName" disabled={!chatDetail} value={chatDetail?.modelName}>
            <option value="">--Please select an option --</option>
            {
              chatModels.map((model) => (
                <option key={model.id} value={model.name}>{model.name}</option>
              ))
            }
          </select>
        </div>
        <div className="flex flex-col gap-y-1 flex-1 p-3">
          {
            chatDetail?.dialogues?.map((dialogue) => (
              <div className="flex flex-col gap-y-1" key={dialogue.id}>
                <span className="self-end bg-neutral p-2 rounded-lg">{dialogue.prompt}</span>
                <span
                  className="self-start bg-neutral p-2 rounded-lg before:content-['N'] before:mr-2">{dialogue.completion}</span>
              </div>
            ))
          }
        </div>
        <div className="flex flex-row p-3">
          <textarea className="w-full resize-none" rows={3} cols={100} disabled={!chatDetail}/>
          <button disabled={!chatDetail}>Submit</button>
        </div>
      </div>
    </>
  );
};
