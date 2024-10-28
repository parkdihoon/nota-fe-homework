export interface IChat {
  id: number;
  modelId: number;
  modelName: string;
  dialogues: IDialogue[];
}

export interface IDialogue {
  id: number;
  prompt: string;
  completion: string;
}

export interface ChatProps {
  chat: IChat;
}

export interface ChatModel {
  id: number;
  name: string;
}
