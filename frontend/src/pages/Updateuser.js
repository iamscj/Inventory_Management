import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Container
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import bcrypt from "bcryptjs"
import NavBar from '../components/Navbar';

const Updateuser = () => {

  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem('login');
    let key = localStorage.getItem('key');
    let key1 = localStorage.getItem('key1');
    console.log("hi" + key)

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/test?email=${key}`);
        console.log(res)
        const previlige = res.data.previlige
        const password = res.data.password
        console.log("Password is " + password)
        console.log("Key1 " + key1)
        const isPasswordCorrect = bcrypt.compareSync(key1, res.data.password);
        if (isPasswordCorrect === false) {
          navigate('/login')
        }
        return 1;
      } catch (err) {
        console.log(err);
        return 0;
      }
    };
    console.log(fetchData());
    if (login !== "customer" && fetchData()) {
      navigate('/login')
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [data, setData] = useState([])
  useEffect(() => {
    let login = localStorage.getItem('login');
    let key = localStorage.getItem('key');
    let key1 = localStorage.getItem('key1');

    let fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/getuser?email=${key}`);
        // console.log(res)
        // const previlige = res.data.previlige
        // const password = res.data.password
        const uid = res.data.customer_id
        const fname = res.data.customer_fname
        const lname = res.data.customer_lname
        const email = res.data.customer_email
        const phoneno = res.data.customer_contact
        const address = res.data.customer_address
        const data1 = {
          uid: uid,
          fname: fname,
          lname: lname,
          email: email,
          phoneno: phoneno,
          address: address,
        }
        console.log(data1)
        setData(data1)
      } catch (err) {
        console.log(err);
        return 0;
      }
    };
    fetchData();
  }, []);

  const [inputs, setInputs] = useState({
    userid: "",
    fname: "",
    lname: "",
    email: "",
    phoneno: "",
    password: "",
    address: "",
    confirmpassword: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("jshfkj")
    console.log(inputs)
    inputs.userid = data.uid;
    console.log(data.uid)
    if (inputs.fname.length === 0) {
      inputs.fname = data.fname
    }
    if (inputs.lname.length === 0) {
      inputs.lname = data.lname
    }
    if (inputs.email.length === 0) {
      inputs.email = data.email
    }
    if (inputs.phoneno.length === 0) {
      inputs.phoneno = data.phoneno
    }
    if (inputs.address.length === 0) {
      inputs.address = data.address
    }

    if (!inputs.phoneno.match(/^\d{10}$/)) {
      toast({
        title: "Enter Correct Phone Number",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (inputs.password.length < 8) {
      toast({
        title: "Password Must Contain minimum of 8 characters",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (inputs.password != inputs.confirmpassword) {
      toast({
        title: "Passowords Don't Match",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }


    try {
      const salt = bcrypt.genSaltSync(10);
      inputs.password = bcrypt.hashSync(inputs.password, salt)
      const res = await axios.post("http://localhost:4000/updateprofile", inputs);
      if (res.data === "UserID already taken") {
        toast({
          title: "UserID already taken",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        })
        return;
      };
      if (res.data === "Email already registered") {
        toast({
          title: "Email Already Exists",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        })
        return;
      };
      toast({
        title: "Update Information Successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      })
      localStorage.clear()
      navigate("/login");
    } catch (err) {
      console.log(err)
    }
  };

  console.log(inputs)
  return (
    <>
      <Container maxW={"100%"} display={"flex"} flexDir="column" padding='0px'>
        <NavBar navItems={NAV_ITEMS} />
      </Container>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              UPDATE YOUR INFORMATION
            </Heading>
            <Text fontSize={'xl'} textAlign={'center'} color="red">
              Leave the fields empty which are not to be changed..(password is compulsory)
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="fname" isRequired  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter FirstName"
                      name="fname"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lname" isRequired  >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter LastName"
                      name="lname"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl id="email" isRequired  >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter Your Email Address"
                  name="email"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="phoneno" isRequired  >
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  name="phoneno"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Your Password"
                    name="password"
                    onChange={handleChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="confirmpassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Your Password"
                    name="confirmpassword"
                    onChange={handleChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your Address"
                  name="address"
                // onChange={handleChange}
                />
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSubmit}
                >
                  Update Details
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}


const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/customer',
  },
  {
    label: 'Orders',
    children: [
      {
        label: 'New Order',
        subLabel: 'Place a new order.',
        href: '/placeorder',
      },
      {
        label: 'Order History',
        subLabel: 'Check order history.',
        href: '/order-history',
      },
    ],
  },
  {
    label: 'Request History',
    href: '/request-history',
  },
  {
    label: 'Update Details',
    href: '/updateprofile',
  },
];

export default Updateuser;