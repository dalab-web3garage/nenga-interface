import {
  Box,
  Container,
  Stack,
  useColorModeValue,
  Icon,
  Link,
  Image
} from '@chakra-ui/react'
import { FaGithubAlt } from 'react-icons/fa'
import useTranslation from 'next-translate/useTranslation'
import { SocialButtons } from '@/components/common/SocialButtons'
import { SocialButton } from '@/components/common/SocialButton'

export const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <Box
      p={3}
      mt={10}
      bottom={0}
      position="relative"
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth={1}
      borderTopColor={'#0D405A'}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Link mt="0" href="https://joi.ito.com/" title="Joi Ito dot com">
          <Box boxSize="32px">
            <Image
              src="https://joi.ito.com/_site/img/Joi-Ito-Portrait-256px.jpg"
              alt="Joi Ito"
            />
          </Box>
        </Link>
        <SocialButtons />
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'github'}
            href={'https://github.com/dalab-web3garage/nenga-interface'}
          >
            <Icon as={FaGithubAlt} />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}
