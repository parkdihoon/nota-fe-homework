import { useQuery } from '@tanstack/react-query';
import { fetchChatDetail } from '../services/api.ts';
import useChatStore from '../stores/useChatStore.ts';
import { useEffect } from 'react';
import { isNil } from 'lodash-es';

export const useFetchChatDetailQuery = () => {
  const { selectedChat } = useChatStore(state => state);

  const result = useQuery({
    queryKey: ['chatDetail'],
    queryFn: () => fetchChatDetail(selectedChat?.id),
    enabled: !!selectedChat?.id,
  });

  useEffect(() => {
    if (!isNil(selectedChat?.id)) {
      result.refetch();
    }
  }, [selectedChat]);


  return result;
};
