import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
// import { useAccount, useSigner } from "wagmi";

// import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mantleTestnet, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { assertExists } from "../utils/assertExists";
import { Navbar } from "@/components/Navbar";
import {
  handleCreateContact,
  handleCreateFunds,
  handleCreatePayout,
} from "@/services/handleRazorpay";
import { useEffect, useState } from "react";

const signer = ethers.Wallet.createRandom();

export default function App({ Component, pageProps }: AppProps) {
  // const { address } = useAccount();
  // const { data: signer } = useSigner();
  // const [notifs, setNotifs] = useState([]);
  //PUSH NOTIFICATION INTEGRATION

  // const turnonNotifs = async () => {
  //   await PushAPI.channels.subscribe({
  //     signer: signer,
  //     channelAddress: "eip155:5:0xEdEFD55a9674550669Bdfe304f8d5c725b0817dF", // channel address in CAIP
  //     userAddress: `eip155:5:${address}`, // user address in CAIP
  //     onSuccess: () => {
  //       // console('opt in success');
  //     },
  //     onError: () => {
  //       console.error("opt in error");
  //     },
  //     //@ts-ignore
  //     env: "staging",
  //   });
  // };

  // const getNotifs = async () => {
  //   const notifications = await PushAPI.user.getFeeds({
  //     user: `eip155:5:${address}`, // user address in CAIP
  //     //@ts-ignore
  //     env: "staging",
  //   });

  //   setNotifs(notifications);
  //   // console(notifications);
  // };

  // useEffect(() => {
  //   getNotifs();
  // }, [address]);

  //RAZORPAY TESTING API CODE

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let data: { id?: string | undefined } | void; // Declare the type explicitly

  //     try {
  //       data = await handleCreateContact(7428023863);

  //       if (data && data.id) {
  //         // Check if 'id' property exists in the data
  //         const res = await handleCreateFunds("7428023863@paytm", data.id);
  //         console.log(res);

  //         if (res && res.id) {
  //           const amount = 10000;
  //           const result = await handleCreatePayout(res.id, amount);
  //           console.log(result);
  //         }
  //       } else {
  //         console.error(
  //           'Invalid or missing "id" property in the response from handleCreateContact'
  //         );
  //       }

  //       // console.log("HIIIII", data);
  //       // Your other asynchronous operations can go here
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  // }, [1]);

  const env = assertExists(process.env.NEXT_PUBLIC_MUMBAI_RPC_ENDPOINT);
  const { chains, publicClient } = configureChains(
    [mantleTestnet],
    [alchemyProvider({ apiKey: env }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "ETH INDIA",
    projectId: "1ac6c697e8dfb792117061f61457d73a",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    // <ContextProvider>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#806DFF",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
    // </ContextProvider>
  );
}
