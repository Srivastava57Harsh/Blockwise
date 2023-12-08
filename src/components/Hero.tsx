import Transactions from "@/components/Transactions";
import Image from "next/image";
import { TotalBalance } from "./TotalBalance";

export const Hero = () => {
  return (
    <section className="w-[90%] md:w-4/5 mx-auto h-[calc(100vh-72px)]">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 ">
        <div className=" rounded-lg bg-gray-200 mt-5 flex flex-col justify-evenly">
          <div className="bg-white text-black font-bold py-2 px-4 rounded m-3 flex justify-between items-center">
            <span className="text-black">Wallet 1</span>
            <div className="bg-[#79D17F] rounded-lg p-2 shadow-lg">
              <span className="text-black font-thin font-mono">0.11 ETH</span>
            </div>
          </div>
          <div className="bg-white text-black font-bold py-2 px-4 rounded m-3 flex justify-between items-center">
            <span className="text-black">Wallet 2</span>
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
