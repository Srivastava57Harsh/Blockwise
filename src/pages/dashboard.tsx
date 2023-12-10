import { Hero } from "@/components/Hero";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { address, isConnected, isDisconnected } = useAccount();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "https://0fa9-14-195-9-98.ngrok-free.app/api/user/fetchUsers"
        );
        if (response.ok) {
          const userData = await response.json();

          // console.log("Fetched users:", userData);

          // Check if the fetched data is an array
          // if (Array.isArray(userData)) {

          // Find the user with the current wallet address as the primary wallet
          const currentUser = userData.data.find(
            (user) => user.wallets.primary_wallet === address
          );
          // console.log("Current user:", currentUser);

          if (currentUser) {
            // Save the details of the current user to localStorage
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
          } else {
            console.error("Current user not found in the fetched users.");
          }
          // } else {
          //   console.error('Unexpected data structure: The fetched data is not an array.');
          // }
        } else {
          console.error("Error fetching users:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (isDisconnected) {
      router.push("/landing");
    } else if (isConnected) {
      fetchUserDetails();
    }
  }, [isDisconnected, router]);

  if (isConnected) {
    return (
      <main className="mt-[calc(16px+56px)]">
        <Hero />
      </main>
    );
  }

  return null;
}
