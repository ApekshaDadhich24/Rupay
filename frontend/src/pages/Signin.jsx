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

    // If token exists already, redirect to dashboard
    if (userToken) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);

      // 1) Sign in to get token
      const signinRes = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/v1/user/signin",
        {
          username,
          password,
        }
      );

      const token = signinRes.data.token;
      if (!token) throw new Error("No token returned from server");

      // 2) Save token
      localStorage.setItem("token", token);

      // 3) Fetch current user details (to get userId) using the token
      const userRes = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/v1/user/getUser",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const user = userRes.data;
      if (user && user._id) {
        // 4) Store userId for transaction page and other uses
        localStorage.setItem("userId", user._id);
      } else {
        // fallback: if backend returns the user object in another shape
        console.warn(
          "Couldn't get userId from /getUser response:",
          userRes.data
        );
      }

      // 5) navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      // Try to show a simple message — adapt to your UI if you have toast system
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
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Email"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            label={"Password"}
            type="password"
          />
          <div className="pt-4">
            <Button
              onClick={handleSignIn}
              label={loading ? "Signing in..." : "Sign in"}
              disabled={loading}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
