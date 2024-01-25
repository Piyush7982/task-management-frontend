import React, { useState, useEffect } from "react";
import { IoIosCreate } from "react-icons/io";

import axiosInstance from "../helper/axios.instance";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import TaskCard from "./TaskCard";

function UserPage() {
  const userName = localStorage.getItem("user");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [validForm, setvalidForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const [noTasks, setnoTasks] = useState(false);

  const handletitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handledescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlepriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };
  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    let data = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
    };
    data = JSON.stringify(data);
    try {
      await axiosInstance.post("/task", data);
      setDescription("");
      setTitle("");
      setDueDate("");
      setPriority("");

      setTimeout(() => {
        setShowForm(false);
        setvalidForm(false);
      }, 800);
      setTimeout(() => {
        window.location.reload();
      }, 1500);

      toast.success("Task created", {
        autoClose: 1000,
        theme: "colored",
      });
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

  useEffect(() => {
    if (title.length < 3 || description.length < 3 || dueDate === "") {
      setvalidForm(false);
    } else {
      setvalidForm(true);
    }
  }, [title, description, dueDate, priority]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosInstance.get(
          `/user/tasks/all?page=1&limit=6`
        );
        console.log(response?.data?.Data[0]?.tasks);
        if (response?.data?.Data[0]?.tasks?.length === 0) {
          setnoTasks(true);
        }

        setTimeout(() => {
          setTasks(response?.data?.Data[0]?.tasks);
        }, 1500);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, []);
  const fetchMoreTask = async () => {
    try {
      const res = await axiosInstance.get(
        `/user/tasks/all?page=${index}&limit=6`
      );

      setTimeout(() => {
        setTasks((prevItems) => [...prevItems, ...res?.data?.Data[0]?.tasks]);
      }, 1500);

      if (res?.data?.Data[0]?.tasks > 0) {
        setHasMore(true);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" w-[80%] h-full flex flex-col  overflow-auto py-10 relative">
      <h1 className="font-bold -z-10 text-green-600 flex justify-end mr-10 text-5xl">
        Welcome @{userName}
      </h1>
      {/* <div className="mx-auto w-11/12 grid grid-cols-2 gap-4 pb-7 pt-16 pl-7"> */}
      {noTasks ? (
        <div className="text-3xl h-4/5 bg-black w-7/12 mx-auto mt-14 rounded-3xl font-bold text-white flex flex-col  justify-center items-center">
          No tasks to show. CreateYour First Task
        </div>
      ) : (
        <InfiniteScroll
          dataLength={tasks.length}
          next={fetchMoreTask}
          hasMore={hasMore}
          loader={<Loader />}
        >
          {!noTasks && tasks.length === 0 && <Loader />}
          {!noTasks && (
            <div className="mx-auto w-11/12 grid grid-cols-2 gap-10 pb-7 pt-16 pl-7">
              {tasks.map((task) => (
                <TaskCard data={task} key={task?._id} />
              ))}
            </div>
          )}
        </InfiniteScroll>
      )}
      {/* </div> */}
      <button
        onClick={handleButtonClick}
        className="fixed flex justify-around text-xl items-center bottom-2 right-4 m-4 bg-green-400 hover:scale-105 transition delay-100 hover:bg-slate-200 hover:text-green-700  text-white font-bold py-2 px-4 h-16 w-44 rounded-xl"
      >
        <span>
          <IoIosCreate />
        </span>{" "}
        Create Task
      </button>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={submitForm}
            className="bg-white w-4/12 h-[60%] p-4 rounded-3xl flex flex-col justify-around "
          >
            <h1 className="font-bold  text-4xl border-b-[3px] border-slate-300 text-black">
              Write Your Task
            </h1>
            <div className="flex ml-3 flex-col w-11/12 items-center justify-evenly -space-y-2  h-4/6">
              <input
                type="text"
                required
                id="title"
                value={title}
                maxLength={30}
                placeholder="Enter Title* 3-50 chars"
                onChange={handletitleChange}
                className="border-2 w-10/12 font-extrabold border-gray-800 rounded-md p-2 text-black"
              />
              <textarea
                maxLength={200}
                spellCheck={false}
                type="text"
                required
                id="description"
                value={description}
                placeholder="Enter Description* 3-200 char"
                onChange={handledescriptionChange}
                className="border-2 tracking-tight resize-none w-10/12 overflow-auto flex flex-col min-h-[40%] font-semibold border-gray-800 rounded-md p-2 text-slate-800"
              />
              <div className="flex w-full items-center justify-evenly">
                <select
                  className="font-bold text-lg bg-slate-200 border border-gray-200 text-gray-700 p-2 rounded leading-tight focus:outline-none"
                  id="priority"
                  onChange={handlepriorityChange}
                  defaultValue={priority}
                  defaultChecked="Low"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleDueDateChange}
                  className="font-bold text-lg bg-slate-200 border border-gray-200 text-gray-700 p-2 rounded leading-tight focus:outline-none"
                />
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
  );
}

export function Loader() {
  return (
    <div className=" mt-4 text-center ">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <div className="text-blue-500 mt-3 font-medium ">Loading...</div>
      </div>
    </div>
  );
}

export default UserPage;
