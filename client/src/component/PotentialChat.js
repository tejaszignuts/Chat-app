import { useContext } from "react";
import { ChatContext } from "../Context/chatContext";
import { Context } from "../Context/Context";

const PotentialChat = () => {
  const { user } = useContext(Context);
  const { potentialChats, createChat } = useContext(ChatContext);

  return (
    <div>
      <div className="bg-black text-white h-80 overflow-scroll">
        {potentialChats.map((u, index) => {
          return (
            <div
              className="px-2 py-2 text-center border-2 border-gray-300"
              key={index}
              onClick={() => {
                createChat(user?.user?._id, u?._id);
              }}
            >
              {u.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PotentialChat;
