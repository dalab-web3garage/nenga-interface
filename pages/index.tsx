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
    </>
  )
}

export default Home
