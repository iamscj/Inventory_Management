import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import bcrypt from "bcryptjs"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Text,
  Heading,
  Button,
  ButtonGroup,
  IconButton,
  useToast
} from '@chakra-ui/react'
import NavBar from '../components/Navbar';
import { ArrowBackIcon, ArrowLeftIcon, CheckCircleIcon, Icon } from '@chakra-ui/icons';
const Cart = ({ cartItems, handleAddProduct, handleRemoveProduct }) => {

  const navigate = useNavigate();
  // useEffect(() => {
  //   let login = localStorage.getItem('login');
  //   let key = localStorage.getItem('key');
  //   let key1 = localStorage.getItem('key1');
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:4000/test?email=${key}`);
  //       console.log(res)
  //       const previlige = res.data.previlige
  //       const password = res.data.password
  //       const isPasswordCorrect = bcrypt.compareSync(key1, res.data.password);
  //       if (isPasswordCorrect === false) {
  //         navigate('/login')
  //       }
  //       return 1;
  //     } catch (err) {
  //       console.log(err);
  //       return 0;
  //     }
  //   };
  //   console.log(fetchData());
  //   if (login !== "customer" && fetchData()) {
  //     navigate('/login')
  //   }
  // });
  console.log(cartItems)
  const toast = useToast();
  const totalPrice = cartItems.reduce((cost, item) => cost + item.quantity * item.cost, 0);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let customerID = localStorage.getItem('user-id');
    try {
      let response = await axios.post('http://localhost:4000/new-order', { customerID: customerID });
      console.log(response);
      toast({
        id: 'Success',
        title: `Order Placed Successfully! Order ID : ${response.data.orderID}`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        toast({
          id: 'Redirection',
          title: 'Redirecting to Products Page...',
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
      }, 2500);
      setTimeout(goback, 4500);
    } catch (err) {
      toast({
        id: 'Error',
        title: err.response.data,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    }
  };

  function goback() {
    navigate('/placeorder')
  }
  return (
    <div>
      <Container maxW={"100%"} display={"flex"} flexDir="column" padding='0px'>
        <NavBar navItems={NAV_ITEMS} />
      </Container>
      <Container display={"flex"} justifyContent={"center"} alignItems={"center"} mt={"5%"}>
        <Heading fontSize={'4xl'} fontFamily={'body'} fontWeight={500}>
          Cart
        </Heading>
      </Container>

      {cartItems.length === 0 && (<Container display={"flex"} justifyContent={"center"} alignItems={"center"} mt={"5%"} flexDir="column">
        <Heading fontSize={'4xl'} fontFamily={'body'} fontWeight={500}>
          No Items in the Cart
        </Heading>
        <Button mt={"10vh"} mb={"10vh"} colorScheme={"blue"} size="lg" onClick={goback} leftIcon={<ArrowLeftIcon />}>
          Go Back</Button>
      </Container>)}

      {cartItems.length !== 0 && (
        <div>
          <TableContainer width={"90%"} margin={"auto"} mt={"5vh"}>
            <Table variant='striped' border='3px solid gray'>
              <Thead>
                <Tr>
                  <Th>PanelID</Th>
                  <Th>PanelType</Th>
                  <Th>Cost</Th>
                  <Th>Content</Th>
                  <Th>Quantity</Th>
                  <Th>Total Cost</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item) => (

                  <Tr>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.cost}</Td>
                    <Td>{item.contents}</Td>
                    <Td>
                      <ButtonGroup isAttached>
                        <Button colorScheme={"red"} fontSize="3xl" onClick={() => { handleRemoveProduct(item) }}>-</Button>
                        <Text fontSize={"xl"} textAlign="center" px="3vw" bg="teal" py="1vh">{item.quantity}</Text>
                        <Button colorScheme={"teal"} fontSize="xl" onClick={() => { handleAddProduct(item) }}>+</Button>
                      </ButtonGroup>
                    </Td>
                    <Td>
                      {item.quantity * item.cost}
                    </Td>
                  </Tr>

                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Container display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}
            bg="teal" mt={"5vh"}
            width="80%"
            borderRadius={"10px"}
          >
            <Text colorScheme={"#cccccc"}
              fontSize="2xl"
            >Total Cost :</Text>
            <Text colorScheme={"#red"}
              fontSize="2xl"
            >₹ {totalPrice}</Text>
          </Container>

          <Container display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Button marginRight={'10px'} mt={"3vh"} mb={"10vh"} colorScheme={"blue"} size="lg" onClick={goback} leftIcon={<ArrowLeftIcon />}>
              Go Back</Button>
            <Button marginLeft={'10px'} mt={"3vh"} mb={"10vh"} colorScheme={"green"} size="lg" rightIcon={<CheckCircleIcon />}
              onClick={handleSubmit}
            >Place Order</Button>
          </Container>
        </div>
      )}
    </div>
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

export default Cart
