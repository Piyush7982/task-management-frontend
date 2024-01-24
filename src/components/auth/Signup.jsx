import axiosInstance from "../../helper/axios.instance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const username_regex = "^[A-Za-z][A-Za-z0-9_]{5,29}$";
  const email_regex =
    /^(?=.*[a-zA-Z])[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

  const [validForm, setvalidForm] = useState(false);

  const [username, setUsername] = useState("");
  const [isValidUsername, setisValidUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState("");
  const [isValidEmail, setisValidEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [isValidPassword, setisValidPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [name, setName] = useState("");
  const [isValidName, setisValidName] = useState(false);
  const [nameError, setNameError] = useState("");

  const [occupation, setOccupation] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleOccupationChange(event) {
    setOccupation(event.target.value);
  }

  function validateUsername() {
    if (
      username.length < 5 ||
      username.length > 20 ||
      !username.match(username_regex)
    ) {
      setUsernameError(
        "Username must be 5-20 characters long and should be alphanumeric"
      );
      setisValidUsername(false);
    } else {
      setUsernameError("");
      setisValidUsername(true);
    }
  }
  function validateEmail() {
    if (email.length < 5 || email.length > 30 || !email.match(email_regex)) {
      setEmailError("Email should be valid 5-35 characters Long");
      setisValidEmail(false);
    } else {
      setEmailError("");
      setisValidEmail(true);
    }
  }
  function validatePassword() {
    if (password.length < 8 || password.length > 20) {
      setPasswordError("Password must be  8-20 characters long");
      setisValidPassword(false);
    } else {
      setPasswordError("");
      setisValidPassword(true);
    }
  }

  function validateName() {
    if (name.length < 5 || name.length > 20) {
      setNameError("Name must be 5-20 characters long");
      setisValidName(false);
    } else {
      setNameError("");
      setisValidName(true);
    }
  }

  useEffect(() => {
    validateUsername();
  }, [username]);
  useEffect(() => {
    validateEmail();
  }, [email]);
  useEffect(() => {
    validatePassword();
  }, [password]);
  useEffect(() => {
    validateName();
  }, [name]);

  useEffect(() => {
    if (isValidEmail && isValidUsername && isValidPassword && isValidName) {
      setvalidForm(true);
    } else {
      setvalidForm(false);
    }
  }, [isValidEmail, isValidUsername, isValidPassword, isValidName]);
  useEffect(() => {
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setNameError("");
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    let user = {
      userName: username,
      email: email,
      password: password,
      name: name,
      occupation: occupation,
    };
    user = JSON.stringify(user);
    try {
      await axiosInstance.post("/user/", user);

      navigate("/login", { replace: true });
    } catch (error) {
      if (error.message.includes("Network Error")) {
        navigate("/oops", { state: { from: "/signup" }, replace: true });
      } else if (
        error.response.data.Error.error.includes("username already exists")
      ) {
        setUsernameError("Username already exists, Try another one");
        setisValidUsername(false);
      } else if (
        error.response.data.Error.error.includes("email already exists")
      ) {
        setEmailError("Email already exists, Try another one");
        setisValidEmail(false);
      }

      return;
    }

    setEmail("");
    setPassword("");
    setUsername("");
  }

  return (
    <div className=" h-screen bg-green-500 w-screen flex justify-center items-center">
      <div className="flex flex-col py-2 bg-[#FBFBFD]  w-2/5 h-[80vh]  justify-around items-center    rounded-2xl ">
        <h1 className="font-bold text-4xl text-black ">Create Account</h1>
        <form
          className="flex flex-col  justify-evenly  w-3/5 p-4  space-y-2 "
          onSubmit={handleSubmit}
        >
          <p className={isValidName ? "hidden" : "text-red-500"}>{nameError}</p>
          <input
            type="text"
            required
            id="name"
            value={name}
            placeholder="Enter Name 4-20 characters"
            onChange={handleNameChange}
            className="border-2 font-extrabold border-gray-300 rounded-md p-2 text-black"
          />
          <p className={isValidUsername ? "hidden" : "text-red-500"}>
            {usernameError}
          </p>
          <input
            type="text"
            required
            id="username"
            value={username}
            placeholder="Eg: Test12"
            onChange={handleUsernameChange}
            className="border-2 font-extrabold border-gray-300 rounded-md p-2 text-black"
          />

          <p className={isValidEmail ? "hidden" : "text-red-500"}>
            {emailError}
          </p>
          <input
            type="text"
            required
            id="email"
            value={email}
            placeholder="Eg : test@gmail.com"
            onChange={handleEmailChange}
            className="border-2 font-extrabold border-gray-300 rounded-md p-2 text-black"
          />
          <p className={isValidPassword ? "hidden" : "text-red-500"}>
            {passwordError}
          </p>

          <input
            type="password"
            required
            id="password"
            value={password}
            placeholder="Enter Password 8-20 chars"
            onChange={handlePasswordChange}
            className="border-2 font-extrabold border-gray-300 rounded-md p-2 text-black"
          />
          <select
            className="  font-bold text-lg    bg-white border border-gray-200 text-gray-700 p-2 rounded leading-tight focus:outline-none "
            id="occupation"
            onChange={handleOccupationChange}
            defaultValue={"Student"}
          >
            <option value="Student">Student</option>
            <option value="Business">Business</option>
            <option value="Service">Service</option>
            <option value="Others">Others</option>
          </select>

          <button
            disabled={!validForm}
            type="submit"
            className={
              validForm
                ? "p-1  bg-green-700 text-xl text-white w-1/3 font-semibold rounded-md hover:cursor-pointer "
                : "bg-slate-500  p-1 text-xl text-slate-300  w-1/3 rounded-md hover:cursor-not-allowed"
            }
          >
            Sign Up
          </button>
        </form>
        <span className="flex justify-between ">
          Already a user?
          <button
            onClick={() => {
              navigate("/login", { replace: true });
              // window.history.back();
            }}
            className="px-2 text-blue-500"
          >
            Sign In
          </button>
        </span>
      </div>
    </div>
  );
}

export default Signup;
