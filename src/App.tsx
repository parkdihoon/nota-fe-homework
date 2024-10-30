import './App.css';
import { ChatList } from './components/ChatList.tsx';
import { ActivatedChat } from './components/ActivatedChat.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full w-full flex flex-row gap-x-1">
        <ChatList />
        <ActivatedChat />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
