import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
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
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function App({ Component, pageProps }: AppProps) {
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
