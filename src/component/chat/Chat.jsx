import React, { useEffect, useState } from 'react';
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
import '@zegocloud/zimkit-react/index.css';
import { APP_ID, APP_SECRET } from './Constants';

const id = Math.floor(Math.random() * 1000);

function Chat() {
  const [state, setState] = useState({
    appConfig: {
      appID: APP_ID,
      serverSecret: APP_SECRET,
    },
    userInfo: {
      userID: `Aqilah${id}`,
      userName: `Aqilah${id}`,
      userAvatarUrl: '',
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        const zimKit = new ZIMKitManager();
        const token = zimKit.generateKitTokenForTest(
          state.appConfig.appID,
          state.appConfig.serverSecret,
          state.userInfo.userID
        );

        // Add a catch block at the top-level to handle any unhandled promise rejections
        zimKit.init(state.appConfig.appID)
          .then(() => zimKit.connectUser(state.userInfo, token))
          .catch((error) => {
            console.error('Unhandled promise rejection:', error);
          });
      } catch (error) {
        console.error('Error occurred during initialization:', error);
      }
    };
    init();
  }, []);

  return (
    <div>
      Welcome back
      <Common></Common>
    </div>
  );
}

export default Chat;
