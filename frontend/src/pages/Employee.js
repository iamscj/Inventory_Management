import React from 'react';
import NavBar from '../components/Navbar.js';
import Card from '../components/Card.js';

import {
  ChakraProvider,
  theme,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { Link } from "react-router-dom"
function Employee() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar navItems={NAV_ITEMS} />
      <Grid templateColumns='repeat(3, 1fr)' marginTop={'10vh'} display={'flex'} flexWrap={'wrap'} justifyContent={'space-around'}>
        <GridItem>
          <Card domain={'Orders'} title={'Handle Orders'} body={'Accept or reject customer orders.'} />
        </GridItem>
        <GridItem>
          <Link to='/validate-requests'>
            <Card domain={'Replacements'} title={'Handle replacements'} body={'Validate warranty claims.'} />
          </Link>
        </GridItem>
        <GridItem>
          <Link to='/add-panels'>
            <Card domain={'Database'} title={'Update Component DB'} body={'Modify components and their stock.'} />
          </Link>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/employee',
  },
  {
    label: 'Orders',
    children: [
      {
        label: 'Handle Orders',
        subLabel: 'Accept or reject customer orders.',
        href: '#',
      },
    ],
  },
  {
    label: 'Handle Replacements',
    href: '/validate-requests',
  },
  {
    label: 'Update Database',
    href: '/add-panels',
  },
];

export default Employee;
