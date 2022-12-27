import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Icon,
  Link,
  Image
} from '@chakra-ui/react'
import { FaFacebook, FaGithubAlt, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { AiFillTwitterCircle } from "react-icons/ai";
import useTranslation from 'next-translate/useTranslation'

const SocialButton = ({
  children,
  label,
  href
}: {
  children: React.ReactNode
  label: string
  href: string
}) => {
  return (
    <Button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      // w={8}
      // h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  )
}

export const DALabFooter = () => {
  const { t } = useTranslation('common')

  return (
    <Box
      p={0}
      pt={2}
      mt={10}
      bottom={0}
      position="relative"
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth = "1px"
      borderTopColor = "#0D405A"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        pt={0}
        mt={0}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        {/* <Text>© joi.ito.com</Text> */}
        <Link mt="0" href="https://joi.ito.com/" title="Joi Ito dot com">
          <Box boxSize='32px'>
            <Image src='https://joi.ito.com/_site/img/Joi-Ito-Portrait-256px.jpg' alt='Joi Ito' />
          </Box>
        </Link>
        <Stack direction={'row'} spacing={2}>
          <SocialButton
              label={'github'}
              href={'https://github.com/Joi/'}
            >
            <Icon as={FaGithubAlt} />
          </SocialButton>
          <SocialButton
              label={'linkedin'}
              href={'https://www.linkedin.com/in/joiito'}
            >
            <Icon as={FaLinkedin} />
          </SocialButton>
          <SocialButton
              label={'twitter'}
              href={'https://twitter.com/joi'}
            >
            <Icon as={FaTwitter} />
          </SocialButton>
          <SocialButton
              label={'instagram'}
              href={'https://www.instagram.com/joiito/'}
            >
            <Icon as={FaInstagram} />
          </SocialButton>
          <SocialButton
              label={'facebook'}
              href={'https://www.facebook.com/joiito'}
            >
            <Icon as={FaFacebook} />
          </SocialButton>
        </Stack>

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

export const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <Box
      p={5}
      bottom={0}
      position="relative"
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© joi.ito.com</Text>



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
