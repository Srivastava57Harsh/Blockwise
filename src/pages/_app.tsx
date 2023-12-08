import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { assertExists } from "../utils/assertExists"

export default function App({ Component, pageProps }: AppProps) {
  const env = assertExists(process.env.NEXT_PUBLIC_MUMBAI_API_KEY);
  const { chains, publicClient } = configureChains(
    [polygonMumbai],
    [
      alchemyProvider({ apiKey: env }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'ETH INDIA',
    projectId: '1ac6c697e8dfb792117061f61457d73a',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  })

  return (
    // <ContextProvider>
      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
      accentColor: '#806DFF',
      accentColorForeground: 'white',
      borderRadius: 'medium',
      fontStack: 'system',
      overlayBlur: 'small',
    })}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  // </ContextProvider>
  )
}
