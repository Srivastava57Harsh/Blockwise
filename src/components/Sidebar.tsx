import { useState, useEffect } from "react";
import GroupModal from "./GroupModal";

interface SidebarProps {
  onSelectGroup: (group: string) => void; // Prop to handle group selection
}

export default function Sidebar({ onSelectGroup }: any) {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    // Fetch groups when the component mounts
    fetchGroupsFromBackend();
  }, []);

  const fetchGroupsFromBackend = async () => {
    try {
      const response = await fetch("https://0fa9-14-195-9-98.ngrok-free.app/api/user/fetchGroups"); // Adjust the API endpoint based on your server setup
      const data = await response.json();

      if (response.ok) {
        setGroups(data.data);
      } else {
        console.error("Failed to fetch groups:", data.message);
      }
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  const handleGroupSelection = (groupName: string) => {
    setSelectedGroup(groupName);
    onSelectGroup(groupName);
  };
  return (
    <div className="border-r border-gray-300 lg:col-span-1">
      <ul className="h-[32rem] overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600 font-bold">
            Chats
          </h2>
          <div>
            <GroupModal />
          </div>
        </div>
        <li>
          <a
            className={`flex cursor-pointer items-center border-b border-gray-300 hover:bg-gray-100 px-3 py-2 text-sm transition duration-150 ease-in-out ${
              selectedGroup === "Group 1" ? "bg-gray-100" : ""
            }`}
            onClick={() => handleGroupSelection("Group 1")}
          >
            {/* Your group information */}
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
              alt="username"
            />
            <div className="w-full pb-2">
              <div className="flex justify-between">
                <span className="ml-2 block font-semibold text-gray-600">
                  Group 1
                </span>
                <span className="ml-2 block text-sm text-gray-600">
                  25 minutes
                </span>
              </div>
              <span className="ml-2 block text-sm text-gray-600">Hi</span>
            </div>
          </a>
        </li>
        <li>
          <a
            className={`flex cursor-pointer items-center border-b border-gray-300 hover:bg-gray-100 px-3 py-2 text-sm transition duration-150 ease-in-out ${
              selectedGroup === "Group 2" ? "bg-gray-100" : ""
            }`}
            onClick={() => handleGroupSelection("Group 2")}
          >
            {/* Your group information */}
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
              alt="username"
            />
            <div className="w-full pb-2">
              <div className="flex justify-between">
                <span className="ml-2 block font-semibold text-gray-600">
                  Group 2
                </span>
                <span className="ml-2 block text-sm text-gray-600">
                  50 minutes
                </span>
              </div>
              <span className="ml-2 block text-sm text-gray-600">
                Awesome Project
              </span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}
