import { atom, useRecoilState } from "recoil";
import { useCookies, Cookies } from "react-cookie";
const cookies = new Cookies();
const myCookie = cookies.get("access_token");

const cookiePresent = atom({
  key: "cookiePresent",
  default: myCookie ? true : false,
});
export const cookiePresentState = () => {
  const [cookie, setcookie] = useRecoilState(cookiePresent);
  //   console.log(cookie);
  return { cookie, setcookie };
};
// import { atom, useRecoilState } from "recoil";

// const cookiePresent = atom({
//   key: "cookiePresent",
//   default: false,
// });
// export const cookiePresentState = () => {
//   const [cookie, setcookie] = useRecoilState(cookiePresent);

//   return { cookie, setcookie };
// };
