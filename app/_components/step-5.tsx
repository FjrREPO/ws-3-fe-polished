"use client";

import { USDC_ADDRESS, VAULT_ADDRESS } from "@/lib/constants";
import { vaultABI } from "@/lib/abis/vault.abi";
import { Button } from "@heroui/button";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { erc20ABI } from "@/lib/abis/erc20.abi";
import Loading from "@/components/loading";

export default function Step5() {
  const { address } = useAccount();
  const { writeContract, isPending, data } = useWriteContract();
  const waitTransaction = useWaitForTransactionReceipt({
    hash: data,
  });

  const handleMint = () => {
    writeContract({
      address: USDC_ADDRESS,
      abi: erc20ABI,
      functionName: "mint",
      args: [address!, 1000e6],
    });
  };

  const handleApprove = () => {
    writeContract({
      address: USDC_ADDRESS,
      abi: erc20ABI,
      functionName: "approve",
      args: [VAULT_ADDRESS, 1000e6],
    });
  };

  const handleDeposit = () => {
    writeContract({
      address: VAULT_ADDRESS,
      abi: vaultABI,
      functionName: "deposit",
      args: [1000e6, address!],
    });
  };

  const handleWithdraw = () => {
    writeContract({
      address: VAULT_ADDRESS,
      abi: vaultABI,
      functionName: "withdraw",
      args: [1000e6, address!, address!],
    });
  };

  const handleApproveAndDeposit = async() => {
    await handleApprove();

    if (waitTransaction?.isSuccess) {
      await handleDeposit();
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-80">
      {isPending && <Loading />}
      <Button onPress={handleMint} variant="solid" color="primary">
        Mint 1000 USDC
      </Button>
      <Button onPress={handleApprove} variant="solid" color="primary">
        Approve 1000 USDC
      </Button>
      <Button onPress={handleDeposit} variant="solid" color="primary">
        Deposit 1000 USDC
      </Button>
      <Button onPress={handleWithdraw} variant="solid" color="primary">
        Withdraw 1000 USDC
      </Button>
      <Button onPress={handleApproveAndDeposit} variant="solid" color="primary">
        Approve and Deposit 1000 USDC
      </Button>
    </div>
  );
}
