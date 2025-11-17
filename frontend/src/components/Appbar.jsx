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
        })
        .catch((err) => console.error(err));
    }
  }, [navigate]);

  const signOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  const firstInitial = user?.firstName?.[0]?.toUpperCase() || "U";

  return (
    <>
      {/* NAVBAR */}
      <div className="shadow-sm h-20 flex items-center px-6 md:px-10 bg-white border-b border-gray-100">

        {/* LEFT — Logo + Brand */}
        <Link to={"/dashboard"} className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md w-10 h-10 bg-blue-600 text-white font-bold text-xl">
            ₹
          </div>

          <div className="flex flex-col leading-tight">
            <div className="text-lg font-semibold text-gray-900">₹ Pay</div>
            <div className="text-xs text-gray-500">Simple. Fast. Secure.</div>
          </div>
        </Link>

        {/* SPACER */}
        <div className="flex-1"></div>

        {/* RIGHT — HISTORY → USER NAME → AVATAR */}
        <div className="flex items-center gap-6">

          {/* HISTORY (simple link, NOT a button) */}
          <Link
            to="/history"
            className="text-sm text-gray-700 hover:text-blue-600 transition"
          >
            History
          </Link>

          {/* USER NAME */}
          <div className="hidden sm:flex flex-col text-right">
            <div className="text-sm font-medium text-gray-800">
              {user?.firstName ?? "User"}
            </div>
            <div className="text-xs text-gray-500">Verified User</div>
          </div>

          {/* USER AVATAR */}
          <div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 text-gray-700 font-semibold text-lg">
            {firstInitial}
          </div>

        </div>
      </div>

      {/* FLOATING SIGN OUT BUTTON */}
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={signOutHandler}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition"
        >
          <i class="ri-logout-box-r-line"></i>
        </button>
      </div>
    </>
  );
};
