import { ChangeEvent, useEffect, useState } from "react";
import { Users } from "./Navbar";

// This is Debouncing Example
export default function AllUsers({ data }: { data: Users[] }) {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Users[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;
    setQuery(searchTerm);
    setLoading(true);
  };

  useEffect(() => {
    const debouncer = setTimeout(() => {
      const filterUsers = data.filter((user) =>
        user?.name?.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredData(filterUsers);
      setLoading(false);
    }, 300);

    return () => clearTimeout(debouncer);
  }, [query, data]);

  return (
    <div>
      <h1>List of All Users...</h1>

      <div className="flex justify-center mb-5">
        <input
          value={query}
          onChange={handleInputChange}
          type="text"
          name="filterUser"
          className="text-xl px-2.5 text-center outline-none bg-white text-black rounded-full"
          id="filterUser"
          placeholder="enter the user name"
        />
      </div>

      {loading ? (
        <p className="text-center text-read-500 text-lg">Loading...</p>
      ) : (
        <ul className="bg-purple-500/30 max-w-lg mx-auto text-center mb-3 py-3 rounded-lg">
          {filteredData?.length === 0 ? (
            <p>Sorry User not found!</p>
          ) : (
            filteredData.map((item) => (
              <div key={item?.id}>
                <p className="text-lg">{item?.name}</p>
              </div>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
