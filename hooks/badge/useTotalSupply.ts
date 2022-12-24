import { useContractRead } from 'wagmi'
import JoisNengajyo from '@/utils/abis/JoisNengajyo.json'

export const useTotalSupply = (contract: string, tokenId: number) => {
  const { data: totalSupply, isError } = useContractRead(
    {
      addressOrName: contract,
      contractInterface: JoisNengajyo.abi
    },
    'totalSupply',
    {
      args: [tokenId]
    }
  )

  return {
    totalSupply,
    isError
  }
}
