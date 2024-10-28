import { IChat } from '../models/chat.interface';

export const Chat = ({ id, modelId, modelName, dialogues }: IChat) => {
  return (
    <>
      <div className="flex flex-col gap-y-1 m-1 bg-neutral">
        <span className="self-start">{dialogues?.[0].prompt ?? ''}</span>
        <span className="self-end">{modelName}</span>
      </div>
    </>
  );
};
