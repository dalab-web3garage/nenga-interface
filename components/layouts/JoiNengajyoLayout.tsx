import {
  Container,
  Heading,
  Box,
  Flex,
  Spacer,
  useColorMode,
  Button
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { SwitchNetworkAlert } from '@/components/metaMask/SwitchNetworkAlert'
import { MetaMaskLeadBanner } from '@/components/metaMask/MetaMaskLeadBanner'
import { DALabFooter } from '@/components/footer'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import setLanguage from 'next-translate/setLanguage'
import { useEffect } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const JoiNengajyoLayout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { t, lang } = useTranslation('dalabs')
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <SwitchNetworkAlert />
      <MetaMaskLeadBanner />
      <Box p="4">
        <Flex>
          <Box p={2}>
            <Heading size="md">{`Joi's Nengajyo`}</Heading>
          </Box>
          <Spacer />
          <Box p={2}>
            <Button size="md" onClick={toggleColorMode} p={4} m={2}>
              {colorMode == 'dark' ? <SunIcon /> : <MoonIcon />}
            </Button>

            <Button
              onClick={async () =>
                await setLanguage(lang == 'en' ? 'ja' : 'en')
              }
            >
              {lang == 'en' ? '日本語' : 'English'}
            </Button>
          </Box>
        </Flex>
      </Box>
      <Container maxW="4xl">{children}</Container>
      <DALabFooter />
    </>
  )
}

export { JoiNengajyoLayout }
