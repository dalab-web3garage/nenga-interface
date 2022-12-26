import {
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Image,
  Text
} from '@chakra-ui/react'

interface Prop {
  children?: React.ReactNode
}
export const SideContent: React.FC<Prop> = ({ children }) => {
  return (
    <Container>
      <Stack>
        <Heading as="h4" fontWeight={300}>
          Placeholder
        </Heading>
        <Text fontWeight={500}> Placeholder </Text>
        <Image
          src="/joi-ito-logo-300.png"
          boxSize="150px"
          ml="6"
          style={{ float: 'right' }}
          alt="joi-ito-logo"
        />
      </Stack>
      <Stack mt={5}>{children}</Stack>
    </Container>
  )
}
