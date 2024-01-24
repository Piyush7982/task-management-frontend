import { useNavigate } from "react-router-dom";
import background from "../../assets/notfound.png";
import { useEffect } from "react";

function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(-1, { replace: true });
    }, 5000);
  }, []);

  return (
    <div className="bg-[#3CB043] h-screen w-screen flex flex-col items-center justify-center  text-white font-bold text-3xl tracking-tight">
      <img className=" h-1/3" src={background} alt="img" />
      <p>404 Not Found</p>
      <p> Redirecting To Home..... </p>
      <span className="text-lg font-medium mt-10 ">
        If Not Redirected in 5 Seconds Try Manually
        <button
          className="text-green-600 bg-white p-2 rounded-xl text-xl hover:underline ml-3"
          onClick={() => {
            navigate(-1, { replace: true });
          }}
        >
          {" "}
          Click Me
        </button>
      </span>
    </div>
  );
}

export default NotFound;
