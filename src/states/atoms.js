import { atom, useRecoilState } from "recoil";
import { useCookies, Cookies } from "react-cookie";
const cookies = new Cookies();
const myCookie = cookies.get("access_token");

const cookiePresent = atom({
  key: "cookiePresent",
  default: myCookie ? true : false,
});
const userAuth = atom({
  key: "userAuth",
  default: false,
});

export const cookiePresentState = () => {
  const [cookie, setcookie] = useRecoilState(cookiePresent);
  return { cookie, setcookie };
};

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
