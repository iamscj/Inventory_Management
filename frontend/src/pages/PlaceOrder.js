import React from 'react'
import CardForOrders from '../components/CardForOrders'
import {
    ChakraProvider,
    theme,
    Grid,
    GridItem,
    Button,
    Container,
    Heading,
    useTab,
    useToast
} from '@chakra-ui/react';
import {
    Box,
    Center,
    useColorModeValue,
    Text,
    Stack,
    Image,
    ButtonGroup,
    Input
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import data from "./data.js"
import { UseToast } from '@chakra-ui/react';
import axios from 'axios';
import NavBar from '../components/Navbar';
import { ArrowLeftIcon, ArrowRightIcon, Icon } from '@chakra-ui/icons';
const PlaceOrder = ({ handleAddProduct, setInitialCartItems }) => {
    let [productItems, setProductItems] = useState([]);
    let [fetched, setFetched] = useState(false);
    useEffect(() => {
        async function fetchData() {
            console.log(`http://localhost:4000/get-cart?customerID=${localStorage.getItem('user-id')}`);
            let quantities = (await axios.get(`http://localhost:4000/get-cart?customerID=${localStorage.getItem('user-id')}`)).data;
            console.log(quantities);
            let data = [
                {
                    id: 1,
                    name: "Panel 1",
                    cost: 11989,
                    contents: <><t>4 <b className="bb"> PM   .</b></t>  <t> 8 <b className="bb"> CAP   .</b></t> <t> 3 <b className="bb"> TC   </b></t></>,
                    quantity: quantities['panel1']
                },
                {
                    id: 2,
                    name: "Panel 2",
                    cost: 23123,
                    contents: "8 PM + 1 CAP + 3 TC",
                    quantity: quantities['panel2']
                },
                {
                    id: 3,
                    name: "Panel 3",
                    cost: 1313,
                    contents: "4 PM + 8 AUX + 3 TC",
                    quantity: quantities['panel3']
                },
                {
                    id: 4,
                    name: "Panel 4",
                    cost: 112312,
                    contents: "4 PM + 1 CAP + 3 VCU",
                    quantity: quantities['panel4']
                },
                {
                    id: 5,
                    name: "Panel 5",
                    cost: 1112,
                    contents: "1 CAP + 1 TC + 1 AUX",
                    quantity: quantities['panel5']
                },
            ]
            setInitialCartItems(data);
            setProductItems(data);
            setFetched(true);
        }
        fetchData();
    }, []);

    function goback() {
        navigate('/customer')
    }

    const toast = useToast();
    const IMAGE =
        'https://images.unsplash.com/photo-1675576628703-dd13ee3f87b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=457&q=80';
    const navigate = useNavigate();
    let intialval = 1
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
    if (fetched === false) return <div>Loading</div>;
    return (
        <ChakraProvider theme={theme}>
            <Container maxW={"100%"} display={"flex"} flexDir="column" padding='0px'>
                <NavBar navItems={NAV_ITEMS} />
            </Container>
            <Grid templateColumns='repeat(3, 1fr)' marginTop={'5vh'} display={'flex'} flexWrap={'wrap'} justifyContent={'space-around'} width={"70%"} margin={"auto"}>
                {productItems.map((productItem) => (
                    <GridItem>
                        <Container>
                            <Center py={12}>
                                <Box
                                    role={'group'}
                                    p={6}
                                    maxW={'330px'}
                                    w={'full'}
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
                                            {productItem.id}
                                        </Text>
                                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                            {productItem.name}
                                        </Heading>
                                        <Stack direction={'row'} align={'center'}>
                                            <Text fontWeight={500} fontSize={'xl'}>
                                                ₹ {productItem.cost}
                                            </Text>
                                        </Stack>
                                        <Text fontWeight={300} fontSize={'xl'}>
                                            {productItem.contents}
                                        </Text>
                                        {/* <ButtonGroup>
                                            <Button onClick={decNum} id="addtocart">-</Button> */}
                                        {/* <Input type="text" variant='filled' placeholder='0' className="addcartnumber" name="count" value={num} onChange={handleChange1} /> */}
                                        {/* <Text name="count">{num}</Text>
                                            <Button onClick={incNum} id="addtocart">+</Button>
                                        </ButtonGroup> */}
                                        <Button onClick={() => handleAddProduct(productItem)}>
                                            Add to Cart
                                        </Button>
                                    </Stack>
                                </Box>
                            </Center>
                        </Container>
                    </GridItem>
                ))}
            </Grid>
            <Container display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Button marginRight={'10px'} variant='solid' mb={"10vh"} colorScheme={"blue"} size={"lg"} onClick={goback} leftIcon={<ArrowLeftIcon boxSize={4} />}>
                    Go Back</Button>
                <Button rightIcon={<ArrowRightIcon />} mb={"10vh"} colorScheme={"green"} marginLeft={'10px'} size={"lg"}
                    onClick={
                        () => {
                            toast({
                                title: `Taking you to your cart`,
                                status: "success",
                                duration: 4000,
                                isClosable: true,
                                position: "top",
                            })
                            setTimeout(() =>
                                navigate("/cart"),
                                1000)
                        }
                    }
                >Proceed To Cart</Button>
            </Container>
        </ChakraProvider >
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


export default PlaceOrder