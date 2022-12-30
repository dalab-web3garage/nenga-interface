import type { NextPage } from 'next'
import { JoiNengajyoLayout } from '@/components/layouts/JoiNengajyoLayout'
import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import { SideContent } from '@/components/common/SideContent'

const Home: NextPage = () => {
  return (
    <>
      <JoiNengajyoLayout>
        <Flex direction={['column', 'row']}>
          <Container mb={10}>
            <Heading as="h2" color="white.600" style={{ fontWeight: '300' }}>
              {`Nengajyo 2023`}
            </Heading>
            <Stack>
              <Link mt="1rem" href="/nengajyo/1">
                <Button>Nengajyo NFT mint page</Button>
              </Link>
              <Link mt="1rem" href="/ja/nengajyo/1">
                <Button>Nengayoのmintページ</Button>
              </Link>
            </Stack>
          </Container>
          <SideContent />
        </Flex>
      </JoiNengajyoLayout>
    </>
  )
}

export default Home
