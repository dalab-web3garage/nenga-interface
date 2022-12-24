import { useContractRead } from 'wagmi'
import JoisNengajyo from '@/utils/abis/JoisNengajyo.json'
import { ethers } from 'ethers'

export type BadgeElement = [
  boolean,
  boolean,
  ethers.BigNumber,
  ethers.BigNumber,
  string
]

export const useBadges = (contract: string) => {
  const { data: badges, isError } = useContractRead(
    {
      addressOrName: contract,
      contractInterface: JoisNengajyo.abi
    },
    'getItems'
  )

  return {
    badges,
    isError
  }
}
