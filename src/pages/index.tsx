import { Hero } from "@/components/Hero";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title> Eth India</title>
      </Head>
      <main className="mt-[calc(16px+56px)]">
        <Hero />
      </main>
    </>
  );
}
