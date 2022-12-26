import {
  Container,
  Heading,
  Box,
  Flex,
  Spacer,
  useColorMode,
  Button,
  Image,
  SimpleGrid,
  Stack,
  Text
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
              <Image src="/joi-ito-logo-300.png" boxSize="92px" />
              {/* <Heading size={'md'}>年賀状 - Nengajyo</Heading> */}
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

      {/* <Container maxW="6xl" style={{marginBottom:'5em'}}>{children}</Container> */}

      <Container maxW="6xl" p={4} mb="10">
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={5}>
          <Stack mt={5}>
            {children}
          </Stack>
          <Stack mt={5}>
            <Heading as="h4" fontWeight={300}>Placeholder</Heading>
            <Text fontWeight={500}>Placeholder</Text>
            <Image src="/joi-ito-logo-300.png" boxSize="150px" ml="6" style={{float:'right'}} />
            <Text color={'gray.600'}>
            Vero tum ex mara decet consequat pala at imputo. Torqueo voco secundum loquor autem, sudo illum in. Venio quia, vereor jus, ibidem molior tum adsum eu.
            </Text>
            <Text color={'gray.600'}>
            Feugait macto virtus sed iusto ludus melior duis ut proprius secundum exputo brevitas brevitas iusto. Secundum pala illum usitas loquor, capto erat, indoles mara in ut. Illum autem multo persto ut qui, populus pala vulputate. Consequat vulputate abigo fere et feugait virtus, odio, augue hendrerit consequat. Feugiat loquor premo abico proprius ut. Pecus at ullamcorper imputo modo nibh consequat delenit. Ingenium acsi nulla paulatim quidem verto enim opto esca odio cui.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>

      <DALabFooter />
    </>
  )
}

export { JoiNengajyoLayout }
