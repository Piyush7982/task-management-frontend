import React, { useState, useEffect } from "react";
import { IoIosCreate } from "react-icons/io";
import axiosInstance from "../helper/axios.instance";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function UserPage() {
  const userName = localStorage.getItem("user");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [validForm, setvalidForm] = useState(false);

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
  const submitForm = (e) => {
    e.preventDefault();
    let data = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
    };
    data = JSON.stringify(data);
    try {
      axiosInstance.post("/task", data);
      setDescription("");
      setTitle("");
      setDueDate("");
      setPriority("");
      setShowForm(false);
      setvalidForm(false);

      toast.success("Task created", {
        autoClose: 3000,
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
    if (
      title === "" ||
      description === "" ||
      dueDate === "" ||
      priority === ""
    ) {
      setvalidForm(false);
    } else {
      setvalidForm(true);
    }
  }, [title, description, dueDate, priority]);

  return (
    <div className=" w-[80%] h-full flex flex-col  overflow-auto py-10 relative">
      <h1 className="font-bold text-green-600 flex justify-end mr-10 text-5xl">
        Welcome @{userName}
      </h1>
      <div className="mx-auto w-11/12 grid grid-cols-2 gap-4 pb-7 pt-16 pl-7">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
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
                placeholder="Enter Title*"
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
                placeholder="Enter Title*"
                onChange={handledescriptionChange}
                className="border-2 tracking-tight resize-none w-10/12 overflow-auto flex flex-col min-h-[40%] font-semibold border-gray-800 rounded-md p-2 text-slate-800"
              />
              <div className="flex w-full items-center justify-evenly">
                <select
                  className="font-bold text-lg bg-slate-200 border border-gray-200 text-gray-700 p-2 rounded leading-tight focus:outline-none"
                  id="priority"
                  onChange={handlepriorityChange}
                  defaultValue={"Low"}
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
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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

function TaskCard() {
  return (
    <div className="w-10/12 h-64 bg-black rounded-2xl shadow-lg shadow-slate-800"></div>
  );
}

export default UserPage;
