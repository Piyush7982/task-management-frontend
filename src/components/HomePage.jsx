// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-bold text-green-600 my-8">
//           Welcome to Our Task Manager
//         </h1>
//         <p className="text-green-700 mb-8">
//           Manage your tasks efficiently and effectively. Stay organized and keep
//           track of your to-do list.
//         </p>
//         <div className="grid grid-cols-3 gap-4">
//           <div className="col-span-1 bg-green-500 p-4 rounded shadow-lg">
//             <h2 className="text-2xl font-bold text-white">Task 1</h2>
//             <p className="text-white">Some information about Task 1.</p>
//           </div>
//           {/* Add more tasks as needed */}
//         </div>
//         <div className="flex justify-center my-8">
//           <button className="bg-green-600 text-white px-4 py-2 rounded mr-4 hover:bg-green-700">
//             Sign Up
//           </button>
//           <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//             Sign In
//           </button>
//         </div>
//         <div className="my-8">
//           <h2 className="text-2xl font-bold text-green-600">About Us</h2>
//           <p className="text-green-700">
//             We are a team of dedicated professionals committed to helping you
//             manage your tasks. Our platform is designed to be user-friendly and
//             efficient, making task management a breeze.
//           </p>
//         </div>
//         <div className="my-8">
//           <h2 className="text-2xl font-bold text-green-600">Contact Us</h2>
//           <p className="text-green-700">
//             Have questions or need help? Contact us at support@taskmanager.com.
//             We're here to help!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

import { func } from "prop-types";

// export default HomePage;

// import React from "react";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       <div className="container mx-auto px-4">
//         <h1 className="text-5xl font-bold text-green-600 my-8 text-center">
//           TaskManager
//         </h1>
//         <p className="text-green-700 mb-8 text-center">
//           Welcome to TaskManager, your one-stop solution for managing tasks
//           efficiently and effectively. Stay organized and keep track of your
//           to-do list with ease.
//         </p>
//         <div className="my-8">
//           <h2 className="text-2xl font-bold text-green-600">Benefits</h2>
//           <ul className="list-disc list-inside text-green-700">
//             <li>Manage your tasks in one place</li>
//             <li>Stay organized and on track</li>
//             <li>Improve productivity and efficiency</li>
//             <li>Easy to use and navigate</li>
//           </ul>
//         </div>
//         <div className="flex justify-center my-8">
//           <button className="bg-green-600 text-white px-4 py-2 rounded mr-4 hover:bg-green-700">
//             Get Started
//           </button>
//         </div>
//         <div className="my-8">
//           <h2 className="text-2xl font-bold text-green-600">About Us</h2>
//           <p className="text-green-700">
//             We are a team of dedicated professionals committed to helping you
//             manage your tasks. Our platform is designed to be user-friendly and
//             efficient, making task management a breeze.
//           </p>
//         </div>
//         <div className="my-8">
//           <h2 className="text-2xl font-bold text-green-600">Contact Us</h2>
//           <p className="text-green-700">
//             Have questions or need help? Contact us at support@taskmanager.com.
//             We're here to help!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import homepage1 from "../assets/homepage1.png";
import homepage2 from "../assets/homepage2.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen  items-center mt-5 space-y-20 pb-3 mb-10  ">
      <div className="bg-[#0bda51] mx-auto rounded-xl w-11/12 h-[85%] flex flex-col items-center p-6 ">
        <div className=" flex flex-col gap-6 items-center ">
          {" "}
          <div className="text-[#232115]  text-center tracking-tight font-bold  text-6xl">
            Track Your Tasks
          </div>
          <div className="text-green-100 text-center tracking-tighter font-bold w-7/12 text-2xl">
            {" "}
            Become More Productive, Organized, and Efficient with Our
            TaskManager
          </div>
        </div>
        <div className="w-11/12 flex justify-evenly mt-8  h-[70%] ">
          <div className="w-[70%] h-4/5 my-auto bg-[#01693F]  p-6 rounded-2xl flex flex-col items-center justify-evenly">
            <div className="font-bold text-white text-4xl">
              {" "}
              Choose Our Task Manager: Simplify Your Life
            </div>
            <div className="text-green-200  p-10 rounded-2xl text-start w-11/12  font-semibold  text-2xl">
              {" "}
              TaskManager is a task management software that helps you stay
              organized and on track. With TaskManager, you can easily manage
              your tasks in one place, improve productivity and efficiency, and
              stay organized.
            </div>
          </div>
          <img
            src={homepage1}
            className="w-[30%] h-4/5 my-auto mr-3 bg-green-400 rounded-2xl"
          />
        </div>
        <button
          onClick={() => {
            navigate("/user");
          }}
          className="bg-[#232115] mt-2 text-2xl text-white px-4 py-2 rounded mr-4 hover:bg-green-700"
        >
          Get Started
        </button>
      </div>
      <div className=" mx-auto bg-black rounded-xl w-11/12 h-[80%] flex flex-col items-center p-6 ">
        <div className="text-center text-green-500 tracking-tight font-bold  text-6xl">
          Why Choose Us ?
        </div>
        <div className="w-11/12 flex justify-evenly mt-8  h-[70%] ">
          <img
            src={homepage2}
            className="w-[30%] h-4/5 my-auto mr-3 bg-green-400 rounded-2xl"
          />
          <div className="w-[75%]  my-auto bg-[#01693F]  p-6 rounded-2xl flex flex-col items-center justify-evenly">
            <div className="font-bold mb-5  text-white text-4xl">
              {" "}
              Why Use Our Simple and Handy Task Manager?
            </div>
            <div className="text-green-200  p-1 rounded-xl text-start w-11/12 flex flex-col gap-y-5 items-center  font-semibold  text-xl">
              <div>
                <span className="font-bold scale-105 text-green-50">
                  Efficient Task Management:
                </span>{" "}
                With our Task Manager, you can easily add, update, and manage
                your tasks. This helps you stay organized and ensures that you
                never miss a deadline.
              </div>
              <div>
                <span className="font-bold scale-105 text-green-50">
                  User-Friendly Interface:
                </span>{" "}
                Our Task Manager features a clean and intuitive interface that’s
                easy to navigate. Even if you’re new to task management tools,
                you’ll find our platform easy to use.
              </div>
              <div>
                <span className="font-bold scale-105 text-green-50">
                  Customizable:
                </span>{" "}
                Our Task Manager allows you to customize your tasks according to
                your needs. You can set priorities, due dates, and even add
                notes to your tasks.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto bg-black rounded-xl  border-green-700 w-11/12 h-[30%] flex flex-col items-center p-6 ">
        <h1 className=" text-white font-bold text-5xl ">
          {" "}
          So What Are You Waiting For?
        </h1>
        <button
          onClick={() => {
            navigate("/user");
          }}
          className="bg-green-400 w-3/12 mt-10 text-2xl text-black font-bold px-4 py-2 rounded mr-4 hover:bg-white hover:text-black"
        >
          Explore
        </button>
      </div>
    </div>
  );
}
export default HomePage;
