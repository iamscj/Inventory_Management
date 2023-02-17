import React, { useState } from 'react'
import {
    Input,
    Container,
    InputGroup,
    InputRightAddon,
    Button,
    filter,
    Tab,
    Center,
} from '@chakra-ui/react'
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
    Text,
    Heading,
    ButtonGroup,
    IconButton,
    useToast
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons';
import NavBar from './Navbar.js';
const SearchBar = ({ placeholder, data }) => {

    const [filteredData, setFilteredData] = useState([]);
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        const newFilter = data.filter((value) => {
            return value.customer_id.includes(searchWord) ||
                value.customer_email.includes(searchWord) ||
                value.customer_fname.includes(searchWord) ||
                value.customer_lname.includes(searchWord) ||
                value.customer_contact.includes(searchWord) ||
                value.customer_address.includes(searchWord);
        });
        if (searchWord === "") {
            setFilteredData([]);
        }
        else
            setFilteredData(newFilter);
    }
    console.log(data)
    return (
        <Container maxW={"100%"} display={"flex"} flexDir="column" padding='0px'>
            <NavBar navItems={NAV_ITEMS} />
            <Container display={"flex"} flexDir="row" mt={"5vh"} height={"8vh"}>
                <InputGroup size='sm'>
                    <Input placeholder={placeholder} h={"8vh"} onChange={handleFilter} />
                    <InputRightAddon children={<Button><Search2Icon width={"-moz-max-content"} /></Button>} h={"8vh"} />
                </InputGroup>
            </Container>
            {filteredData.length != 0 && (
                <TableContainer width={"90%"} margin={"auto"} mt={"5vh"} height="80vh" overflowY={"scroll"}>
                    <Table variant={"striped"}>
                        <Thead>
                            <Tr>
                                <Th>UserId</Th>
                                <Th>First Name</Th>
                                <Th>Lname</Th>
                                <Th>Contact</Th>
                                <Th>Email</Th>
                                <Th>Address</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredData.map((item) => (
                                <Tr>
                                    <Td>{item.customer_id}</Td>
                                    <Td>{item.customer_fname}</Td>
                                    <Td>{item.customer_lname}</Td>
                                    <Td>{item.customer_contact}</Td>
                                    <Td>{item.customer_email}</Td>
                                    <Td>{item.customer_address}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    )
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

export default SearchBar