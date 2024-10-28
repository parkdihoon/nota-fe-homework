import { IChatListResponse } from '../models/chat.interface.ts';

export const fetchChatList = async (): Promise<IChatListResponse> => {
  const response = await fetch('/chats');
  return response.json();
};
