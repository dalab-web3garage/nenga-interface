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
import { useAccount, useConnect, useNetwork } from 'wagmi'
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
                  <Image src={tokenURIJSON?.image} sizes={'120x120'} />
                )}
                <Stack mt="6" spacing="3">
                  <Heading
                    as="h2"
                    color="white.600"
                    style={{ fontWeight: '300' }}
                  >
                    {/* {`Mint Joi's NENGAJYO`} */}
                    {t('notConnected.title')}
                    <br></br>
                    {t('connected.title')}
                  </Heading>
                  <Text>{t('notConnected.description')}</Text>
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
          <SideContent>
            <Text color={'gray.600'}>
              Vero tum ex mara decet consequat pala at imputo.Torqueo voco
              secundum loquor autem, sudo illum in.Venio quia, vereor jus,
              ibidem molior tum adsum eu.
            </Text>
            <Text color={'gray.600'}>
              Feugait macto virtus sed iusto ludus melior duis ut proprius
              secundum exputo brevitas brevitas iusto.Secundum pala illum usitas
              loquor, capto erat, indoles mara in ut.Illum autem multo persto ut
              qui, populus pala vulputate.Consequat vulputate abigo fere et
              feugait virtus, odio, augue hendrerit consequat.Feugiat loquor
              premo abico proprius ut.Pecus at ullamcorper imputo modo nibh
              consequat delenit.Ingenium acsi nulla paulatim quidem verto enim
              opto esca odio cui.
            </Text>
          </SideContent>
        </Flex>
      </JoiNengajyoLayout>
    )
  }
}

export default DAlabBadge
