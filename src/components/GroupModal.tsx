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

  const closeModal = () => {
    setShowModal(false);
    setPersons(null);
    setGroupName("");
  }

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

  const createGroup = async () => {


    try {
      const response = await fetch("https://0fa9-14-195-9-98.ngrok-free.app/api/user/createGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName,
          users: persons.map((person) => person.name),
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Group created successfully:", data);
        // Do additional actions if needed
      } else {
        console.error("Failed to create group:", response.statusText);
        // Handle error appropriately
      }
    } catch (error) {
      console.error("Error creating group:", error);
      // Handle error appropriately
    }
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
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-title text-black font-mono">
                    Create group or a single split
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto text-black">
                  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <form
                      action=""
                      className="mx-auto mb-0 mt-8 max-w-md space-y-4"
                    >
                      <div className="space-y-2">
                        <label htmlFor="groupName">Group Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full rounded-lg bg-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="ETH India after party"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="memberName">Bearer Name</label>
                        <div className="relative text-black">
                          <input
                            type="text"
                            className="w-full rounded-lg bg-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                            placeholder="Enter name of the person"
                            value={newPerson.name}
                            onChange={handleNameChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="memberAddr">
                          Bearer Wallet address
                        </label>
                        <div className="relative text-black">
                          <input
                            type="text"
                            className="w-full rounded-lg bg-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                            placeholder="Enter person wallet address"
                            value={newPerson.walletAddress}
                            onChange={handleAddressChange}
                          />
                        </div>
                      </div>
                      <button
                        className="bg-indigo-300 p-3 flex items-center rounded-lg"
                        onClick={handleAddPerson}
                      >
                        <span className="font-mono">Add more persons</span>
                      </button>
                      <div className="bg-gray-200 p-3 rounded-lg">
                        <h2 className="text-lg font-mono text-black">
                          List of Persons added
                        </h2>
                        <ul>
                          {persons != null && persons.map((person, index) => (
                            <li key={index}>
                              Name: {person.name} -- Wallet Address:{" "}
                              {person.walletAddress}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </form>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#79D17F] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={createGroup}
                  >
                    Create Group
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
