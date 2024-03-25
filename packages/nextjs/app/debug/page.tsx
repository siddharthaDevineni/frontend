import { DebugContracts } from "./_components/DebugContracts";
import { Winner } from "../../components/winnerDecider";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Play RPS",
  description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const Debug: NextPage = () => {
  return (
    <>
      <DebugContracts />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0"><Winner></Winner></h1>
      </div>
    </>
  );
};

export default Debug;
