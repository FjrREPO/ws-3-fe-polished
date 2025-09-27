import { Select, SelectItem } from "@heroui/select";
import React from "react";
import { useAccount, useSwitchChain } from "wagmi";

export function ChainSelector() {
  const { isConnected, isConnecting, isReconnecting, chainId } = useAccount();
  const { chains, switchChain, isPending } = useSwitchChain();

  const handleSwitchChain = (newChainId: number) => {
    if (newChainId !== chainId) {
      switchChain({ chainId: newChainId });
    }
  }

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (!isConnected || isConnecting || isReconnecting) {
    return null;
  }

  return (
    <Select
      label="Switch Network"
      className="max-w-80"
      classNames={{
        trigger: "border border-foreground rounded-2xl p-4"
      }}
      variant="bordered"
      selectedKeys={[String(chainId)]}
      onChange={(e) => handleSwitchChain(Number(e.target.value))}
      isDisabled={isPending}
    >
      {chains.map((chain) => (
        <SelectItem key={chain.id}>
          {chain.name}
        </SelectItem>
      ))}
    </Select>
  );
}
