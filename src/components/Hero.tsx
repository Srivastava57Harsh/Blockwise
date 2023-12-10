import Transactions from "@/components/Transactions";
import Image from "next/image";
import { TotalBalance } from "./TotalBalance";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { useBalance } from "wagmi";

export const Hero = () => {
  const router = useRouter();
  const { address, isConnected, isDisconnected } = useAccount();
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "https://0fa9-14-195-9-98.ngrok-free.app/api/user/fetchUsers"
        );
        if (response.ok) {
          const userData = await response.json();

          console.log("Fetched users:", userData);

          const currentUser = userData.data.find(
            (user: any) => user.wallets.primary_wallet === address
          );
          console.log("harsh", currentUser.wallets);
          setWallets(currentUser.wallets);

          if (currentUser) {
            // Save the details of the current user to localStorage
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
          } else {
            console.error("Current user not found in the fetched users.");
          }
        } else {
          console.error("Error fetching users:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (isConnected) {
      fetchUserDetails();
    }
  }, [isDisconnected, router]);

  return (
    <section className="w-[90%] md:w-4/5 mx-auto h-[calc(100vh-72px)]">
      <Navbar />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 ">
        <div className=" rounded-lg bg-gray-200 mt-5 flex flex-col justify-evenly">
          {/* {wallets.map((transaction, index) => (
            <div className="bg-white text-black font-bold py-2 px-4 rounded m-3 flex justify-between items-center">
              <span className="text-black">Wallet 1</span>
              <div className="bg-[#79D17F] rounded-lg p-2 shadow-lg">
                <span className="text-black font-thin font-mono">0.11 ETH</span>
              </div>
            </div>
          ))} */}
          <div className="bg-white text-black font-bold py-2 px-4 rounded m-3 flex justify-between items-center gap-4">
            <span className="text-black">{wallets.primary_wallet}</span>
            <div className="bg-[#79D17F] rounded-lg p-2 shadow-lg">
              <span className="text-black font-thin font-mono">0.11 ETH</span>
            </div>
          </div>
          <div className="bg-white text-black font-bold py-2 px-4 rounded m-3 flex justify-between items-center">
            <span className="text-black">{wallets.savings}</span>
            <div className="bg-[#79D17F] rounded-lg p-2 shadow-lg">
              <span className="text-black font-mono font-thin">0.11 ETH</span>
            </div>
          </div>
        </div>

        <TotalBalance />
      </div>
      <div className="mt-5">
        <div className="rounded-lg bg-gray-200 text-black flex flex-col justify-evenly">
          <div className="bg-white text-black font-bold py-2 px-4 rounded m-3 flex flex-col justify-between items-center mt-3 sm:flex-row space-y-3 p-4">
            <div className="flex gap-2 items-center">
              <Image
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=Cuddles"
                width={50}
                height={50}
                alt="user profile"
              />
              <span className="text-black">Harsh</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-black font-mono font-normal">
                Amount to settle
              </span>
              <div className="bg-[#79D17F] rounded-lg p-2 shadow-lg">
                <span className="text-black font-thin  font-mono">
                  0.11 ETH
                </span>
              </div>
            </div>
            <div className="bg-black rounded-lg p-2">
              <button className="text-white font-mono font-thin">
                Settle Up
              </button>
            </div>
          </div>
          <div className="bg-white text-black font-bold py-2 px-4 rounded m-3 flex flex-col justify-between items-center mt-3 sm:flex-row space-y-3 p-4">
            <div className="flex gap-2 items-center">
              <Image
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=Cuddles"
                width={50}
                height={50}
                alt="user profile"
              />
              <span className="text-black">Kevin</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-black font-mono font-normal">
                Amount to settle
              </span>
              <div className="bg-[#79D17F] rounded-lg p-2 shadow-lg">
                <span className="text-black font-thin  font-mono">
                  0.11 ETH
                </span>
              </div>
            </div>
            <div className="bg-black rounded-lg p-2">
              <button className="text-white font-mono font-thin">
                Settle Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 ">
        <div className=" rounded-lg bg-gray-200 text-black">
          <Transactions />
        </div>
      </div>
    </section>
  );
};
