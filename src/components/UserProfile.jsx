import axiosInstance from "../helper/axios.instance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const [Data, setData] = useState({});
  const [name, setName] = useState("");

  const [password, setpassword] = useState("");
  const [occupation, setOccupation] = useState("Student");
  const [showForm, setShowForm] = useState(false);
  const [validForm, setvalidForm] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };

  const handleOccupation = (e) => {
    setOccupation(e.target.value);
  };
  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  useEffect(() => {
    if (name?.length < 3 || password?.length < 8) {
      setvalidForm(false);
    } else {
      setvalidForm(true);
    }
  }, [name, password]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axiosInstance.get("/user/");

        setTimeout(() => {
          setData(response.data.Data);
        }, 1000);
      } catch (error) {
        if (error.message.includes("Network Error")) {
          navigate("/oops", { state: { from: "/user" }, replace: true });
        }
        console.log(error);
        toast.error("Error Occured", {
          autoClose: 3000,
          theme: "colored",
        });
        return;
      }
    }
    getData();
  }, []);
  const submitForm = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      password: password,
      occupation: occupation,
    };
    data = JSON.stringify(data);
    try {
      await axiosInstance.put(`/user/`, data);

      toast.success("User updated", {
        autoClose: 1000,
        theme: "colored",
      });
      setTimeout(() => {
        setShowForm(false);
        setvalidForm(false);
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (error.message.includes("Network Error")) {
        navigate("/oops", { state: { from: "/user" }, replace: true });
      }
      console.log(error);
      toast.error("Error Occured", {
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
  };

  function modifyDate(current) {
    const date = new Date() - new Date(current);
    const days = Math.floor(date / (1000 * 60 * 60 * 24));
    const hours = Math.floor(date / (1000 * 60 * 60));
    const minutes = Math.floor(date / (1000 * 60));
    const seconds = Math.floor(date / 1000);
    const month = new Date(current)?.toLocaleString("default", {
      month: "short",
      day: "numeric",
    });

    return days > 1
      ? `${month}`
      : days === 1
      ? "Yesterday"
      : hours >= 1
      ? `${hours}h`
      : minutes >= 1
      ? `${minutes}m`
      : `${seconds}s`;
  }
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/user/`);

      toast.success("User deleted", {
        autoClose: 1000,
        theme: "colored",
      });
      setTimeout(() => {
        setShowForm(false);
      }, 500);
      setTimeout(() => {
        localStorage.clear();

        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      if (error.message.includes("Network Error")) {
        navigate("/oops", { state: { from: "/user" }, replace: true });
      }
      console.log(error);
      toast.error("Error Occured", {
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
  };
  return (
    <>
      {Data?.name ? (
        <div className="w-[80%] h-full flex flex-col justify-between overflow-hidden py-10 relative">
          <h1 className="font-bold text-green-600 flex items-center justify-center text-5xl">
            User Profile
          </h1>
          <div className="h-4/5 w-9/12 mx-auto bg-green-600 flex flex-col justify-center items-center rounded-3xl py-5 px-10">
            <div className="flex flex-col w-8/12 h-4/5 bg-black pl-10 pr-10 mx-auto rounded-3xl  justify-center space-y-4">
              <div className="flex  justify-between gap-x-10 text-white text-2xl">
                <h2 className="font-bold text-2xl text-green-300">Name:</h2>
                <span className="font-bold text-xl tracking-wide">
                  {Data?.name}
                </span>
              </div>
              <div className="flex  justify-between gap-x-10 text-white text-2xl">
                <h2 className="font-bold text-2xl text-green-300">userName:</h2>
                <span className="font-bold text-xl tracking-wide">
                  {Data?.userName}
                </span>
              </div>
              <div className="flex  justify-between gap-x-10 text-white text-2xl">
                <h2 className="font-bold text-2xl text-green-300">Email:</h2>
                <span className="font-bold text-xl tracking-wide">
                  {Data?.email}
                </span>
              </div>
              <div className="flex  justify-between gap-x-10 text-white text-2xl">
                <h2 className="font-bold text-2xl text-green-300">
                  Occupation:
                </h2>
                <span className="font-bold text-xl tracking-wide">
                  {Data?.occupation}
                </span>
              </div>
              <div className="flex  justify-between gap-x-10 text-white text-2xl">
                <h2 className="font-bold text-2xl text-green-300">Role:</h2>
                <span className="font-bold text-xl tracking-wide">
                  {Data?.role} User
                </span>
              </div>
              <div className="flex  justify-between gap-x-10 text-white text-2xl">
                <h2 className="font-bold text-2xl text-green-300">Since:</h2>
                <span className="font-bold text-xl tracking-wide">
                  {modifyDate(Data?.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <button
            className="fixed bottom-5 right-5"
            onClick={handleButtonClick}
          >
            <MdOutlineEdit size={40} color="green" />
          </button>
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <form
                onSubmit={submitForm}
                className="bg-white w-4/12 h-[60%] p-4 rounded-3xl flex flex-col justify-around "
              >
                <h1 className="font-bold  text-4xl border-b-[3px] border-slate-300 text-black">
                  Update User
                </h1>
                <div className="flex ml-3 flex-col w-11/12 items-center justify-evenly -space-y-2  h-4/6">
                  <input
                    type="text"
                    required
                    id="name"
                    value={name}
                    maxLength={20}
                    placeholder="Enter Name* 3-20 chars"
                    onChange={handleName}
                    className="border-2 w-10/12 font-extrabold border-gray-800 rounded-md p-2 text-black"
                  />
                  <input
                    maxLength={20}
                    spellCheck={false}
                    type="text"
                    required
                    id="password"
                    value={password}
                    placeholder="Enter Password* 8-20 char"
                    onChange={handlePassword}
                    className="border-2 tracking-tight resize-none w-10/12 overflow-auto flex flex-col  font-semibold border-gray-800 rounded-md p-2 text-slate-800"
                  />
                  <div className="flex w-full items-center justify-evenly">
                    <select
                      className="font-bold text-lg bg-slate-200 border border-gray-200 text-gray-700 p-2 rounded leading-tight focus:outline-none"
                      id="occupation"
                      onChange={handleOccupation}
                      value={occupation}
                      defaultChecked={occupation}
                    >
                      <option value="Student">Student</option>
                      <option value="Business">Business</option>
                      <option value="Service">Service</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="flex mx-auto  h-14 w-10/12  justify-center  items-center">
                  <button
                    type="submit"
                    disabled={!validForm}
                    className={
                      validForm
                        ? "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        : "bg-slate-500 text-slate-300 font-bold py-2 px-4 rounded"
                    }
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      ) : (
        <ShimmerCard />
      )}
    </>
  );
}

function ShimmerCard() {
  return (
    <div className=" mt-36 h-3/5 w-7/12 mx-auto bg-green-600 flex flex-col justify-center items-center rounded-3xl py-5 px-10 animate-pulse">
      <div className="w-9/12 h-4/5 mb-5 mt-5 mx-auto bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-lg border-[0.1px] border-slate-700 flex flex-col justify-between py-3">
        <div className="mx-auto bg-slate-600 min-h-16 w-9/12 rounded-lg mb-3"></div>
        <div className="mx-auto bg-slate-600 min-h-16 w-9/12 rounded-lg mb-3"></div>
        <div className="mx-auto bg-slate-600 min-h-16 w-9/12 rounded-lg mb-3"></div>
        <div className="mx-auto bg-slate-600 min-h-16 w-9/12 rounded-lg mb-3"></div>
      </div>
    </div>
  );
}
export default UserProfile;
