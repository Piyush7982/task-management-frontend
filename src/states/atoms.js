import { atom, useRecoilState } from "recoil";
import { useCookies, Cookies } from "react-cookie";
const cookies = new Cookies();
const myCookie = cookies.get("access_token");
// console.log(myCookie);

// const [cookies] = useCookies(["access_token"]);

// console.log(cookies);
const cookiePresent = atom({
  key: "cookiePresent",
  default: myCookie ? true : false,
});
export const cookiePresentState = () => {
  const [cookie, setcookie] = useRecoilState(cookiePresent);
  //   console.log(cookie);
  return { cookie, setcookie };
};
