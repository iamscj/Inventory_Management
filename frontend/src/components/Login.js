import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    useColorModeValue,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/toast";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import bcrypt from "bcryptjs"
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const salt = bcrypt.genSaltSync(10);
            // inputs.password = bcrypt.hashSync(inputs.password, salt)
            console.log(inputs.password);
            let res = await axios.get(`http://localhost:4000/login?email=${inputs.email}`);
            // const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
            console.log("hi" + res.data.password)
            console.log("bye" + inputs.password);
            if (res.data === "Email not registered") {
                toast({
                    title: "Email not Registered",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "bottom",
                })
                return;
            };

            const isPasswordCorrect = bcrypt.compareSync(inputs.password, res.data.password);
            if (isPasswordCorrect === false) {
                toast({
                    title: "Incorrect Password",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "bottom",
                })
                return;
            };
            console.log(res)

            const mypath = res.data.privilege;
            console.log(mypath)

            toast({
                title: "Login Successful, redirecting...",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "top",
            })

            localStorage.setItem("login", mypath);
            localStorage.setItem("key", inputs.email);
            localStorage.setItem("key1", inputs.password);
            res = await axios.get(`http://localhost:4000/user-id?email=${inputs.email}`);
            localStorage.setItem("user-id",res.data.user_id);
            setTimeout(() => navigate("/" + mypath), 1000);
        } catch (err) {
            console.log(err)
        }
    };

    console.log(inputs)
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign In to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        SignIn to know more about our features
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name='email' placeholder='Enter Your Email' onChange={handleChange} />
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
                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSubmit}
                            >
                                Sign in
                            </Button>
                        </Stack>

                        <Stack pt={6}>
                            <Text align={'center'}>
                                Not Registered? <Link color={'blue.400'} href="/register">Register</Link>
                            </Text>
                            <Text align={'center'}>
                                Go Back to <Link color={'blue.400'} href="/">Home</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

// import React from 'react'
// import {
//     FormControl,
//     FormLabel,
//     FormErrorMessage,
//     FormHelperText,
//     Input,
//     Container,
//     VStack,
//     Text,
//     Button,
//     ButtonGroup,
//     InputRightElement,
//     InputGroup,
// } from '@chakra-ui/react'
// import { useToast } from "@chakra-ui/toast";

// // import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import eye1 from './eye1';
// import eye2 from './eye2';
// import axios from "axios";
// import { Link, useNavigate } from 'react-router-dom';
// const Login = () => {

//     const navigate = useNavigate();
//     const [show, setShow] = useState(false);
//     const handleClick = () => setShow(!show);
//     const toast = useToast();
//     const [inputs, setInputs] = useState({
//         email: "",
//         password: "",
//     });

//     const handleChange = (e) => {
//         setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post("http://localhost:4000/login", inputs);
//             console.log(res)

//             const mypath = res.data.privilege;
//             console.log(mypath)
//             localStorage.setItem("login", mypath);
//             navigate("/" + mypath)
//         } catch (err) {
//             console.log(err)
//         }
//     };

//     console.log(inputs)

//     return (
//         <Container w="70vw" h="100%" m="auto" bg={"#F5F5F5"}>
//             <VStack spacing="1rem" >
//                 <Text fontSize="2rem">LogIn</Text>

//                 <FormControl id="email" isRequired  >
//                     <FormLabel>Email</FormLabel>
//                     <Input
//                         type="email"
//                         placeholder="Enter Your Email Address"
//                         p={"3%"}
//                         w="90%"
//                         margin="auto"
//                         bg={"white"}
//                         name="email"
//                         onChange={handleChange}
//                     />
//                 </FormControl>

//                 <FormControl id="password" isRequired>
//                     <FormLabel>Password</FormLabel>
//                     <InputGroup size={"md"} w={"90%"}>
//                         <Input
//                             type={show ? "text" : "password"}
//                             placeholder="Enter Your Password"
//                             p={"3%"}
//                             w="100%"
//                             margin="auto"
//                             bg={"white"}
//                             name="password"
//                             onChange={handleChange}
//                         />
//                         <InputRightElement mr={"2%"}>
//                             <Button h="1.75rem" size="sm" onClick={handleClick}>
//                                 {show ? "Hide" : "Show"}
//                             </Button>
//                         </InputRightElement>
//                     </InputGroup>
//                 </FormControl>

//                 <Button size={"lg"} bg={"white"} onClick={handleSubmit}>Login</Button>
//             </VStack>

//         </Container>
//     )
// }

// export default Login
