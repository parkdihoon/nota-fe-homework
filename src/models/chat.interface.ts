export interface IChat {
  id: number
  modelId: number
  modelName: string
  dialogues: IDialogue[]
}

export interface IDialogue {
  id: number
  prompt: string
  completion: string
}

export interface IChatListResponse {
  data: IChat[];
}
