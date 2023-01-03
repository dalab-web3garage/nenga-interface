import {
  Heading,
  Text,
  SimpleGrid,
  Button,
  Box,
  Stack,
  ButtonGroup,
  Flex,
  Container
} from '@chakra-ui/react'
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import { getContractAddress } from '@/utils/contractAddress'
import {
  chainId,
  useAccount,
  useConnect,
  useNetwork,
  useSignMessage
} from 'wagmi'
import { useBadgeBalanceOf } from '@/hooks/badge/useBalanceOf'
import { ConnectMetaMask } from '@/components/metaMask/Connect'
import { useEffect, useState } from 'react'
import { JoiNengajyoLayout } from '@/components/layouts/JoiNengajyoLayout'
import { SideContent } from '@/components/common/SideContent'
import { verifyMessage } from 'ethers/lib/utils'

const LP = () => {
  const tokenID = 1
  const [domLoaded, setDomLoaded] = useState(false)
  const { activeChain, switchNetwork } = useNetwork()
  const { t } = useTranslation('dalabws')
  const { data } = useAccount()
  const {
    data: msg,
    error,
    isLoading,
    signMessage
  } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data)
      console.log('verify address', address)
    }
  })

  const nengajyoErc1155 = getContractAddress({
    name: 'nengajyo',
    chainId: activeChain?.id
  })
  const { hasNft } = useBadgeBalanceOf(nengajyoErc1155, data?.address, tokenID)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

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

  // const title = minted ? t('afterMint.title') : t('connected.title')
  // const description = minted
  //   ? t('afterMint.description')
  //   : t('connected.description')

  console.log(msg, isLoading)

  if (!isDisconnected && !msg) {
    return (
      <JoiNengajyoLayout>
        <Flex direction={['column', 'row']}>
          <Container mb={10}>
            <Card maxW="sm" boxShadow={0}>
              <CardBody m="0" p="0">
                <Stack mt="6" spacing="3">
                  <Heading
                    as="h2"
                    color="white.600"
                    style={{ fontWeight: '300' }}
                  ></Heading>
                  <Text>
                    You can access to special message if you own green NFT
                  </Text>
                </Stack>
              </CardBody>
              <CardFooter m="0" p="0" mt="5">
                <ButtonGroup spacing="2">
                  <Button
                    onClick={() =>
                      signMessage({ message: 'Sign & check your NFT' })
                    }
                  >
                    Sign & check your NFT
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Container>
          <SideContent />
        </Flex>
      </JoiNengajyoLayout>
    )
  }

  if (!isDisconnected && msg) {
    return (
      <JoiNengajyoLayout>
        <Flex direction={['column', 'row']}>
          <Container mb={10}>
            <Card maxW="sm" boxShadow={0}>
              <CardBody m="0" p="0">
                <Stack mt="6" spacing="3">
                  <Heading
                    as="h2"
                    color="white.600"
                    style={{ fontWeight: '300' }}
                  >
                    {hasNft ? (
                      <Text>Special message for the green holder</Text>
                    ) : (
                      <Text>
                        You do not own green NFT, mint first green nengajyo
                      </Text>
                    )}
                  </Heading>
                  <Text></Text>
                </Stack>
              </CardBody>
              <CardFooter m="0" p="0" mt="5">
                <ButtonGroup spacing="2">
                  <Text></Text>
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

export default LP
