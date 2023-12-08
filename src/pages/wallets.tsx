import { CiWallet } from "react-icons/ci";

export default function Wallets() {
  return (
    <div className=" mt-32 w-[90%] md:w-4/5 mx-auto h-[calc(100vh-72px)]">
      <div className="rounded-lg bg-gray-200 text-black flex flex-col justify-evenly">
        <div className="bg-white text-black font-bold py-2 px-4 rounded m-3 flex flex-col justify-between items-center mt-3 sm:flex-row space-y-3 p-4">
          <div className="flex gap-2 items-center">
            <CiWallet className="w-9 h-9" />
            <span className="text-black">Savings Wallet</span>
          </div>

          <div className="bg-black rounded-lg p-2">
            <button className="text-white font-mono font-thin">20 ETH</button>
          </div>
        </div>
        <div className="bg-white text-black font-bold py-2 px-4 rounded m-3 flex flex-col justify-between items-center mt-3 sm:flex-row space-y-3 p-4">
          <div className="flex gap-2 items-center">
            <CiWallet className="w-9 h-9" />
            <span className="text-black">Trading Wallet</span>
          </div>

          <div className="bg-black rounded-lg p-2">
            <div className="text-white font-mono font-thin">20 ETH</div>
          </div>
        </div>
      </div>
    </div>
  );
}
