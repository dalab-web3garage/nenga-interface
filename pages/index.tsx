import type { NextPage } from 'next'
import { JoiNengajyoLayout } from '@/components/layouts/JoiNengajyoLayout'
import { Button, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <>
      <JoiNengajyoLayout>
        <Heading as="h2" color="white.600">
          {`Welcome to Joi's Nengajyo page`}
        </Heading>
        <Stack>
          <Link mt="1rem" href="/en/nengajyo/1">
            <Button>Nengajyo NFT mint page</Button>
          </Link>
          <Link mt="1rem" href="/nengajyo/1">
            <Button>Nengayoのmintページ</Button>
          </Link>
        </Stack>
      </JoiNengajyoLayout>
    </>
  )
}

export default Home
