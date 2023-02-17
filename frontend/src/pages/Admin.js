import React from 'react';
import NavBar from '../components/Navbar.js';
import Card from '../components/Card.js';

import {
  ChakraProvider,
  theme,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <>
      <NavBar navItems={NAV_ITEMS} />
      <Grid templateColumns='repeat(3, 1fr)' marginTop={'10vh'} display={'flex'} flexWrap={'wrap'} justifyContent={'space-around'}>
        <Link to={'/addemployees'}>
          <GridItem>
            <Card domain={'Employees'} title={'Add Employees'} body={'Grant employee privilege to users.'} />
          </GridItem>
        </Link>
        <Link to={'/removeemployees'}>
          <GridItem>
            <Card domain={'Employees'} title={'Remove Employees'} body={'Remove employee privilege from users.'} />
          </GridItem>
        </Link>
        <Link to={'/getuserinfo'}>
          <GridItem>
            <Card domain={'Users'} title={'Check Details'} body={'Check User Details.'} />
          </GridItem>
        </Link>
      </Grid>
      </>
  );
}

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin',
  },
  {
    label: 'Modify Employees',
    children: [
      {
        label: 'Add New Employees',
        subLabel: 'Grant employee privilege to users.',
        href: '/addemployees',
      },
      {
        label: 'Remove Employees',
        subLabel: 'Remove employee privilege.',
        href: '/removeemployees',
      },
    ],
  },
  {
    label: 'User Details',
    href: '/getuserinfo',
  },
];


export default Admin;