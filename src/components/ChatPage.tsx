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

  const [expenseAmount, setExpenseAmount] = useState(0.01);
  const [shares, setShares] = useState({});
  const amountInWei = ethers.parseEther(expenseAmount.toString());
  const contractAddress = "0x02285dA4A30884e7100B7F1C6Fa8cA8c7Bfa5690";
  const contract = new ethers.Contract(contractAddress, ContractABI.abi);

  // const { config } = usePrepareContractWrite({
  //   address: "0xD9b259dAD40C3Ba608379c3184AE2c71321881Fd",
  //   abi: ContractABI.abi,
  //   functionName: "splitExpense",
  //   args: [walletAddresses, amountInWei],
  //   value: ethers.parseEther("0"),
  //   onError(error: any) {
  //     console.log("Error", error);
  //   },
  // })

  // const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const splitExpense = () => {
    console.log("Button was clicked!");
    // write?.();
  };

  function convertToObjects(array) {
    const result = {};

    const addresses = array[0];
    const shares = array[1];

    for (let i = 0; i < addresses.length; i++) {
      const walletAddress = addresses[i];
      const share = shares[i];

      result[walletAddress] = share;
    }

    console.log(result);
    return result;
  }

  // Inside your component...
  const { data, isError, isLoading } = useContractRead({
    address: "0xD9b259dAD40C3Ba608379c3184AE2c71321881Fd",
    abi: ContractABI.abi,
    functionName: "getShares",
  });

  useEffect(() => {
    if (isError) {
      console.error("Error reading contract:", isError);
    }

    if (data) {
      setShares(data);
      console.log(shares);
      convertToObjects(shares);
    }
  }, [data, isError, shares]);

  return (
    <div className="hidden lg:col-span-2 lg:block">
      {/* Render chat content based on selectedGroup */}
      {selectedGroup === "Group 1" && (
        // JSX for Group 1 chat content
        // ...
        <div className="text-black">Group 1 chat</div>
      )}
      {selectedGroup === "Group 2" && (
        // JSX for Group 2 chat content
        // ...
        <div className="text-black">Group 2 chat</div>
      )}
      {/* Add more conditional rendering for other groups if needed */}
    </div>
  );
}
