import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { ConnectorLoader } from './connector-loader';
import React from 'react';
import { formatAddress } from '@/lib/utils';
import { Button } from '@heroui/button';

export function ConnectWallet() {
  const { address, connector, isConnected, isConnecting, isReconnecting, chainId } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (isConnecting || isReconnecting) return <ConnectorLoader />;

  return (
    <div>
      {!isConnected && !address ? (
        <div className="flex flex-col gap-3 w-full max-w-80">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onPress={() => connect({ connector, chainId })}
              variant="solid"
              color="primary"
            >
              {connector.name}
            </Button>
          ))}
        </div>
      ) : address && (
        <div className="flex items-center justify-between gap-3 p-3 border max-w-80 rounded-2xl">
          <div className="flex items-center gap-2">
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium">
                {formatAddress(address)}
              </span>
              <span className="text-xs text-default-500 ">
                {connector?.name || ''}
              </span>
            </div>
          </div>

          <Button size="sm" color="danger" onPress={() => disconnect()}>
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
}
