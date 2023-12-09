import { Hero } from "@/components/Hero";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { address, isConnected, isDisconnected } = useAccount();
  useEffect(() => {
    if (isDisconnected) {
      router.push("/landing");
    }
  }, [isDisconnected, router]);

  if (isConnected) {
    return (
      <main className="mt-[calc(16px+56px)]">
        <Hero />
      </main>
    );
  }

  return null;
}
