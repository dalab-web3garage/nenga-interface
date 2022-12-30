import {
  Heading,
  Text,
  SimpleGrid,
  Button,
  Box,
  Stack,
  ButtonGroup,
  Flex,
  Container,
  Link
} from '@chakra-ui/react'
import { Card, CardBody, CardFooter, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useFetchTokenURIJSON } from '@/hooks/badge/useFetchMetaData'
import { getContractAddress } from '@/utils/contractAddress'
import { chainId, useAccount, useConnect, useNetwork } from 'wagmi'
import { useMintBadge } from '@/hooks/badge/useMintBadge'
import { useBadgeBalanceOf } from '@/hooks/badge/useBalanceOf'
import { ConnectMetaMask } from '@/components/metaMask/Connect'
import { useEffect, useState } from 'react'
import { JoiNengajyoLayout } from '@/components/layouts/JoiNengajyoLayout'
import { useNengajyoErc1155 } from '@/hooks/badge/useNengajyoErc1155'
import { SideContent } from '@/components/common/SideContent'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const DAlabBadge = () => {
  const router = useRouter()
  const { id } = router.query
  const tokenID = parseInt(id as string)
  const [domLoaded, setDomLoaded] = useState(false)
  const { activeChain, switchNetwork } = useNetwork()
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
    setDomLoaded(true)
  }, [])

  useEffect(() => {
    setMinted(hasNft)
  }, [badge?.mintable, hasNft])

  const { isDisconnected } = useConnect()
  if (!domLoaded) {
    return null
  }
  if (isDisconnected) {
    return (
      <JoiNengajyoLayout>
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={5}>
          <Box>
            <Heading as="h2" color="white.600" style={{ fontWeight: '300' }}>
              {t('notConnected.title')}
            </Heading>
            <Text mt={10}>{t('notConnected.description')}</Text>
            <Text mt={10}>
              <ConnectMetaMask
                style={{
                  width: '100%',
                  minWidth: '300px',
                  backgroundColor: '#1A80B4'
                }}
              >
                {t('notConnected.button')}
              </ConnectMetaMask>
            </Text>
          </Box>
        </SimpleGrid>
      </JoiNengajyoLayout>
    )
  }

  if (activeChain?.id !== chainId.mainnet) {
    return (
      <JoiNengajyoLayout>
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={5}>
          <Box>
            <Heading as="h2" color="white.600" style={{ fontWeight: '300' }}>
              {t('wrongNetwork.title')}
            </Heading>
            <Text mt={10}>
              <Button onClick={() => switchNetwork?.(chainId.mainnet)}>
                {t('wrongNetwork.button')}
              </Button>
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
        <Flex direction={['column', 'row']}>
          <Container mb={10}>
            <Card maxW="sm" boxShadow={0}>
              <CardBody m="0" p="0">
                {tokenURIJSON?.image && (
                  <Image
                    src={tokenURIJSON?.image}
                    sizes={'120x120'}
                    alt="NFT-IMAGE"
                  />
                )}
                <Stack mt="6" spacing="3">
                  <Heading
                    as="h2"
                    color="white.600"
                    style={{ fontWeight: '300' }}
                  >
                    {title}
                  </Heading>
                  <Text>{description}</Text>
                </Stack>
              </CardBody>
              <CardFooter m="0" p="0" mt="5">
                <ButtonGroup spacing="2">
                  <Text>
                    {minted ? (
                      <>
                        <Text>{t('afterMint.notice')}</Text>
                        <Link
                          href="https://opensea.io/"
                          isExternal
                          fontSize={'md'}
                        >
                          opensea <ExternalLinkIcon mx="2px" />
                        </Link>
                      </>
                    ) : (
                      <Button
                        width="100%"
                        minWidth="300px"
                        onClick={() => mint()}
                        colorScheme="linkedin"
                        mt={2}
                        loadingText="minting..."
                        isLoading={isMinting}
                      >
                        {t('connected.button')}
                      </Button>
                    )}
                  </Text>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Container>
          <SideContent />
        </Flex>
      </JoiNengajyoLayout>
    )
  }
}

export default DAlabBadge
