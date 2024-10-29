export interface IChat {
  id: string;
  modelId: string;
  modelName: string;
  dialogues: IDialogue[];
}

export interface IDialogue {
  id: string;
  prompt: string;
  completion: string;
}

export interface ChatProps {
  chat: IChat;
}

export interface ChatModel {
  id: string;
  name: string;
}
