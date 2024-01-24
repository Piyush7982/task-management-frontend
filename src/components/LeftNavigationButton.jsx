import { NavLink, Link } from "react-router-dom";
import { FaTasks, FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { RiTodoFill } from "react-icons/ri";

function NavigationButtons() {
  return (
    <div className=" bg-green-500 overflow-hidden mt-2 h-screen  w-[20%] flex flex-col items-center   ">
      <RiTodoFill color="white" size={50} className="my-10" />
      <div className=" mt-2   w-10/12 h-[70%] flex flex-col items-center justify-center gap-y-8 ">
        <Buttons
          navigate="/user"
          name="userpage"
          Icon={FaUser}
          color={"white"}
          isEnd="true"
          isReplace={true}
        />

        <Buttons
          navigate="/user/profile"
          name="profile"
          Icon={FaUser}
          color={"white"}
        />
        <Link
          to="/login"
          replace={true}
          onClick={() => {
            localStorage.clear();
            document.cookie =
              "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }}
          className="flex bg-slate-800 w-4/5 capitalize justify-evenly text-slate-100 font-semibold items-center   text-2xl rounded-2xl text-center px-2 py-3    transition   hover:scale-110 ease-in-out"
        >
          <span>
            <BiLogOut />
          </span>
          Logout{" "}
        </Link>
      </div>
    </div>
  );
}

const Buttons = ({ name, Icon, color, navigate, isEnd, isReplace }) => {
  return (
    <NavLink
      end={isEnd}
      replace={isReplace}
      className={({ isActive }) => {
        return isActive
          ? " flex justify-evenly  text-white bg-green-800 capitalize font-bold  items-center   text-2xl rounded-2xl text-center px-2 py-3 w-4/5 "
          : " flex justify-evenly bg-slate-800 capitalize  text-slate-100 font-semibold items-center   text-2xl rounded-2xl text-center px-2 py-3 w-4/5    transition   hover:scale-110 ease-in-out";
      }}
      to={navigate}
    >
      <Icon color={color} />
      {name}
    </NavLink>
  );
};

export default NavigationButtons;
