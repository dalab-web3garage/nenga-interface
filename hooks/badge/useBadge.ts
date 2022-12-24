import { useContractRead } from 'wagmi'
import JoisNengajyo from '@/utils/abis/JoisNengajyo.json'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

export interface Badge {
  mintable: boolean
  transferable: boolean
  amount: ethers.BigNumber
  maxSupply: ethers.BigNumber
  tokenURI: string
  maxMintPerWallet: ethers.BigNumber
}

const BADGE_ELEMENT_SIZE = 6

export const useBadge = (contract: string, id: number) => {
  const [badge, setBadge] = useState<Badge>()
  const { data, isError } = useContractRead(
    {
      addressOrName: contract,
      contractInterface: JoisNengajyo.abi
    },
    'items',
    {
      args: [id]
    }
  )

  useEffect(() => {
    if (data && data.length == BADGE_ELEMENT_SIZE) {
      const [mintable, transferable, amount, maxSupply, tokenURI, maxMintPerWallet] = data
      setBadge({ mintable, transferable, amount, maxSupply, tokenURI, maxMintPerWallet})
    }
    console.log('badge', badge)
  }, [data])

  return {
    badge,
    isError
  }
}
