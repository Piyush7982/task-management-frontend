import { Outlet, useLocation, Navigate } from "react-router-dom";
import NavigationButtons from "./components/LeftNavigationButton";
import { userAuthState } from "./states/atoms";

function AuthLayout() {
  const location = useLocation();

  const { auth, setauth } = userAuthState();
  return (
    <div className="overflow-hidden h-screen w-screen flex justify-between">
      {localStorage.getItem("status") == "true" ? (
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
