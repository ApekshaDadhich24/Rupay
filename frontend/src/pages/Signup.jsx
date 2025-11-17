import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (userToken) {
      navigate("/dashboard"); // Redirect to dashboard if token exists
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FC] via-white to-[#EAF3FF] flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-6">
        {/* Center card */}
        <div className="grid grid-cols-12 gap-8 items-stretch">
          {/* Right: form card (on small screens it becomes full width) */}
          <div className="col-span-12 lg:col-span-7 flex items-center">
            <div
              className="w-full bg-white rounded-2xl shadow-lg border border-[#E6EDF8] p-8
                         flex flex-col justify-center h-[min(640px,calc(100vh-80px))]"
            >
              <div className="max-w-md w-full mx-auto">
                <div className="text-center mb-4">
                  <Heading label={"Sign up"} />
                  <div className="mt-2 text-sm text-gray-500">
                    <SubHeading
                      label={"Enter your information to create an account"}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <InputBox
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    placeholder="First Name"
                    label={"First Name"}
                  />

                  <InputBox
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    placeholder="Last Name"
                    label={"Last Name"}
                  />

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
                  />
                </div>

                <div className="mt-4">
                  <Button
                    onClick={async () => {
                      const response = await axios.post(
                        import.meta.env.VITE_SERVER_URL + "/api/v1/user/signup",
                        {
                          username,
                          firstName,
                          lastName,
                          password,
                        }
                      );
                      localStorage.setItem("token", response.data.token);
                      navigate("/dashboard");
                    }}
                    label={"Sign up"}
                  />
                </div>

                <div className="mt-3 text-center">
                  <BottomWarning
                    label={"Already have an account?"}
                    buttonText={"Sign in"}
                    to={"/signin"}
                  />
                </div>

                <div className="mt-4 text-center text-xs text-gray-400">
                  By signing up you agree to the demo terms. This is a student
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
