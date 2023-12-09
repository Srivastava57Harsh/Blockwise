import React, { useEffect } from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import ContractABI from "../../artifacts/contracts/SplitExpense.sol/SplitExpense.json";

interface Person {
  name: string;
  walletAddress: string;
}

export default function Modal() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [walletAddresses, setWalletAddresses] = useState<string[]>([]);
  const [showModal, setShowModal] = React.useState(false);
  const [groupName, setGroupName] = useState("");
  const [splitAmount, setSplitAmount] = useState("");
  const [amountInWei, setAmountInWei] = useState("");

  const [newPerson, setNewPerson] = useState({
    name: "",
    walletAddress: "",
  });

  const handleNameChange = (e: any) => {
    setNewPerson({
      ...newPerson,
      name: e.target.value,
    });
  };

  const handleAddressChange = (e: any) => {
    setNewPerson({
      ...newPerson,
      walletAddress: e.target.value,
    });
  };

  const handleAddPerson = (e: any) => {
    e.preventDefault();
    if (newPerson.name && newPerson.walletAddress) {
      setPersons([...persons, newPerson]);
      setWalletAddresses([...walletAddresses, newPerson.walletAddress]);
      setNewPerson({
        name: "",
        walletAddress: "",
      });
    }
  };

  const handleSplitAmountChange = (e: any) => {
    setSplitAmount(e.target.value);
  };

  useEffect(() => {
    if (splitAmount.trim() !== "") {
      const wei = ethers.parseEther(splitAmount.toString());
      setAmountInWei(wei);
    }
  }, [splitAmount]);

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

  return (
    <>
      <button
        className="p-3 rounded-lg bg-[#79D17F] m-3 font-mono"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create Group
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*header*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*... rest of your existing code ...*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
