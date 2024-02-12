// Chatbox Component
import { useState, useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import { ChatContext } from "../Context/chatContext";
import InputButton from "./ChatBoxInput";

const Chatbox = () => {
  const { user } = useContext(Context);
  const { currentChat, message, messageError } = useContext(ChatContext);

  if (!currentChat) {
    return (
      <div>
        <p style={{ textAlign: "center", width: "100%" }}>
          No Conversation Yet ...
        </p>
      </div>
    );
  }

  if (currentChat) {
    // Render chat messages here
    if (messageError?.error) {
      return (
        <>
          <div className="text-center py-2 bg-slate-700	text-white"></div>
          <div className="bg-slate-900 w-96 h-96 text-white overflow-scroll"></div>
          <div>
            <InputButton />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="text-center py-2 bg-slate-700	text-white"></div>
          <div className="bg-slate-900 w-96 h-96 text-white overflow-scroll">
            <div className="flex flex-col	 gap-3 px-2 py-2">
              {message?.map((msg, index) => {
                return (
                  <div
                    className={`${
                      msg?.senderId === user?.id
                        ? "bg-slate-600 inline-block	 px-1 py-1	items-end"
                        : "bg-slate-600 inline-block	 px-1 py-1	items-start"
                    }`}
                  >
                    <div>{msg.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <InputButton />
          </div>
        </>
      );
    }
  }
};

export default Chatbox;
