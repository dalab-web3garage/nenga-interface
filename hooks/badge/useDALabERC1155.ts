import { useContractRead } from 'wagmi'
import DALabERC1155 from '@/utils/abis/DaLabERC1155.json'
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

export const useDALabERC1155 = (contract: string, id: number) => {
  const [badge, setBadge] = useState<Badge>()
  const { data, isError } = useContractRead(
    {
      addressOrName: contract,
      contractInterface: DALabERC1155.abi
    },
    'badges',
    {
      args: [id]
    }
  )

  useEffect(() => {
    if (data && data.length == BADGE_ELEMENT_SIZE) {
      const [mintable, transferable, maxSupply, tokenURI, maxMintPerWallet] = data
      setBadge({ mintable, transferable, maxSupply, tokenURI, maxMintPerWallet})
    }
    console.log('badge', badge)
  }, [data])

  return {
    badge,
    isError
  }
}
