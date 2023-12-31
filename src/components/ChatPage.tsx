import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import ContractABI from "../../artifacts/contracts/SplitExpense.sol/SplitExpense.json";
import CreateSplitModal from "./CreateSplitModal";

interface ChatPageProps {
  selectedGroup: string; // Define the type of selectedGroup prop
}

export default function ChatPage({ selectedGroup }: ChatPageProps) {
  const [walletAddresses, setWalletAddresses] = useState([
    "0x696D8d3BDa41797e13578e85B8954C9Bc82C401a",
    "0x05b854cD78C058e8FEC13Af7d5AfC7EbFb43C5d3",
    "0xd2E578295312533DC9DD204eec7a2eAA50bFc3Fc",
  ]);

  const [groups, setGroups] = useState([]); // fetched groups

  const [expenseAmount, setExpenseAmount] = useState(0.01);
  const [shares, setShares] = useState({});
  const amountInWei = ethers.parseEther(expenseAmount.toString());
  const contractAddress = "0x02285dA4A30884e7100B7F1C6Fa8cA8c7Bfa5690";
  const contract = new ethers.Contract(contractAddress, ContractABI.abi);

  const groupName = "Group A";

  const { config } = usePrepareContractWrite({
    address: "0xf3Ca255e5b8d726c5a8A38689e4C44b1Bb372c5B",
    abi: ContractABI.abi,
    functionName: "splitExpense",
    args: [walletAddresses, groupName, amountInWei],
    value: ethers.parseEther("0"),
    onError(error: any) {
      console.log("Error", error);
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const splitExpense = () => {
    console.log("Button was clicked!");
    write?.();
  };

  function convertToObjects(array) {
    const result = {};

    // Check if the array is defined and has the expected structure
    if (Array.isArray(array) && array.length === 2) {
      const addresses = array[0];
      const shares = array[1];

      // Check if addresses and shares are both arrays
      if (
        Array.isArray(addresses) &&
        Array.isArray(shares) &&
        addresses.length === shares.length
      ) {
        for (let i = 0; i < addresses.length; i++) {
          const walletAddress = addresses[i];
          const share = shares[i];

          result[walletAddress] = share;
        }

        console.log(result);
      } else {
        console.error(
          "Invalid data structure: addresses and shares should be arrays of the same length"
        );
      }
    } else {
      console.error(
        "Invalid data structure: array should be an array with two elements"
      );
    }

    return result;
  }

  // // Inside your component...
  // const { data, isError, isLoading } = useContractRead({
  //   address: "0xf3Ca255e5b8d726c5a8A38689e4C44b1Bb372c5B",
  //   abi: ContractABI.abi,
  //   functionName: "getGroupShares",
  //   args: ['Group A']
  // });

  // useEffect(() => {
  //   if (isError) {
  //     console.error("Error reading contract:", isError);
  //   }

  //   if (data) {
  //     setShares(data);
  //     console.log(shares);
  //     convertToObjects(shares);
  //   }
  // }, [data, isError, shares]);

  useEffect(() => {
    // Fetch groups when the component mounts
    fetchGroupsFromBackend();
  }, []);

  const fetchGroupsFromBackend = async () => {
    try {
      const response = await fetch(
        "https://0fa9-14-195-9-98.ngrok-free.app/api/user/fetchGroups"
      ); // Adjust the API endpoint based on your server setup
      const data = await response.json();

      if (response.ok) {
        setGroups(data.data);
      } else {
        console.error("Failed to fetch groups:", data.message);
      }
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  return (
    <div className="hidden lg:col-span-2 lg:block">
      {/* Render chat content based on selectedGroup */}

      {groups.map((group) => (
        <div key={group._id}>
          {selectedGroup === group._id && (
            // JSX for Group 1 chat content
            // ...
            <div className="w-full bg-200">
              <div className="relative flex items-center border-b border-black-300 p-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                  alt="username"
                />
                <span className="ml-2 block font-bold text-gray-600">
                  {group.groupName}
                </span>
                <span className="absolute left-10 top-3 h-3 w-3 rounded-full bg-green-600">
                  {" "}
                </span>
              </div>
              <div className="relative h-[40rem] w-full overflow-y-auto p-6">
                <ul className="space-y-2">
                  <li className="flex justify-start">
                    <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                      <span className="block" bg-grey>
                        Hi
                      </span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                      <span className="block">Hiiii</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                      <span className="block">how was ETHIndia 2023??</span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                      <span className="block">
                        It was just purely next level awesome 🔥🔥🔥🔥.
                      </span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                      <span className="block">
                        By the way you have to settle up for some transaction
                      </span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl rounded-lg bg-gray-100 px-4 py-3 text-gray-700 shadow">
                      <span className="block">
                        <div className="relative flex flex-col  text-gray-700 bg-white shadow-md bg-clip-border w-96 rounded-lg">
                          <div className="p-6 ">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                              Rs.2,520
                            </h5>
                            <p className="block font-sans text-bold font:mono antialiased font-light leading-relaxed text-inherit">
                              Expense for cab
                            </p>
                          </div>
                        </div>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex w-full items-center justify-between border-t border-gray-300 p-3">
                <CreateSplitModal />
                <button></button>
                <button type="submit" className="bg-black p-3 rounded-lg">
                  <svg
                    className="h-6 w-6 origin-center rotate-90 transform text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {selectedGroup === "Group 2" && (
        // JSX for Group 2 chat content
        // ...
        <div className="w-full bg-200">
          <div className="relative flex items-center border-b border-black-300 p-3">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
              alt="username"
            />
            <span className="ml-2 block font-bold text-gray-600">Group 2</span>
            <span className="absolute left-10 top-3 h-3 w-3 rounded-full bg-green-600">
              {" "}
            </span>
          </div>
          <div className="relative h-[40rem] w-full overflow-y-auto p-6">
            <ul className="space-y-2">
              <li className="flex justify-start">
                <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                  <span className="block" bg-grey>
                    Hi
                  </span>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                  <span className="block">Hiiii</span>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                  <span className="block">how are you?</span>
                </div>
              </li>
              <li className="flex justify-start">
                <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                  <span className="block">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
                  </span>
                </div>
              </li>
              <li className="flex justify-start">
                <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
                  <span className="block">
                    <div className="relative flex flex-col  text-gray-700 bg-white shadow-md bg-clip-border w-96 rounded-lg">
                      <div className="p-6 ">
                        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                          Rs.2,520
                        </h5>
                        <p className="block font-sans text-bold font:mono antialiased font-light leading-relaxed text-inherit">
                          Expense for cab
                        </p>
                      </div>
                      <div className="p-6 pt-0">
                        <button
                          className="rounded-none align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6  bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                          type="button"
                        >
                          Settle the expense
                        </button>
                      </div>
                    </div>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex w-full items-center justify-between border-t border-gray-300 p-3">
            <CreateSplitModal />

            <button></button>
            <button type="submit" className="bg-black p-3 rounded-lg">
              <svg
                className="h-6 w-6 origin-center rotate-90 transform text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* Add more conditional rendering for other groups if needed */}
    </div>
  );
}
