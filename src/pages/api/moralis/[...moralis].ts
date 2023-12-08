import { MoralisNextApi } from "@moralisweb3/next";

export default MoralisNextApi({
  //@ts-ignore
  apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
});
