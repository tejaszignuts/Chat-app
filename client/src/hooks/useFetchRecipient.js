import { useEffect, useState } from "react";
import { getRequest } from "../utils/services";

export const UseFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat.member.find(function (id) {
    return id !== user?.user?._id;
  });

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const responce = await getRequest(
        `http://localhost:2000/users/user/${recipientId}`
      );
      if (responce.error) {
        return setError(responce);
      }
      setRecipientUser(responce);
    };
    getUser();
  }, []);

  return { recipientUser, error };
};
