import { ModelSelect } from './ModelSelect.tsx';
import { Dialogue } from './Dialogue.tsx';
import { PromptInput } from './PromptInput.tsx';

export const ActivatedChat = () => {

  return (
    <>
      <div className="h-full w-2/3 border-2 rounded flex flex-col p-4">
        <ModelSelect />
        <Dialogue />
        <PromptInput />
      </div>
    </>
  );
};
