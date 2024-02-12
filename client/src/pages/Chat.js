import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import { Context } from "../Context/Context";
import UserChat from "../component/UserChat";
import PotentialChat from "../component/PotentialChat";
import Chatbox from "../component/Chatbox";
const Chat = () => {
  const [createUser, setCreateUser] = useState(false);
  const { user } = useContext(Context);
  console.log("User", user);
  const { userChat, userChatError } = useContext(ChatContext);

  return (
    <>
      <div className="flex justify-center py-10">
        <h1>Welcome {user?.user?.name}</h1>
      </div>

      <div className="flex justify-center gap-9 py-10">
        <div className="w-2/12">
          <button
            className="w-full px-2 py-2 bg-black text-white border-2 border-slate-200"
            onClick={() => {
              if (createUser === false) {
                setCreateUser(true);
              } else {
                setCreateUser(false);
              }
            }}
          >
            New User
          </button>
          <div className="pt-5">{createUser ? <PotentialChat /> : <></>}</div>
        </div>
        <div>
          <div>
            <div className="w-60 bg-black text-white h-96	overflow-scroll	">
              {userChat?.map((userChat, index) => {
                return <UserChat chat={userChat} key={index} user={user} />;
              })}
            </div>
          </div>
        </div>
        <div>
          <Chatbox />
        </div>
      </div>
    </>
  );
};

export default Chat;
