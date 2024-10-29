import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CHATS: Record<string, any>[] = [
  {
    chat_model_id: 'test-model-002',
    chat_model_name: 'Nota_Model_02',
    chat_id: uuidv4(),
    dialogues: [
      {
        dialogue_id: uuidv4(),
        prompt: 'Hello world!',
        completion: 'Hello!',
      },
      {
        dialogue_id: uuidv4(),
        prompt: 'Nota Frontend Homework Test',
        completion: 'Nota Frontend Homework',
      },
    ],
  },
  {
    chat_model_id: 'test-model-001',
    chat_model_name: 'Nota_Model_01',
    chat_id: uuidv4(),
    dialogues: [
      {
        dialogue_id: uuidv4(),
        prompt: '초기 데이터 입니다.',
        completion: '초기 데이터 입니다.',
      },
    ],
  },
  {
    chat_model_id: 'test-model-003',
    chat_model_name: 'Nota_Model_03',
    chat_id: uuidv4(),
    dialogues: [
      {
        dialogue_id: uuidv4(),
        prompt: '초기 데이터 입니다.',
        completion: '초기 데이터 입니다.',
      },
    ],
  },
  {
    chat_model_id: 'test-model-004',
    chat_model_name: 'Nota_Model_04',
    chat_id: uuidv4(),
    dialogues: [
      {
        dialogue_id: uuidv4(),
        prompt: 'Hello world!',
        completion: 'Hello!',
      },
      {
        dialogue_id: uuidv4(),
        prompt: 'How are you?',
        completion: 'I am fine, thank you!',
      },
      {
        dialogue_id: uuidv4(),
        prompt: 'What is your name?',
        completion: 'My name is Chatbot.',
      },
      {
        dialogue_id: uuidv4(),
        prompt: 'What do you do?',
        completion: 'I assist with various tasks.',
      },
      {
        dialogue_id: uuidv4(),
        prompt: 'Can you help me?',
        completion: 'Of course, what do you need help with?',
      },
      {
        dialogue_id: uuidv4(),
        prompt: 'Tell me a joke.',
        completion: 'Why did the scarecrow win an award? Because he was outstanding in his field!',
      },
      {
        dialogue_id: uuidv4(),
        prompt: 'What is the weather like?',
        completion: 'I am not sure, but you can check a weather app.',
      },
      {
        dialogue_id: uuidv4(),
        prompt: 'What is 2 + 2?',
        completion: '2 + 2 is 4.',
      },
      {
        dialogue_id: uuidv4(),
        prompt: 'What is the capital of France?',
        completion: 'The capital of France is Paris.',
      },
      {
        dialogue_id: uuidv4(),
        prompt: 'Goodbye!',
        completion: 'Goodbye! Have a great day!',
      }
    ],
  },
];

export const CHAT_MODELS = [
  {
    chat_model_id: 'test-model-001',
    chat_model_name: 'Nota_Model_01',
  },
  {
    chat_model_id: 'test-model-002',
    chat_model_name: 'Nota_Model_02',
  },
  {
    chat_model_id: 'test-model-003',
    chat_model_name: 'Nota_Model_03',
  },
  {
    chat_model_id: 'test-model-004',
    chat_model_name: 'Nota_Model_04',
  },
];
