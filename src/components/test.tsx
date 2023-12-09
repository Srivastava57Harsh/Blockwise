export default function Test() {
  return (
    <div>
      <ul>
        <li>
          <a className="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
              alt="username"
            />
            <div className="w-full pb-2">
              <div className="flex justify-between">
                <span className="ml-2 block font-semibold text-gray-600">
                  Anatoly
                </span>
                <span className="ml-2 block text-sm text-gray-600">
                  25 minutes
                </span>
              </div>
              <span className="ml-2 block text-sm text-gray-600">Hi</span>
            </div>
          </a>
          <a className="flex cursor-pointer items-center border-b border-gray-300 bg-gray-100 px-3 py-2 text-sm transition duration-150 ease-in-out focus:outline-none">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
              alt="username"
            />
            <div className="w-full pb-2">
              <div className="flex justify-between">
                <span className="ml-2 block font-semibold text-gray-600">
                  Solana
                </span>
                <span className="ml-2 block text-sm text-gray-600">
                  50 minutes
                </span>
              </div>
              <span className="ml-2 block text-sm text-gray-600">
                Awesome Project
              </span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}
