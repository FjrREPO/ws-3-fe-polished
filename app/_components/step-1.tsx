import React from 'react'
import { ChainSelector } from '@/components/wallet/chain-selector'
import { ConnectWallet } from '@/components/wallet/connect-wallet'

export default function Step1() {
  return (
    <div className='space-y-2'>
      <ConnectWallet />
      <ChainSelector />
    </div>
  )
}
