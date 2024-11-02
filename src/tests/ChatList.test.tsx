import { describe, expect, it } from 'vitest';
import { ChatList } from '../components/ChatList.tsx';
import { render, userEvent } from './test-utils.tsx';
import { act, screen, waitFor } from '@testing-library/react';
import App from '../App.tsx';

const renderAndVerifyChatList = async () => {
  render(<ChatList />);

  await waitFor(() => {
    expect(screen.getByText('Nota_Model_01')).toBeInTheDocument();
    expect(screen.getByText('Nota_Model_02')).toBeInTheDocument();
    expect(screen.getByText('Nota_Model_03')).toBeInTheDocument();
    expect(screen.getByText('Nota_Model_04')).toBeInTheDocument();
  });

  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(4);
};

describe('[채팅 목록] 테스트', () => {
  it('[채팅 목록] 전체 채팅 목록 표시', async () => {
    await renderAndVerifyChatList();
  });

  it('[채팅 목록] 선택된 채팅 표시', async () => {
    await renderAndVerifyChatList();

    const targetChat = screen.getByText('Nota_Model_01');
    act(() => {
      userEvent.click(targetChat);
    });

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      const targetChatItem = items[1];
      expect(targetChatItem).toHaveClass('bg-secondary');
    });
  });

  it('[채팅 목록] New 버튼 생성', () => {
    render(<ChatList />);

    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });

  it('[채팅 목록] New 버튼 클릭 시, 우측 채팅 내역 초기화 및 현재 선택된 채팅 비활성화', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Nota_Model_01')).toBeInTheDocument();
      expect(screen.getByText('Nota_Model_02')).toBeInTheDocument();
      expect(screen.getByText('Nota_Model_03')).toBeInTheDocument();
      expect(screen.getByText('Nota_Model_04')).toBeInTheDocument();
    });

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);

    const targetChat = screen.getByText('Nota_Model_01', { selector: 'span' }).closest('li');
    if (targetChat) {
      act(() => {
        userEvent.click(targetChat);
      });
    }

    const targetChatItem = items[1];
    await waitFor(() => {
      expect(targetChatItem).toHaveClass('bg-secondary');
    });

    const targetButton = screen.getByRole('button', { name: 'New' });
    act(() => {
      userEvent.click(targetButton);
    });

    await waitFor(() => {
      expect(targetChatItem).toHaveClass('bg-neutral');
    });
  });
});
