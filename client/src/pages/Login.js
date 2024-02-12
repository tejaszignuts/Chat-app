import { useContext } from "react";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";
import Error from "./Error";

const Login = () => {
  const { userLogin, updateUserLogin, loginUser, loginError } =
    useContext(Context);
  return (
    <div className="py-24 flex flex-col gap-10 items-center justify-center">
      <form>
        <div className="flex items-center justify-center flex-col border-2 border-sky-500 px-5 py-16 rounded-md	">
          <div className="py-5">
            <input
              className="border-2 border-sky-500 w-60 px-5 py-2"
              type="text"
              placeholder="Email"
              onChange={(e) => {
                updateUserLogin({ ...userLogin, email: e.target.value });
              }}
            />
          </div>
          <div className="py-5">
            <input
              className="border-2 border-sky-500 w-60 px-5 py-2"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                updateUserLogin({ ...userLogin, password: e.target.value });
              }}
            />
          </div>
          <div className="pt-10">
            <Link
              className="bg-sky-500/50 py-2 px-10"
              onClick={loginUser}
              to={"/"}
            >
              {" "}
              Login
            </Link>
          </div>
        </div>
      </form>
      {loginError?.error ? <Error props={loginError.message} /> : <></>}
    </div>
  );
};

export default Login;
