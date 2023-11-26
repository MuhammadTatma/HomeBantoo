import { Text, UnorderedList, Card, CardBody,  Heading, Stack,  Image, } from "@chakra-ui/react"

export const Recipe = ({ title, calories, image, ingredients }) =>{

  return (
    <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={image}
    alt={title}
  />

  <Stack>
    <CardBody textAlign={"left"}>
      <Heading size='md'>{title}</Heading>
      <Text py={2}>Calories : {calories}</Text>
      <UnorderedList>
        {ingredients.map((ingredients) => {
          return (
            <Text key={Math.random()}>{ingredients.text}</Text>
          )
        })}
        
      </UnorderedList>
    </CardBody>

    {/* <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Buy Latte
      </Button>
    </CardFooter> */}
  </Stack>
</Card>
  )
}