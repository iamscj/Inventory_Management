import React from 'react'
import { Center, Button, Flex, Container } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs"
import axios from 'axios';
import NavBar from '../components/Navbar';
const RequestForEmployee = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();

        let key = localStorage.getItem('key');
        const res = await axios.get(`http://localhost:4000/getuser?email=${key}`);
        const userid = res.data.customer_id
        console.log(userid)
        try {
            let inputs = {
                userid: userid
            }
            const res = await axios.post("http://localhost:4000/request-for-employee", inputs);
            if (res.data === "Already raised a request") {
                toast({
                    title: "Already raised a request",
                    status: "warning",
                    duration: 4000,
                    isClosable: true,
                    position: "bottom",
                })
                setTimeout(() => navigate("/customer"), 1000);
                return;
            };
            toast({
                title: "Successfully raised a request",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "top",
            })
            setTimeout(() => navigate("/customer"), 1000);
        } catch (err) {
            console.log(err)
        }
    };
    return (
        <Container maxW={"100%"} display={"flex"} flexDir="column" padding='0px'>
            <NavBar navItems={NAV_ITEMS} />
            <Button my={"45vh"} mx={"42vw"} onClick={handleSubmit} width='fit-content'>
                Click here to Raise Request
            </Button>
        </Container>
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


export default RequestForEmployee