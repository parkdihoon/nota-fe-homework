import { useActivatedChatStore } from '../stores/activatedChat.ts';
import { useChatStore } from '../stores/chat.ts';
import { useEffect, useRef, useState } from 'react';
import { isNil } from 'lodash-es';

export const Dialogue = () => {
  const [isNotAtBottom, setIsNotAtBottom] = useState(false);
  const containerRef = useRef(null as HTMLDivElement | null);
  const { isNoneSelected } = useChatStore(state => state.actions);
  const chatDetail = useActivatedChatStore(state => state.chatDetail);

  useEffect(() => {
    setIsNotAtBottom(false);
    scrollToBottom();
  }, [chatDetail]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (!isNil(containerRef?.current?.scrollTop)) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const isScrolledToBottom = container.scrollTop + container.clientHeight < container.scrollHeight;
      setIsNotAtBottom(isScrolledToBottom);
    }
  };

  const onHandleLatest = () => {
    scrollToBottom();
  };

  return (
    <div className="flex flex-col gap-y-1 flex-1 p-3 overflow-y-auto relative" ref={containerRef}>
      {
        !isNoneSelected() &&
        chatDetail?.dialogues?.map((dialogue) => (
          <div className="flex flex-col gap-y-1" key={dialogue.id}>
            <span className="self-end bg-neutral p-2 rounded-lg whitespace-pre-wrap">{dialogue.prompt}</span>
            <span
              className="self-start bg-neutral p-2 rounded-lg whitespace-pre-wrap">{dialogue.completion}</span>
          </div>
        ))
      }
      <button
        className={`sticky bottom-1 left-1/2 w-5 h-5 p-0 text-center leading-5 bg-secondary rounded-full ${isNotAtBottom ? 'inline-block' : 'hidden'}`}
        onClick={onHandleLatest}>↓
      </button>
    </div>
  );
};
