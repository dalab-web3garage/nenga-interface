import { useContractRead } from 'wagmi'
import JoisNengajyo from '@/utils/abis/JoisNengajyo.json'

export const useBadgeBalanceOf = (
  contract: string,
  owner: string | undefined,
  tokenId: number | undefined
) => {
  const { data: balanceOf, isError } = useContractRead(
    {
      addressOrName: contract,
      contractInterface: JoisNengajyo.abi
    },
    'balanceOf',
    {
      args: [owner, tokenId],
      watch: true
    }
  )

  return {
    balanceOf,
    hasNft: balanceOf?.gt(0),
    isError
  }
}
