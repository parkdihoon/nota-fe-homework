import { describe, expect, it } from 'vitest';
import { render, userEvent } from './test-utils.tsx';
import App from '../App.tsx';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { ModelSelect } from '../components/ModelSelect.tsx';

const renderAndVerifyApp = async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Nota_Model_01', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText('Nota_Model_02', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText('Nota_Model_03', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText('Nota_Model_04', { selector: 'span' })).toBeInTheDocument();
  });

  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(4);
};

describe('[채팅 목록] 테스트', () => {
  it('[현재 채팅] 모델 미선택시, 입력란과 제출 버튼 비활성화', async () => {
    await renderAndVerifyApp();

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);

    items.forEach((item) => {
      expect(item).not.toHaveClass('bg-secondary');
    });

    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeDisabled();
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
  });

  it('[현재 채팅] 모델 초기값은 불러온 모델 목록의 첫 번째', async () => {
    render(<ModelSelect />);

    await waitFor(() => {
      expect(screen.getByText('Nota_Model_01')).toBeInTheDocument();
      expect(screen.getByText('Nota_Model_02')).toBeInTheDocument();
      expect(screen.getByText('Nota_Model_03')).toBeInTheDocument();
      expect(screen.getByText('Nota_Model_04')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    await waitFor(() => {
      expect(select).toBeInTheDocument();
      expect(select.options.length).toBeGreaterThan(0);
    });
    expect(select.value).toBe('test-model-001');
  });

  it('[현재 채팅] 모델을 변경하면 입력란, 채팅 내역, 현재 선택된 채팅도 초기화', async () => {
    await renderAndVerifyApp();

    const targetChat = screen.getAllByRole('listitem')[0];
    act(() => {
      userEvent.click(targetChat);
    });
    await waitFor(() => {
      expect(targetChat).toHaveClass('bg-secondary');
    });

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    await waitFor(() => {
      expect(select).toBeInTheDocument();
      expect(select.options.length).toBeGreaterThan(0);
    });
    expect(select.value).toBe('test-model-002');

    act(() => {
      fireEvent.change(select, { target: { value: 'test-model-003' } });
    });
    expect(select.value).toBe('test-model-003');

    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeDisabled();

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();

    const paragraphs = screen.queryAllByRole('paragraph');
    expect(paragraphs).toHaveLength(0);

    const targetChatList = screen.getAllByRole('listitem');
    targetChatList.forEach((chat) => {
      expect(chat).toBeInTheDocument();
      expect(chat).not.toHaveClass('bg-secondary');
    });
  });

  it('[현재 채팅] 채팅 목록에 새로운 채팅이 추가되는 시점은 새로운 질문이 제출된 이후', async () => {
    await renderAndVerifyApp();

    const targetButton = screen.getByRole('button', { name: 'New' });
    act(() => {
      userEvent.click(targetButton);
    });

    const textArea = screen.getByRole('textbox') as HTMLTextAreaElement;
    await waitFor(() => {
      expect(textArea).not.toBeDisabled();
    });
    act(() => {
      fireEvent.change(textArea, { target: { value: 'Hello, this is a test message.' } });
    });
    expect(textArea.value).toBe('Hello, this is a test message.');

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    act(() => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(5);
    });

  });
});
