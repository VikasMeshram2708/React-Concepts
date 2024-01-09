import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllUsers from "./AllUsers";

export interface Users {
  id: number;
  name: string;
}

export default function Navbar() {
  const BASE_URI = "https://jsonplaceholder.typicode.com/users";

  const [item, setItem] = useState("");
  const [data, setData] = useState<Users []>([]);

  const handleData = () => {
    console.log(item);
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(BASE_URI);
      const results = await response.json();
      console.log(results);
      setData(results);
    };
    fetchUsers();
  }, []);

  
  return (
    <>
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
          <Link to="/">
            <p className="btn btn-ghost text-xl">daisyUI</p>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              onKeyUp={handleData}
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">
                  <p className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </p>
                </Link>
              </li>
              <li>
                <p>Settings</p>
              </li>
              <li>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <AllUsers data={data} />
    </>
  );
}
