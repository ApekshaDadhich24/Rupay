import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useEffect, useState } from "react";
import axios from "axios";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      navigate("/dashboard");
    }
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);

      const signinRes = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/v1/user/signin",
        { username, password }
      );

      const token = signinRes.data.token;
      if (!token) throw new Error("No token returned from server");

      localStorage.setItem("token", token);

      const userRes = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/v1/user/getUser",
        { headers: { Authorization: "Bearer " + token } }
      );

      const user = userRes.data;
      if (user && user._id) {
        localStorage.setItem("userId", user._id);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          err.message ||
          "Sign in failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FC] via-white to-[#EAF3FF] flex items-center justify-center py-12">
      <div className="max-w-5xl w-full mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 items-stretch">
          {/* LEFT PANEL */}
          <div className="col-span-7 hidden lg:flex">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-gradient-to-tr from-[#1A73E8] to-[#6AA8FF] p-10 min-h-[450px]">
              {/* Background SVG Blobs */}
              <svg
                className="absolute -right-24 -top-20 opacity-20"
                width="420"
                height="420"
                viewBox="0 0 400 400"
                fill="none"
              >
                <g transform="translate(0,-52)">
                  <circle cx="120" cy="160" r="140" fill="#ffffff" />
                  <circle cx="320" cy="80" r="90" fill="#ffffff" />
                </g>
              </svg>

              {/* BRAND HEADER (UPDATED WITH IMG LOGO) */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="flex items-center justify-center rounded-md w-10 h-10 bg-blue-600 text-white font-bold text-xl">
                  ₹
                </div>
                <div className="flex flex-col">
                  <div className="text-3xl font-bold text-white tracking-wide">
                    ₹ Pay
                  </div>
                  <div className="text-sm text-white/90">
                    Simple. Fast. Secure.
                  </div>
                </div>
              </div>

              {/* Left Text Content */}
              <div className="relative z-10 text-white h-full flex flex-col justify-center gap-6">
                <h2 className="text-3xl font-extrabold leading-snug max-w-lg">
                  Payments made simple — send money in seconds
                </h2>

                <p className="max-w-lg text-white/90">
                  Experience clean UI, fast transfers and minimal steps. Built
                  for clarity, speed & a seamless experience.
                </p>

                <div className="text-sm text-white/80 mt-4">
                  Powered by ₹ Pay — demo payment system
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: SIGN-IN FORM */}
          <div className="col-span-12 lg:col-span-5 flex items-center">
            <div className="bg-white rounded-2xl shadow-lg border border-[#E6EDF8] p-8 w-full min-h-[450px] flex flex-col justify-center">
              <div className="flex flex-col gap-4">
                <div className="text-center">
                  <Heading label={"Sign in"} />
                  <div className="mt-2 text-sm text-gray-500">
                    <SubHeading
                      label={"Enter your credentials to access your account"}
                    />
                  </div>
                </div>

                <InputBox
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email"
                  label={"Email"}
                />

                <InputBox
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  label={"Password"}
                  type="password"
                />

                <div className="mt-2">
                  <Button
                    onClick={handleSignIn}
                    label={loading ? "Signing in..." : "Sign in"}
                    disabled={loading}
                  />
                </div>

                <div className="pt-2">
                  <BottomWarning
                    label={"Don't have an account?"}
                    buttonText={"Sign up"}
                    to={"/signup"}
                  />
                </div>

                <div className="mt-3 text-center text-xs text-gray-400">
                  By signing in you agree to the demo terms. This is a student
                  project.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
