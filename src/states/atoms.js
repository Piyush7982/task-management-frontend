import { atom, useRecoilState } from "recoil";
import axiosInstance from "../helper/axios.instance";

const userAuth = atom({
  key: "userAuth",
  default: false,
});

export const userAuthState = () => {
  const [auth, setauth] = useRecoilState(userAuth);

  const status = async () => {
    try {
      const res = await axiosInstance.get("/user/checkAuth");

      const authotrised = res ? true : false;
      setauth(authotrised);
      window.localStorage.setItem("status", authotrised);
    } catch (error) {
      localStorage.setItem("status", false);
      setauth(false);

      return;
    }
  };
  status();

  return { auth, setauth };
};
