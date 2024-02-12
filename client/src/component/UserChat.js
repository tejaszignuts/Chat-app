import { useContext, useState } from "react";
import { UseFetchRecipient } from "../hooks/useFetchRecipient";
import { ChatContext } from "../Context/chatContext";

const UserChat = ({ chat, user }) => {
  const { recipientUser, error } = UseFetchRecipient(chat, user);
  const { updateCurreentChat } = useContext(ChatContext);

  return (
    <div
      className="w-full  text-center  py-2 border-2 border-stone-200"
      onClick={() => {
        updateCurreentChat(chat);
      }}
    >
      {recipientUser?.name}
    </div>
  );
};

export default UserChat;
