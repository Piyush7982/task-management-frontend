import { Outlet, useLocation, Navigate } from "react-router-dom";
import NavigationButtons from "./components/LeftNavigationButton";
import { cookiePresentState } from "./states/atoms";

function AuthLayout() {
  const location = useLocation();
  const { cookie } = cookiePresentState();
  return (
    <div className="overflow-hidden h-screen w-screen flex justify-between">
      {cookie ? (
        <>
          <NavigationButtons />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </div>
  );
}

export default AuthLayout;
// import { Outlet, useLocation, Navigate } from "react-router-dom";
// import NavigationButtons from "./components/LeftNavigationButton";
// import { cookiePresentState } from "./states/atoms";
// import { useEffect } from "react";
// import { useCookies, Cookies } from "react-cookie";

// function AuthLayout() {
//   const [myCookie, setMyCookie, deleteMyCookie] = useCookies(["access_token"]);
//   const location = useLocation();
//   const { cookie, setcookie } = cookiePresentState();
//   myCookie ? setcookie(true) : setcookie(false);
//   useEffect(() => {
//     myCookie ? setcookie(true) : setcookie(false);
//   }, []);
//   return (
//     <div className="overflow-hidden h-screen w-screen flex justify-between">
//       {cookie ? (
//         <>
//           <NavigationButtons />
//           <Outlet />
//         </>
//       ) : (
//         <Navigate to="/login" state={{ from: location }} replace />
//       )}
//     </div>
//   );
// }

// export default AuthLayout;
