import { GiSplitCross } from "react-icons/gi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi"
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Landing() {
  const {address, isConnected} = useAccount();
  const [userExists, setUserExists] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Function to send the API request
    const checkUserOnBackend = async () => {
      try {
        const response = await fetch('https://0fa9-14-195-9-98.ngrok-free.app/api/user/checkUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: address }),
        });

        if (response.ok) {
          const result = await response.json();
          setUserExists(result.flag); // Assuming flag is a boolean indicating user existence

          if (result.flag) {
            router.push('/dashboard');
          } else {
            router.push('/register');
          }
        } else {
          console.error('Failed to check user on the backend');
        }
      } catch (error) {
        console.error('Error while checking user on the backend', error);
      }
    };

    // Check user on the backend if the wallet is connected
    if (isConnected) {
      checkUserOnBackend();
    }
  }, [address, isConnected]);

  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="mb-4 flex items-center justify-between py-4 md:py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <GiSplitCross className="w-14 h-14 text-black" />
            Blockwise
          </Link>

          <div className="flex items-center space-x-3">
            <ConnectButton />
            <Link
              href="/register"
              className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
            >
              Join Us
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Menu
          </button>
        </header>

        <section className="min-h-96 relative flex flex-1 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48">
          <img
            src="https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&q=75&fit=crop&w=1500"
            loading="lazy"
            alt="Photo by Fakurian Design"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#79D17F] mix-blend-multiply"></div>

          <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
            <p className="mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8">
              Very proud to introduce
            </p>
            <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">
              Revolutionary way to manage your transactions
            </h1>
          </div>
        </section>
      </div>
    </div>
  );
}
