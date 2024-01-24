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
