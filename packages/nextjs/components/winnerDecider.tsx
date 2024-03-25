"use client";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { ethers } from "ethers";
import { createPublicClient, http } from "viem";
import { hardhat } from "viem/chains";
import { useEffect, useState } from 'react';
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useBalance, useContractRead } from 'wagmi';
import { Address } from 'viem';

export const Winner = () => {
  // const [winner, setWinner] = useState<string>();
  
  // const client = createPublicClient({
  //     chain: hardhat,
  //     transport: http(),
  // })
  let winner: string;
  let j1BalanceBeforeSolve: bigint = 0n;
  let j2BalanceBeforeSolve: bigint = 0n;
  let j1BalanceAfterSolve: bigint = 0n;
  let j2BalanceAfterSolve: bigint = 0n;
  let stakeBeforeSolve: bigint = 0n;
  const {data: stake} = useContractRead({
    address: useDeployedContractInfo("RPS").data?.address as Address,
    abi: useDeployedContractInfo("RPS").data?.abi,
    functionName: "stake"
  })
  stakeBeforeSolve = stake? stake: 0n;
  const {data: j1} = useContractRead({ 
    address: useDeployedContractInfo("RPS").data?.address as Address,
    abi: useDeployedContractInfo("RPS").data?.abi,
    functionName: "j1"
  })
  const {data: j2} = useContractRead({
    address: useDeployedContractInfo("RPS").data?.address as Address,
    abi: useDeployedContractInfo("RPS").data?.abi,
    functionName: "j2"
  })
  if(stake){
    const {data: balj1BS} = useBalance({
      address: j1,
      onSuccess(data) {
        j1BalanceBeforeSolve = balj1BS?.value!;
        console.log("j1BalanceBeforeSolve: ", j1BalanceBeforeSolve);
      },
    })
    const {data: balj2BS} = useBalance({
      address: j2,
      onSuccess(data) {
        j2BalanceBeforeSolve = balj2BS?.value!;
        console.log("j2BalanceBeforeSolve: ", j2BalanceBeforeSolve);
      },
    })
  }
  if(!stake){
    const {data: balj1AS} = useBalance({
      address: j1,
      onSuccess(data) {
        j1BalanceAfterSolve = balj1AS?.value!;
        console.log("j1BalanceAfterSolve: ", j1BalanceAfterSolve);
      },
    })
    const {data: balj2AS} = useBalance({
      address: j2,
      onSuccess(data) {
        j2BalanceAfterSolve = balj2AS?.value!;
        console.log("j2BalanceAfterSolve: ", j2BalanceAfterSolve);
      },
    })
  }
  if (Math.abs(Number(j1BalanceBeforeSolve) - Number(j1BalanceAfterSolve)) === Number(stakeBeforeSolve)) {
    winner = "j1";
  }
  if (Math.abs(Number(j2BalanceBeforeSolve) - Number(j2BalanceAfterSolve)) === Number(stakeBeforeSolve)) {
    winner = "j2";
  }
  else{
    winner = "tie";
  }

  const revealWinner = () => {
    console.log("winner is: ", winner);
  }

  return (
    <div>
      <button className="button" onClick={revealWinner}>
        Click to reveal Winner!
      </button>
    </div>
  );
};