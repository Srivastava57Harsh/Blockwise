import React from "react";
import Image from "next/image";
import { useState } from "react";

export default function CreateSplitModal() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="flex w-full items-center justify-between border-t  p-3">
        <button
          className="bg-[#79D17F] hover:bg-blue-700 lg-200 w-3/5 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          Split Expense
        </button>

        <input
          type="text"
          placeholder="Message"
          className="mx-3 block w-2/5 rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700"
          name="message"
          required
        />
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-title text-black font-mono">
                    Create a new split
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
                        <label htmlFor="splitReason" className="">
                          Split Reason
                        </label>

                        <div className="relative">
                          <input
                            type="text"
                            className="w-full rounded-lg bg-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Pizza"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="splitAmount" className="">
                          Split amount (ETH)
                        </label>

                        <div className="relative">
                          <input
                            type="number"
                            className="w-full rounded-lg bg-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="1 ETH"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#79D17F] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Create Split
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
