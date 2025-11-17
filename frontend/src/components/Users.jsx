import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_SERVER_URL + "/api/v1/user/bulk?filter=" + filter
      )
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-semibold mt-8 text-gray-900 text-lg">Users</div>

      {/* Search */}
      <div className="mt-3 mb-4">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-3 py-2 border border-[#E6EDF8] rounded-lg bg-white text-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#EAF3FF] placeholder-gray-400"
        />
      </div>

      {/* Users list */}
      <div className="space-y-2">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full bg-white rounded-lg px-3 py-2 shadow-sm border border-[#E6EDF8] 
                    flex items-center justify-between"
    >
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="h-10 w-10 rounded-full bg-[#EAF3FF] flex items-center justify-center 
                        text-[#1A73E8] font-semibold text-base"
        >
          {user.firstName[0].toUpperCase()}
        </div>

        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-xs text-gray-500">{user.email || "User"}</div>
        </div>
      </div>

      {/* Send Money Button */}
      <div className="flex-shrink-0">
        <Button
          onClick={() =>
            navigate("/send?id=" + user._id + "&name=" + user.firstName)
          }
          label="Send Money"
        />
      </div>
    </div>
  );
}
