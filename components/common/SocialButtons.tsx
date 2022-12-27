import { Icon, Stack } from '@chakra-ui/react'
import {
  FaFacebook,
  FaGithubAlt,
  FaInstagram,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa'
import { SocialButton } from '@/components/common/SocialButton'

export const SocialButtons = () => {
  return (
    <>
      <Stack direction={'row'} spacing={2}>
        <SocialButton label={'github'} href={'https://github.com/Joi/'}>
          <Icon as={FaGithubAlt} />
        </SocialButton>
        <SocialButton
          label={'linkedin'}
          href={'https://www.linkedin.com/in/joiito'}
        >
          <Icon as={FaLinkedin} />
        </SocialButton>
        <SocialButton label={'twitter'} href={'https://twitter.com/joi'}>
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
    </>
  )
}
