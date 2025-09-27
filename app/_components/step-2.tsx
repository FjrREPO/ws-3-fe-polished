import React from 'react'
import { USDC_ADDRESS } from '@/lib/constants';
import { useAccount, useBalance } from 'wagmi';
import { formatNumber } from '@/lib/utils';
import { formatUnits } from 'viem';

export default function Step2() {
  const { address } = useAccount();

  const { data } = useBalance({
    address: address,
    token: USDC_ADDRESS,
    query: {
      refetchInterval: 2000,
    }
  })

  return (
    <div>
      <span>balance saya: {formatNumber(formatUnits(data?.value ?? BigInt(0), 6))} USDC</span>
    </div>
  )
}
