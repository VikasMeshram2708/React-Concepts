import React, { Suspense, useEffect, useState } from "react";
import { iUser } from "../../types/iUser";

export default function UserProfile() {
  const [users, setUsers] = useState<iUser[]>([]);

  const BASE_URI = "https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(BASE_URI);
      const result = await response.json();
      setUsers(result);
    };

    fetchUsers();
  }, [BASE_URI]);

  return (
    <React.Fragment>
      <h1 className="text-center mb-3 text-3xl mt-10">Users</h1>
      <Suspense fallback={<h3 className="text-center text-3xl">Loading...</h3>}>
        <div className="max-w-[90%] mx-auto grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5 justify-center items-center">
          {users?.map((user) => {
            return (
              <div key={user?.id} className="">
                <p className="text-lg"> Name : {user?.name}</p>
                <p className="text-lg">Email : {user?.email}</p>
              </div>
            );
          })}
        </div>
      </Suspense>
    </React.Fragment>
  );
}
