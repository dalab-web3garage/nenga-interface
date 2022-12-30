import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Container, Heading, Stack, Text, Link } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

interface Prop {
  children?: React.ReactNode
}
export const SideContent: React.FC<Prop> = ({ children }) => {
  const { t } = useTranslation('sideBar')

  return (
    <Container>
      <Stack>
        <Heading as="h4" fontWeight={300}>
          {t('title')}
        </Heading>
      </Stack>
      <Stack mt={5}>
        <Text color={'gray.600'}>{t('description')}</Text>
      </Stack>
      <Text>
        <Link
          href="https://twitter.com/joi"
          isExternal
          color={'blue.400'}
          fontWeight={'bold'}
        >
          {t('follow')}<ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Stack mt={5}>{children}</Stack>
    </Container>
  )
}
