import { ChatModel, IChat } from '../models/chat.interface.ts';
import { renameFields } from '../utils/renameFields.ts';

const fetchInterceptor = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchChatList = async (): Promise<IChat[]> => {
  const data = await fetchInterceptor('/chats');
  const fieldMappings = {
    chat_id: 'id',
    chat_model_id: 'modelId',
    chat_model_name: 'modelName',
    dialogue_id: 'id',
  };
  return renameFields<IChat[]>(data, fieldMappings);
};

export const fetchChatDetail = async (chatId: number): Promise<IChat> => {
  const data = await fetchInterceptor(`/chats/${chatId}`);
  const fieldMappings = {
    chat_id: 'id',
    chat_model_id: 'modelId',
    chat_model_name: 'modelName',
    dialogue_id: 'id',
  };
  return renameFields<IChat>(data, fieldMappings);
};

export const fetchChatModels = async (): Promise<ChatModel[]> => {
  const data = await fetchInterceptor('/chat_model');
  const fieldMappings = {
    chat_model_id: 'id',
    chat_model_name: 'name',
  };
  return renameFields<ChatModel[]>(data, fieldMappings);
};

export const addDialogueInChat = async (chatId: number, prompt: string): Promise<IChat> => {
  const data = await fetchInterceptor(`/chats/${chatId}/dialogues`, {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
  const fieldMappings = {
    chat_id: 'id',
    chat_model_id: 'modelId',
    chat_model_name: 'modelName',
    dialogue_id: 'id',
  };
  return renameFields<IChat>(data, fieldMappings);
}

export const addChat = async (modelId: number): Promise<IChat> => {
  const data = await fetchInterceptor('/chats', {
    method: 'POST',
    body: JSON.stringify({ chat_model_id: modelId }),
  });
  const fieldMappings = {
    chat_id: 'id',
    chat_model_id: 'modelId',
    chat_model_name: 'modelName',
    dialogue_id: 'id',
  };
  return renameFields<IChat>(data, fieldMappings);
}
