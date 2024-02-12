import { useEffect, useContext } from "react";
import { Context } from "../Context/Context";
import Error from "./Error";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    user,
    userRegister,
    updateUserRegister,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(Context);

  return (
    <div className="py-24  	flex-col	flex items-center justify-center">
      <form>
        <div className="flex items-center justify-center flex-col border-2 border-sky-500 px-5 py-16 rounded-md	">
          <div className="py-5">
            <input
              className="border-2 border-sky-500 w-96	 px-5 py-2"
              type="text"
              placeholder="Name"
              onChange={(e) => {
                updateUserRegister({ ...userRegister, name: e.target.value });
              }}
            />
          </div>
          <div className="py-5">
            <input
              className="border-2 border-sky-500 w-96	 px-5 py-2"
              type="text"
              placeholder="Email"
              onChange={(e) => {
                updateUserRegister({ ...userRegister, email: e.target.value });
              }}
            />
          </div>
          <div className="py-5">
            <input
              className="border-2 border-sky-500 w-96	 px-5 py-2"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                updateUserRegister({
                  ...userRegister,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <div className="pt-10">
            <Link
              className="bg-sky-500/50 py-2 px-10"
              onClick={registerUser}
              to={"/"}
            >
              {isRegisterLoading ? "Creating Account" : "Register"}
            </Link>
          </div>
        </div>
      </form>

      {registerError?.error ? <Error props={registerError.message} /> : <></>}
    </div>
  );
};

export default Register;
