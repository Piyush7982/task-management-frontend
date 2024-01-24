import { useState, useEffect } from "react";
import axiosInstance from "../helper/axios.instance";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function TaskCard({ data }) {
  const {
    title,
    description,
    dueDate,
    priority,
    completed,
    _id,
    createdAt,
    updatedAt,
  } = data;
  const [completedTask, setCompletedTask] = useState(completed);
  const [showForm, setShowForm] = useState(false);
  const [Title, setTitle] = useState(title);
  const [Description, setDescription] = useState(description);
  const [DueDate, setDueDate] = useState(dueDate);
  const [Priority, setPriority] = useState(priority);
  const [validForm, setvalidForm] = useState(false);
  const navigate = useNavigate();

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
      title: Title,
      description: Description,
      dueDate: DueDate,
      priority: Priority,
    };
    data = JSON.stringify(data);
    try {
      axiosInstance.put(`/task/${_id}`, data);

      toast.success("Task updated", {
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
  const handleCompleted = () => {
    try {
      axiosInstance.put(`/task/${_id}`, { completed: !completedTask });
      setCompletedTask((prev) => !prev);
      toast.success("Task updated", {
        autoClose: 1000,
        theme: "colored",
      });

      setTimeout(() => {
        window.location.reload();
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
  const handleDelete = () => {
    try {
      axiosInstance.delete(`/task/${_id}`);
      toast.success("Task deleted", {
        autoClose: 1000,
        theme: "colored",
      });
      setTimeout(() => {
        setShowForm(false);
      }, 800);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
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
    if (Title.length < 3 || Description.length < 3 || DueDate === "") {
      setvalidForm(false);
    } else {
      setvalidForm(true);
    }
  }, [Title, Description, DueDate, Priority]);

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
  return (
    <div className="w-10/12 h-[22rem] bg-black  shadow-lg shadow-slate-800 flex flex-col ">
      <div className="flex justify-around pt-3 border-b-[1px] border-slate-500 items-center w-full h-[20%] px-4">
        <div className="flex  justify-around w-full h-full pb-2  items-center">
          <button
            className={
              completedTask
                ? "hover:scale-105 -ml-5 mr-5 transition delay-100 hover:bg-red-300 hover:text-white  text-red-200  font-bold py-1 px-3 rounded-xl"
                : "hover:scale-105 -ml-5 mr-5 transition delay-100 hover:bg-green-400 hover:text-white  text-green-200  font-bold py-1 px-3 rounded-xl"
            }
            onClick={() => {
              setCompletedTask((prev) => !prev);
              handleCompleted();
            }}
          >
            {!completedTask ? (
              <MdDone size={25} color="green" />
            ) : (
              <RxCross2 size={25} color="red" />
            )}
          </button>
          <span
            className={
              priority === "High"
                ? "text-xl font-bold bg-red-200 text-red-500 rounded-2xl px-3 py-1 "
                : "text-xl font-bold bg-orange-200 text-orange-500 rounded-2xl px-3 py-1 "
            }
          >
            {priority}
          </span>
          <span
            className={
              !completed
                ? "text-xl font-bold bg-red-200 text-red-500 rounded-2xl px-3 py-1"
                : "text-xl font-bold bg-green-200 text-green-500 rounded-2xl px-3 py-1 "
            }
          >
            {completed ? "Completed" : "Pending"}
          </span>

          <button
            onClick={handleButtonClick}
            className="hover:scale-105 ml-3 rounded-xl py-1 px-3 hover:bg-slate-500"
          >
            <MdOutlineEdit size={22} color="white" />
          </button>
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <form
                onSubmit={submitForm}
                className="bg-white w-4/12 h-[60%] p-4 rounded-3xl flex flex-col justify-around "
              >
                <h1 className="font-bold  text-4xl border-b-[3px] border-slate-300 text-black">
                  Update Your Task
                </h1>
                <div className="flex ml-3 flex-col w-11/12 items-center justify-evenly -space-y-2  h-4/6">
                  <input
                    type="text"
                    required
                    id="title"
                    value={Title}
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
                    value={Description}
                    placeholder="Enter Description* 3-200 char"
                    onChange={handledescriptionChange}
                    className="border-2 tracking-tight resize-none w-10/12 overflow-auto flex flex-col min-h-[40%] font-semibold border-gray-800 rounded-md p-2 text-slate-800"
                  />
                  <div className="flex w-full items-center justify-evenly">
                    <select
                      className="font-bold text-lg bg-slate-200 border border-gray-200 text-gray-700 p-2 rounded leading-tight focus:outline-none"
                      id="priority"
                      onChange={handlepriorityChange}
                      defaultValue={Priority}
                      defaultChecked="Low"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    <input
                      type="date"
                      id="dueDate"
                      value={DueDate}
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
      </div>
      <div className="flex flex-col text-white py-2   w-11/12 mx-auto   h-5/6 px-4">
        <h1 className="text-xl w-full h-1/5 font-bold   ">{title}</h1>
        <p className="text-lg px-2 py-1  h-4/5  text-slate-100 w-full rounded-lg overflow-auto border-[1px] border-slate-400">
          {description}
        </p>
      </div>
      <div className="flex py-2 tracking-tight font-semibold text-sm  justify-around items-center w-full">
        <span className="  text-red-400">
          Due:{" "}
          {new Date(dueDate)?.toLocaleString("default", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <span className="  text-green-400">
          Created: {modifyDate(createdAt)}
        </span>
        <span className="   text-green-400">
          Last Updated: {modifyDate(updatedAt)}
        </span>
      </div>
    </div>
  );
}
export default TaskCard;
