import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { GiSplitCross } from "react-icons/gi";

export default function RegistrationForm() {
  return (
    <div className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src="https://img.freepik.com/free-vector/chaotic-pattern-design_1048-16006.jpg?w=740&t=st=1702063283~exp=1702063883~hmac=5f407cb6b29d24487fe7cb6bee3f47b2ebaed3e2d4c3a0ebe3b5aacfc829abcc"
            className="absolute inset-0 h-full w-full "
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-black" href="/">
              <span className="sr-only">Home</span>
              <GiSplitCross className=" w-10 h-10" />
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome To BlockHash 🦑
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>

            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3 ">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold font-mono text-gray-700"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-gray-200 text-sm text-gray-700 shadow-sm p-2"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="upi"
                  className="block text-sm font-bold font-mono text-gray-700"
                >
                  {" "}
                  UPI id{" "}
                </label>

                <input
                  type="upiid"
                  id="UPI"
                  name="upi"
                  className="mt-1 w-full rounded-md border-gray-200 bg-gray-200 text-sm text-gray-700 shadow-sm p-2"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="PhoneNo"
                  className="block text-sm font-bold font-mono text-gray-700 shadow-inner"
                >
                  {" "}
                  Phone Number{" "}
                </label>

                <input
                  type="phone"
                  id="PhoneNumber"
                  name="phno"
                  className="mt-1 w-full rounded-md border-gray-200 bg-gray-200 text-sm text-gray-700 shadow-sm p-2"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <ConnectButton label="Connect Wallet" />

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="#" className="text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-lg border bg-black font-mono hover:bg-white hover:text-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:border-black focus:outline-none focus:ring active:text-blue-500">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
