"use client";

import { vaultABI } from "@/lib/abis/vault.abi";
import { VAULT_ADDRESS } from "@/lib/constants";
import React from "react";
import {
  useAccount,
  useSimulateContract,
} from "wagmi";

export default function Step4() {
  const { address } = useAccount();

  const { error, isLoading } = useSimulateContract({
    address: VAULT_ADDRESS,
    abi: vaultABI,
    functionName: "deposit",
    args: [1000e6, address!],
  });

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div>Simulating...</div>
      ) : error ? (
        <div className="bg-red-900 p-5 rounded-2xl">
          <p>Deposit simulation error:</p>
          <pre className="text-xs whitespace-pre-wrap">{error.message}</pre>
        </div>
      ) : (
        <div className="bg-green-900 p-5 rounded-2xl max-w-80">
          <p>Deposit simulation successful! You can proceed to deposit.</p>
        </div>
      )}
    </div>
  );
}
