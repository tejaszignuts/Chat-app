import { getRequest, postRequest } from "../utils/services";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChat, setUserChat] = useState(null);
  const [userChatError, setUserChatError] = useState(null);
  const [potentialChats, setPotentialChat] = useState([]);
  const [currentChat, setCurreentChat] = useState(null);

  const [message, setMessage] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const responce = await getRequest(`http://localhost:2000/users/`);
      if (responce.error) {
        // return console.log(responce.message);
      }

      const pChats = responce?.filter((u) => {
        let isChatCreated = false;

        if (userChat) {
          isChatCreated = userChat?.some((chat) => {
            return chat.member[0] === u._id || chat.member[1] === u._id;
          });
        }

        if (user?._id === u._id) {
          return false;
        }

        return !isChatCreated;
      });
      setPotentialChat(pChats);
    };

    getUsers();
  }, [userChat]);

  useEffect(() => {
    const getUserChat = async () => {
      if (user?._id) {
        setUserChatError(null);
        const response = await getRequest(
          `http://localhost:2000/chat/${user?._id}`
        );
        if (response.error) {
          setUserChatError(response);
        }
        setUserChat(response);
      }
    };
    getUserChat();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setMessageError(null);
      const response = await getRequest(
        `http://localhost:2000/msg/${currentChat?._id}`
      );
      if (response.error) {
        setMessageError(response);
      }
      // setMessage(response);
      if (Array.isArray(response)) {
        setMessage(response);
      }
    };
    getMessages();
  }, [currentChat]);

  const getMessages = async () => {
    setMessageError(null);
    const response = await getRequest(
      `http://localhost:2000/msg/${currentChat?._id}`
    );
    if (response.error) {
      setMessageError(response);
    }
    // setMessage(response);
    if (Array.isArray(response)) {
      setTimeout(() => {
        setMessage(response);
      }, 1000);
    }
  };

  useEffect(() => {
    getMessages();
  }, [message]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setText) => {
      if (!textMessage) {
        return console.log("Enter Text Please");
      }

      const responce = await postRequest(
        `http://localhost:2000/msg/`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );
      if (responce.error) {
        setSendTextMessageError(responce);
      }
      setNewMessage(responce);
      setMessage((prev) => {
        return [...prev, responce];
      });
      setText("");
    },
    []
  );

  const updateCurreentChat = useCallback((chat) => {
    setCurreentChat(chat);
  });

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `http://localhost:2000/chat/`,
      JSON.stringify({ firstId, secondId })
    );

    if (response.error) {
      return console.log(response.message);
    }
    setUserChat((prev) => {
      if (prev) {
        return [...prev, response];
      }
      return [response];
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChat,
        userChatError,
        potentialChats,
        createChat,
        updateCurreentChat,
        currentChat,
        message,
        messageError,
        sendTextMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
