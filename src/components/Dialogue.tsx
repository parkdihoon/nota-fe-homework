import { useActivatedChatStore } from '../stores/activatedChat.ts';
import { useChatStore } from '../stores/chat.ts';
import { useEffect, useRef, useState } from 'react';
import { isNil } from 'lodash-es';
import { useFetchChatDetailQuery } from '../hooks/useFetchChatDetailQuery.ts';

export const Dialogue = () => {
  const [isNotAtBottom, setIsNotAtBottom] = useState(false);
  const containerRef = useRef(null as HTMLDivElement | null);
  const { isNoneSelected } = useChatStore(state => state.actions);
  const { setChatDetail } = useActivatedChatStore(state => state.actions);
  const { data, isSuccess, isLoading, isError, error } = useFetchChatDetailQuery();

  useEffect(() => {
    if (isSuccess) {
      setChatDetail(data);
    }
    setIsNotAtBottom(false);
    scrollToBottom();
  }, [data]);

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

  const onHandleClickLatest = () => {
    scrollToBottom();
  };

  if (isLoading) return <div className="flex flex-1 justify-center items-center">Loading...</div>;
  if (isError) return <div className="flex flex-1 justify-center items-center">Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-y-1 flex-1 p-3 overflow-y-auto relative" ref={containerRef}>
      {
        !isNoneSelected() &&
        data?.dialogues?.map((dialogue) => (
          <div className="flex flex-col gap-y-1" key={dialogue.id}>
            <span className="self-end bg-neutral p-2 rounded-lg whitespace-pre-wrap">{dialogue.prompt}</span>
            <span
              className="self-start bg-neutral p-2 rounded-lg whitespace-pre-wrap">{dialogue.completion}</span>
          </div>
        ))
      }
      <button
        className={`sticky bottom-1 left-1/2 w-5 h-5 p-0 text-center leading-5 bg-secondary rounded-full ${isNotAtBottom ? 'inline-block' : 'hidden'}`}
        onClick={onHandleClickLatest}>↓
      </button>
    </div>
  );
};
