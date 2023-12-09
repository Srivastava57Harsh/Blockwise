import { Navbar } from "@/components/Navbar";
import { CiWallet } from "react-icons/ci";

export default function Wallets() {
  return (
    <div className=" mt-32 w-[90%] md:w-4/5 mx-auto h-[calc(100vh-72px)] space-y-3">
      <Navbar />
      <div className="rounded-lg bg-gray-200 text-black flex flex-col justify-evenly">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-black font-mono  sm:text-3xl">
              Add more wallets
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              Connect more wallets to fetch transaction from them...
            </p>

            <form
              action=""
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
            >
              <div>
                <label htmlFor="walletAddress" className="sr-only">
                  Wallet Address
                </label>

                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm "
                    placeholder="Enter your wallet Address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="walletName" className="sr-only">
                  Wallet Name
                </label>

                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Lending Wallet"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-[#79D17F] hover:bg-green-400 px-5 py-3 text-sm font-medium text-black"
              >
                Add Wallet
              </button>
            </form>
          </div>
        </div>
        N
      </div>
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
