import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";

const Header = () => {
  const { user, userLogout } = useContext(Context);
  return (
    <div className="sm:py-5 sm:px-20 flex justify-between px-5 pt-5 pb-5 bg-slate-800 text-white item-center">
      <div className=" py-1">
        <a className="text-xl" href="/">
          ChatAPP
        </a>
      </div>
      <div className="flex sm:gap-10 gap-3">
        <Link to={"/login"}>
          {user ? (
            <></>
          ) : (
            <button className="bg-white text-black  sm:px-6  px-2 py-1">
              Login
            </button>
          )}
        </Link>
        <Link to={"/register"}>
          {user ? (
            <Link
              className="bg-white text-black sm:px-6  px-2 py-1"
              onClick={() => userLogout()}
              to={"/login"}
            >
              Logout
            </Link>
          ) : (
            <button className="bg-white text-black sm:px-6  px-2 py-1">
              Register
            </button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
