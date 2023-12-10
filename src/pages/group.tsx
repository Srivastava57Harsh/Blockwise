import { useState } from "react";
import ChatPage from "@/components/ChatPage";
import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { GroupProvider } from "@/context/GroupContext";

export default function Group() {
  const [selectedGroup, setSelectedGroup] = useState<string>("Group 1"); // Initial selected group

  return (
    <GroupProvider> 
    <main>
      <Navbar />
      <div className="container mx-auto mt-20 bg-gray-200 rounded-lg">
        <div className="min-w-full rounded border lg:grid lg:grid-cols-3">
          <Sidebar onSelectGroup={(group: any) => setSelectedGroup(group)} />
          <ChatPage selectedGroup={selectedGroup} />
        </div>
      </div>
    </main>
    </GroupProvider>
  );
}
