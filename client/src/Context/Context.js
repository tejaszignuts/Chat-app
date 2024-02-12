import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const userDtails = localStorage.getItem("User");
    const userJson = JSON.parse(userDtails);
    setUser(userJson);
  }, []);

  const userLogout = useCallback(() => {
    localStorage.removeItem("User");
    setUser({});
  }, []);

  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const updateUserRegister = useCallback((data) => {
    setUserRegister(data);
  }, []);

  const updateUserLogin = useCallback((data) => {
    setUserLogin(data);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      const response = await postRequest(
        `${baseUrl}/register`,
        JSON.stringify(userRegister)
      );
      setIsRegisterLoading(false);
      if (response?.error) {
        return setRegisterError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [userRegister]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
      const response = await postRequest(
        `${baseUrl}/login`,
        JSON.stringify(userLogin)
      );
      setIsLoginLoading(false);
      if (response?.error) {
        return setLoginError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [userLogin]
  );

  return (
    <Context.Provider
      value={{
        user,
        userRegister,
        updateUserRegister,
        registerUser,
        registerError,
        isRegisterLoading,
        userLogout,
        userLogin,
        updateUserLogin,
        loginUser,
        loginError,
        isLoginLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};
