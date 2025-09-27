import { erc20ABI } from '@/lib/abis/erc20.abi';
import { vaultABI } from '@/lib/abis/vault.abi'
import { USDC_ADDRESS, VAULT_ADDRESS } from '@/lib/constants'
import { formatNumber } from '@/lib/utils';
import React from 'react'
import { useAccount, useReadContract } from 'wagmi'

export default function Step3() {
  const { address } = useAccount();

  const { data } = useReadContract({
    address: VAULT_ADDRESS,
    abi: vaultABI,
    functionName: "balanceOf",
    args: [address],
    query: {
      refetchInterval: 2000,
    }
  })

  const { data: allowance } = useReadContract({
    address: USDC_ADDRESS,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, VAULT_ADDRESS],
    query: {
      refetchInterval: 2000,
    }
  })

  return (
    <div className='flex flex-col gap-2'>
      <span>balance vault saya: {formatNumber(Number(data))} USDC</span>
      <span>allowance saya: {formatNumber(Number(allowance))} USDC</span>
    </div>
  )
}
