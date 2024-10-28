import './App.css';
import { ChatList } from './components/ChatList.tsx';
import { ActivatedChat } from './components/ActivatedChat.tsx';


function App() {

  return (
    <>
      <div className="h-full w-full flex flex-row gap-x-1">
        <ChatList/>
        <ActivatedChat/>
      </div>
    </>
  );
}

export default App;
