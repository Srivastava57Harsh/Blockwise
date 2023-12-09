import * as React from "react";
import * as PushAPI from "@pushprotocol/restapi";
//@ts-ignore
import { useAccount, useSigner } from "wagmi";

const Notifs = (props: any) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [notifs, setNotifs] = React.useState([]);

  const turnonNotifs = async () => {
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: "eip155:5:0xEdEFD55a9674550669Bdfe304f8d5c725b0817dF", // channel address in CAIP
      userAddress: `eip155:5:${address}`, // user address in CAIP
      onSuccess: () => {
        // console('opt in success');
      },
      onError: () => {
        console.error("opt in error");
      },
      //@ts-ignore
      env: "staging",
    });
  };

  const getNotifs = async () => {
    const notifications = await PushAPI.user.getFeeds({
      user: `eip155:5:${address}`, // user address in CAIP
      //@ts-ignore
      env: "staging",
    });

    setNotifs(notifications);
    // console(notifications);
  };

  React.useEffect(() => {
    getNotifs();
  }, [address]);
};
export default Notifs;
