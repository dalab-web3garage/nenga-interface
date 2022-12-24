import { useContractRead } from 'wagmi'
import JoisNengajyo from '@/utils/abis/JoisNengajyo.json'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

export interface Badge {
  mintable: boolean
  transferable: boolean
  maxSupply: ethers.BigNumber
  tokenURI: string
  maxMintPerWallet: ethers.BigNumber
}

const BADGE_ELEMENT_SIZE = 5

export const useNengajyoErc1155 = (contract: string, id: number) => {
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
      const [mintable, transferable, maxSupply, tokenURI, maxMintPerWallet] = data
      setBadge({ mintable, transferable, maxSupply, tokenURI, maxMintPerWallet})
    }
    console.log('items', badge)
  }, [data])

  return {
    badge,
    isError
  }
}
