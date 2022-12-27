import {
  Container,
  Box,
  Flex,
  Spacer,
  Button,
  Image
} from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import { SwitchNetworkAlert } from '@/components/metaMask/SwitchNetworkAlert'
import { MetaMaskLeadBanner } from '@/components/metaMask/MetaMaskLeadBanner'
import { Footer } from '@/components/footer'
import setLanguage from 'next-translate/setLanguage'

interface LayoutProps {
  children: React.ReactNode
}

const JoiNengajyoLayout = ({ children }: LayoutProps) => {
  const { t, lang } = useTranslation('dalabs')

  return (
    <>
      <SwitchNetworkAlert />
      <MetaMaskLeadBanner />
      <Box
        p="4"
        style={{
          opacity: 0.85,
          backgroundImage: 'linear-gradient( 125deg, #f5f5f5 35%, #0299ce)',
          backgroundSize: '100% 140px',
          borderBottom: '1px solid #000',
          marginBottom: '2em'
        }}
      >
        <Container maxW="6xl">
          <Flex>
            <Box p={0}>
              <Image src="/joi-ito-logo-300.png" boxSize="92px" alt="joi ito" />
            </Box>
            <Spacer />
            <Box p={2}>
              <Button
                onClick={async () =>
                  await setLanguage(lang == 'en' ? 'ja' : 'en')
                }
                style={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  fontWeight: '500'
                }}
              >
                {lang == 'en' ? '日本語' : 'English'}
              </Button>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW="6xl">{children}</Container>
      <Footer />
    </>
  )
}

export { JoiNengajyoLayout }
