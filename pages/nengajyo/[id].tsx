import { Heading, Text, SimpleGrid, Button, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useFetchTokenURIJSON } from '@/hooks/badge/useFetchMetaData'
import { NFTImage } from '@/components/NFTImage'
import { getContractAddress } from '@/utils/contractAddress'
import { useAccount, useConnect, useNetwork } from 'wagmi'
import { useMintBadge } from '@/hooks/badge/useMintBadge'
import { useBadgeBalanceOf } from '@/hooks/badge/useBalanceOf'
import { ConnectMetaMask } from '@/components/metaMask/Connect'
import { useEffect, useState } from 'react'
import { JoiNengajyoLayout } from '@/components/layouts/JoiNengajyoLayout'
import setLanguage from 'next-translate/setLanguage'
import { useNengajyoErc1155 } from '@/hooks/badge/useNengajyoErc1155'

const DAlabBadge = () => {
  const router = useRouter()
  const { id } = router.query
  const tokenID = parseInt(id as string)
  const { activeChain } = useNetwork()
  const { t } = useTranslation('dalabws')
  const { data } = useAccount()
  const nengajyoErc1155 = getContractAddress({
    name: 'nengajyo',
    chainId: activeChain?.id
  })
  const { badge } = useNengajyoErc1155(nengajyoErc1155, tokenID)
  const { tokenURIJSON } = useFetchTokenURIJSON(badge?.tokenURI)
  const { isMinting, mint } = useMintBadge(
    nengajyoErc1155,
    data?.address,
    tokenID
  )
  const { hasNft } = useBadgeBalanceOf(nengajyoErc1155, data?.address, tokenID)
  const [minted, setMinted] = useState(false)

  useEffect(() => {
    setMinted(hasNft)
  }, [badge?.mintable, hasNft])

  const { isDisconnected } = useConnect()
  if (isDisconnected) {
    return (
      <JoiNengajyoLayout>
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={5} color="white">
          <Box m={5}>
            <Heading mt={50} size="lg">
              {t('notConnected.title')}
            </Heading>
            <Text mt={10}>{t('notConnected.description')}</Text>
            <Text mt={10}>
              <ConnectMetaMask style={{ with: '100%', minWidth: '300px' }}>
                {t('notConnected.button')}
              </ConnectMetaMask>
            </Text>
          </Box>
        </SimpleGrid>
      </JoiNengajyoLayout>
    )
  }

  const title = minted ? t('afterMint.title') : t('connected.title')
  const description = minted
    ? t('afterMint.description')
    : t('connected.description')

  if (!isDisconnected) {
    return (
      <JoiNengajyoLayout>
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={5} color="white">
          <Box>
            <Heading mt={50} size="lg">
              {`Mint Joi's NENGAJYO`}
            </Heading>
            {tokenURIJSON?.image && <NFTImage imageUrl={tokenURIJSON?.image} />}
          </Box>
          <Box m={5}>
            <Heading mt={50} size="lg">
              {title}
            </Heading>
            <Text mt={10}>{description}</Text>
            <Text mt={10}>
              {minted ? (
                <Text>{t('afterMint.notice')}</Text>
              ) : (
                <Button
                  width="100%"
                  minWidth="300px"
                  onClick={() => mint()}
                  colorScheme="teal"
                  mt={2}
                  loadingText="minting..."
                  isLoading={isMinting}
                >
                  {t('connected.button')}
                </Button>
              )}
            </Text>
          </Box>
        </SimpleGrid>
      </JoiNengajyoLayout>
    )
  }
}

export default DAlabBadge
