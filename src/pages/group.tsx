import ChatPage from "@/components/ChatPage";
import Sidebar from "@/components/Sidebar";

export default function Group() {
  return (
    <main>
      <div className="container mx-auto mt-20 bg-gray-200">
        <div className="min-w-full rounded border lg:grid lg:grid-cols-3">
          <Sidebar />
          <ChatPage />
        </div>
      </div>
    </main>
  );
}
