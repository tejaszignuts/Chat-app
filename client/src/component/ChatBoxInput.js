import React, { useState, useContext } from "react";
import InputEmoji from "react-input-emoji";
import { ChatContext } from "../Context/chatContext";
import { Context } from "../Context/Context";

export default function InputButton() {
  const [text, setText] = useState("");
  const { user } = useContext(Context);
  const { sendTextMessage, currentChat } = useContext(ChatContext);

  return (
    <div className="py-2 bg-slate-700	text-white flex pr-4 justify-center gap-9">
      <InputEmoji
        value={text}
        onChange={setText}
        placeholder="Type a message"
      />
      <button
        className="bg-black px-3 py-1"
        onClick={() => {
          sendTextMessage(text, user, currentChat._id, setText);
        }}
      >
        send
      </button>
    </div>
  );
}
