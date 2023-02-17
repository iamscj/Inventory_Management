import React from 'react';
import NavBar from '../components/Navbar.js';
import Card from '../components/Card.js';
import { useEffect } from 'react';
import {
  ChakraProvider,
  theme,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { Link } from "react-router-dom"
function User() {
  return (
    <>
      <NavBar navItems={NAV_ITEMS} />
      <Grid templateColumns='repeat(4, 1fr)' marginTop={'10vh'} display={'flex'} flexWrap={'wrap'} justifyContent={'space-around'}>
        <GridItem>
          <Link to={'/placeorder'}>
            <Card domain={'Orders'} title={'New Order'} body={'Place a new order.'} />
          </Link>
        </GridItem>
        <GridItem>
          <Link to={'/order-history'}>
            <Card domain={'Orders'} title={'Order History'} body={'Check order history.'} />
          </Link>
        </GridItem>
        <GridItem>
          <Link to={'/request-history'}>
            <Card domain={'Warranty'} title={'Request History'} body={'Check request status.'} />
          </Link>
        </GridItem>
        <GridItem>
          <Link to={'/updateprofile'}>
            <Card domain={'Information'} title={'Update Details'} body={'Change your account details.'} />
          </Link>
        </GridItem>
        <GridItem>
          <Link to={'/raise-request'}>
            <Card domain={'Access'} title={'Request For Employee'} body={'Request For Employee'} />
          </Link>
        </GridItem>
      </Grid>
    </>
  );
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

export default User;
