export const Hero = () => {
  return (
    <section className="w-[90%] md:w-4/5 mx-auto h-[calc(100vh-72px)]">
      <div className="flex flex-col items-center justify-evenly h-full">
        <div className=" py-6 sm:px-6 lg:px-8  mt-24">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
              <a
                href="#"
                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-white shadow-lg md:h-80 border-2 border-gray-200"
              >
                <div className="pointer-events-none bg-white shadow-lg  bg-clip-border rounded-xl"></div>
                <span className="relative ml-4 mb-3 inline-block text-sm text-black md:ml-5 md:text-lg">
                  Total connected wallets
                </span>
              </a>
              <a
                href="#"
                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-white shadow-lg md:col-span-2 md:h-80 border-2 border-gray-200 "
              >
                <div className="pointer-events-none bg-white shadow-lg bg-clip-border rounded-xl"></div>
                <span className="relative ml-4 mb-3 inline-block text-sm text-black md:ml-5 md:text-lg">
                  Total balance
                </span>
              </a>
              <a
                href="#"
                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-white shadow-lg md:col-span-2 md:h-80 border-2 border-gray-200 "
              >
                <div className="pointer-events-none bg-white shadow-lg bg-clip-border rounded-xl"></div>
                <span className="relative ml-4 mb-3 inline-block text-sm text-black md:ml-5 md:text-lg">
                  people to settle up
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-evenly h-full">
        <div className=" py-6 sm:px-6 lg:px-8  mt-24">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
              <a
                href="#"
                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-white shadow-lg md:h-80 border-2 border-gray-200"
              >
                <div className="pointer-events-none bg-white shadow-lg  bg-clip-border rounded-xl"></div>
                <span className="relative ml-4 mb-3 inline-block text-sm text-black md:ml-5 md:text-lg">
                  Total connected wallets
                </span>
              </a>
              <a
                href="#"
                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-white shadow-lg md:col-span-2 md:h-80 border-2 border-gray-200 "
              >
                <div className="pointer-events-none bg-white shadow-lg bg-clip-border rounded-xl"></div>
                <span className="relative ml-4 mb-3 inline-block text-sm text-black md:ml-5 md:text-lg">
                  Total balance
                </span>
              </a>
              <a
                href="#"
                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-white shadow-lg md:col-span-2 md:h-80 border-2 border-gray-200 "
              >
                <div className="pointer-events-none bg-white shadow-lg bg-clip-border rounded-xl"></div>
                <span className="relative ml-4 mb-3 inline-block text-sm text-black md:ml-5 md:text-lg">
                  people to settle up
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
