import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Container,
  ButtonGroup,
  Input
} from '@chakra-ui/react';
import { useState } from 'react';
const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export default function CardForOrders(props) {

  const handleAddtoCard = () => {
    // if(document.getElementById("addtocard").innerHTML==="Add to")
  }
  
  let [num, setNum] = useState(0);
  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  }
  let [inputs, setInputs] = useState({
    count:0
  });
  let handleChange = (e) => {
    setNum(e.target.value);
  }
  console.log(num);

  

  const handleChange1 = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    localStorage.setItem("num",num);
    localStorage.setItem("panel",props.panel)
  };
  console.log(inputs)

  return (
    <Container>
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${IMAGE})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={IMAGE}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              {props.panel}
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {props.title}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={500} fontSize={'xl'}>
                ₹ {props.cost}
              </Text>
            </Stack>
            <Text fontWeight={300} fontSize={'xl'}>
              {props.content}
            </Text>
            <ButtonGroup>
              <Button onClick={decNum} id="addtocart">-</Button>
              {/* <Input type="text" variant='filled' placeholder='0' className="addcartnumber" name="count" value={num} onChange={handleChange1} /> */}
              <Text name="count">{num}</Text>
              <Button onClick={incNum} id="addtocart" onChange={handleChange1}>+</Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </Center>
    </Container>
  );
}