import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      navigate("/signin");
    } else {
      axios
        .get(import.meta.env.VITE_SERVER_URL + "/api/v1/user/getUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, []);

  const signOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  return (
    <div className="shadow h-14 flex justify-between items-center md:px-10">
      <Link to={"/dashboard"}>
        <div className="flex flex-col justify-center h-full ml-4 font-bold text-xl">
          Rupay
        </div>
      </Link>

      <div className="flex items-center justify-center gap-3">

        {/* ⭐ HISTORY BUTTON — added here */}
        <Link to="/history">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            History
          </button>
        </Link>

        {/* SIGN OUT button */}
        <Button label={"Sign Out"} onClick={signOutHandler} />

        {/* USER NAME */}
        <div className="flex flex-col justify-center h-full mr-4">
          {user?.firstName}
        </div>

        {/* USER AVATAR */}
        <div className="rounded-full h-10 w-10 p-4 bg-slate-200 flex justify-center mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user?.firstName[0].toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
