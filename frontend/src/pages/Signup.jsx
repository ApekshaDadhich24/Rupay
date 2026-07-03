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
    if (userToken) navigate("/dashboard");
  }, [navigate]);

  // Change this if you want a different visual height (px)
  const CARD_HEIGHT = 480;

  return (
    <div className="h-screen bg-gradient-to-br from-[#F7F9FC] via-white to-[#EAF3FF] flex flex-row-reverse items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 items-start">

          {/* LEFT HERO — same fixed height as the right card */}
          <div className="hidden lg:flex lg:col-span-7">
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-gradient-to-tr from-[#1A73E8] to-[#6AA8FF] p-10"
              style={{ height: CARD_HEIGHT }}
            >
              <svg className="absolute -right-24 -top-20 opacity-20 pointer-events-none" width="420" height="420" viewBox="0 0 400 400" fill="none" aria-hidden>
                <g transform="translate(0,-52)">
                  <circle cx="120" cy="160" r="140" fill="#ffffff" />
                  <circle cx="320" cy="80" r="90" fill="#ffffff" />
                </g>
              </svg>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="flex items-center justify-center rounded-md w-10 h-10 bg-blue-600 text-white font-bold text-xl">₹</div>
                <div>
                  <div className="text-3xl font-bold text-white tracking-wide">₹ Pay</div>
                  <div className="text-sm text-white/90">Simple. Fast. Secure.</div>
                </div>
              </div>

              <div className="relative z-10 text-white h-full flex flex-col justify-center gap-6">
                <h2 className="text-3xl font-extrabold leading-snug max-w-lg">
                  Create your account — get started today
                </h2>

                <p className="max-w-lg text-white/90">
                  Join ₹Pay for fast transfers, clean UI and a seamless experience.
                </p>

                <div className="text-sm text-white/80">Powered by ₹ Pay — demo payment system</div>
              </div>
            </div>
          </div>

          {/* RIGHT: card containing the heading inside; fixed height identical to left */}
          <div className="col-span-12 lg:col-span-5 flex items-start">
            <div
              className="bg-white rounded-2xl shadow-lg border border-[#E6EDF8] w-full mx-auto overflow-hidden flex flex-col"
              style={{ height: CARD_HEIGHT }}
            >
              {/* Card header (inside card now) */}
              <div className="p-6 border-b border-transparent">
                <div className="text-center">
                  <Heading label={"Sign up"} />
                  <div className="mt-2 text-sm text-gray-500">
                    <SubHeading label={"Enter your information to create an account"} />
                  </div>
                </div>
              </div>

              {/* Scrollable form area — leaves room at bottom for sticky footer */}
              <div
                className="px-6 overflow-auto"
                style={{
                  // subtract header and footer approx heights so footer stays visible
                  maxHeight: CARD_HEIGHT - 160,
                }}
              >
                <div className="max-w-md w-full mx-auto pt-4 pb-6 space-y-3">
                  <InputBox
                    onChange={(e) => { setFirstName(e.target.value); }}
                    placeholder="First Name"
                    label={"First Name"}
                  />

                  <InputBox
                    onChange={(e) => { setLastName(e.target.value); }}
                    placeholder="Last Name"
                    label={"Last Name"}
                  />

                  <InputBox
                    onChange={(e) => { setUsername(e.target.value); }}
                    placeholder="Email"
                    label={"Email"}
                  />

                  <InputBox
                    onChange={(e) => { setPassword(e.target.value); }}
                    placeholder="Password"
                    label={"Password"}
                    type="password"
                  />

                  {/* Optional extra content — will scroll inside the form area */}
                  <div className="mt-3 text-sm text-gray-500">
                    Tip: Use a strong password — 8+ characters recommended.
                  </div>
                </div>
              </div>

              {/* Sticky footer inside card — always visible */}
              <div className="px-6 py-4 border-t border-[#F0F4FB] flex-shrink-0">
                <div className="max-w-md w-full mx-auto">
                  <div>
                    <Button
                      onClick={async () => {
                        const response = await axios.post(
                          import.meta.env.VITE_SERVER_URL + "/api/v1/user/signup",
                          { username, firstName, lastName, password }
                        );
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                      }}
                      label={"Sign up"}
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                  </div>

                  <div className="mt-3 text-center text-xs text-gray-400">
                    By signing up you agree to the demo terms. This is a student project.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile hero under card for small screens */}
          <div className="col-span-12 lg:hidden mt-6">
            <div className="w-full rounded-2xl overflow-hidden shadow-md bg-gradient-to-tr from-[#1A73E8] to-[#6AA8FF] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">₹</div>
                <div>
                  <div className="font-bold text-white">₹ Pay</div>
                  <div className="text-xs text-white/90">Simple. Fast. Secure.</div>
                </div>
              </div>

              <h3 className="text-white font-extrabold text-lg">Payments made simple</h3>
              <p className="text-white/90 mt-2 text-sm">Fast transfers and minimal steps — built for clarity & seamless experience.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
