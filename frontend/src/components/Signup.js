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
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from "bcryptjs";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const salt = bcrypt.genSaltSync(10);
    const [inputs, setInputs] = useState({
        userid: "",
        fname: "",
        lname: "",
        email: "",
        phoneno: "",
        password: "",
        address: "",
        confirmpassword: "",
        // hashpassword: bcrypt.hashSync(inputs.password, salt)
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inputs.email.length === 0) {
            toast({
                title: "Invalid Email",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "bottom",
            });
            return;
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
            inputs.password = bcrypt.hashSync(inputs.password, salt)
            const res = await axios.post("http://localhost:4000/register", inputs);
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
                title: "Successfully signed up",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "top",
            })
            setTimeout(() => navigate("/login"), 1000);
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
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Signup to know more about us
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="userid" isRequired>
                            <FormLabel>UserID</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter UserID"
                                p={"3%"}
                                margin="auto"
                                name="userid"
                                onChange={handleChange}
                            />
                        </FormControl>

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
                                <FormControl id="lname"   >
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
                                onChange={handleChange}
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
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'} href="/login">Login</Link>
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

// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import eye1 from './eye1';
// import eye2 from './eye2';
// import axios from "axios";

// const Signup = () => {
//     const navigate = useNavigate();
//     const [show, setShow] = useState(false);
//     const handleClick = () => setShow(!show);
//     const toast = useToast();
//     const [inputs, setInputs] = useState({
//         userid: "",
//         fname: "",
//         lname: "",
//         email: "",
//         phoneno: "",
//         password: "",
//         address: "",
//         confirmpassword: "",
//     });

//     const handleChange = (e) => {
//         setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (inputs.password != inputs.confirmpassword) {
//             toast({
//                 title: "Enter Passwords Correctly",
//                 status: "error",
//                 duration: 4000,
//                 isClosable: true,
//                 position: "bottom",
//             });
//             return;
//         }
//         if (!inputs.phoneno.match(/^\d{10}$/)) {
//             toast({
//                 title: "Enter Correct Phone Number",
//                 status: "error",
//                 duration: 4000,
//                 isClosable: true,
//                 position: "bottom",
//             });
//             return;
//         }

//         try {
//             const res = await axios.post("https://f2df6259fd20cc.lhr.life/register", inputs);
//             console.log(res)
//             navigate("/login");
//         } catch (err) {
//             console.log(err)
//         }
//     };

//     console.log(inputs)

//     return (
//         <Container w="70vw" h="100%" m="auto" bg={"#F5F5F5"}>
//             <VStack spacing="1rem" >
//                 <Text fontSize="2rem">Sign Up</Text>

//                 <FormControl id="userid" isRequired  >
//                     <FormLabel>UserID</FormLabel>
//                     <Input
//                         type="text"
//                         placeholder="Enter UserID"
//                         p={"3%"}
//                         w="90%"
//                         margin="auto"
//                         bg={"white"}
//                         name="userid"
//                         onChange={handleChange}
//                     />
//                 </FormControl>

//                 <FormControl id="fname" isRequired  >
//                     <FormLabel>First Name</FormLabel>
//                     <Input
//                         type="text"
//                         placeholder="Enter UserID"
//                         p={"3%"}
//                         w="90%"
//                         margin="auto"
//                         bg={"white"}
//                         name="fname"
//                         onChange={handleChange}
//                     />
//                 </FormControl>

//                 <FormControl id="lname" isRequired  >
//                     <FormLabel>Last Name</FormLabel>
//                     <Input
//                         type="text"
//                         placeholder="Enter UserID"
//                         p={"3%"}
//                         w="90%"
//                         margin="auto"
//                         bg={"white"}
//                         name="lname"
//                         onChange={handleChange}
//                     />
//                 </FormControl>

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

                // <FormControl id="phoneno" isRequired  >
                //     <FormLabel>Phone Number</FormLabel>
                //     <Input
                //         type="text"
                //         placeholder="Enter Your Phone Number"
                //         p={"3%"}
                //         w="90%"
                //         margin="auto"
                //         bg={"white"}
                //         name="phoneno"
                //         onChange={handleChange}
                //     />
                // </FormControl>

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

//                 <FormControl id="confirm" isRequired>
//                     <FormLabel>Confirm Password</FormLabel>
//                     <InputGroup size={"md"} w={"90%"}>
//                         <Input
//                             type={show ? "text" : "password"}
//                             placeholder="Enter Your Password"
//                             p={"3%"}
//                             w="100%"
//                             margin="auto"
//                             bg={"white"}
//                             name="confirmpassword"
//                             onChange={handleChange}
//                         />
//                         <InputRightElement mr={"2%"}>
//                             <Button h="1.75rem" size="sm" onClick={handleClick}>
//                                 {show ? "Hide" : "Show"}
//                             </Button>
//                         </InputRightElement>
//                     </InputGroup>
//                 </FormControl>

//                 <FormControl id="address" isRequired>
//                     <FormLabel>Address</FormLabel>
//                     <Input
//                         type="text"
//                         placeholder="Enter your Address"
//                         p={"3%"}
//                         w="90%"
//                         margin="auto"
//                         bg={"white"}
//                         name="address"
//                         onChange={handleChange}
//                     />
//                 </FormControl>

//                 <Button size={"lg"} bg={"white"} onClick={handleSubmit}>Signup</Button>
//             </VStack>

//         </Container>
//     )
// }

// export default Signup
