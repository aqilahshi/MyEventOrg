import { useLocation } from 'react-router-dom';
import Chat from './Chat';

const ChatPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
//   const sessionID = searchParams.get('sessionID');
//   const vendorID = searchParams.get('vendorID');

    const sessionID = ('PoMlIn3Ov7qBL89oUF2D');
    const vendorID = ('F7IO8jpjgGa9WZxKQTIH');

  return (
    <div>
      <Chat sender={sessionID} receiver={vendorID} />
    </div>
  );
};

export default ChatPage;
