import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    IconButton,
    Text,
    Tooltip,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    OrderedList,
    Center,
    Container,
    Heading,
    Button
} from "@chakra-ui/react";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon
} from "@chakra-ui/icons";
import { Link } from "react-router-dom"
import axios from "axios";
import { useLocation } from 'react-router-dom'
import NavBar from "../components/Navbar";
function CustomTable({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 8 }
        },
        usePagination
    );

    // Render the UI for your table
    return (
        <>
            {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage
            },
            null,
            2
          )}
        </code>
      </pre> */}
            <Container maxW={"100%"} display={"flex"} flexDir="column" padding='0px'>
                <NavBar navItems={NAV_ITEMS} />
            </Container>
            <Container display={"flex"} justifyContent={"center"} alignItems={"center"} mt={"1%"}>
                <Heading fontSize={'4xl'} fontFamily={'body'} fontWeight={500}>
                    Panels
                </Heading>
            </Container>
            <Center>

                <Table {...getTableProps()} variant='striped' width={'50%'} border='3px solid gray' borderRadius={4} marginTop={'5vh'}>
                    <Thead>
                        {headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <Tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Center>
            <Center>
                <Flex justifyContent="space-between" m={4} alignItems="center" width={'50%'} >
                    <Flex>
                        <Tooltip label="First Page">
                            <IconButton
                                onClick={() => gotoPage(0)}
                                isDisabled={!canPreviousPage}
                                icon={<ArrowLeftIcon h={3} w={3} />}
                                mr={4}
                                backgroundColor='gray.400'
                            />
                        </Tooltip>
                        <Tooltip label="Previous Page">
                            <IconButton
                                onClick={previousPage}
                                isDisabled={!canPreviousPage}
                                icon={<ChevronLeftIcon h={6} w={6} />}
                                backgroundColor='gray.300'
                            />
                        </Tooltip>
                    </Flex>

                    <Flex alignItems="center">
                        <Text flexShrink="0" mr={8}>
                            Page{" "}
                            <Text fontWeight="bold" as="span">
                                {pageIndex + 1}
                            </Text>{" "}
                            of{" "}
                            <Text fontWeight="bold" as="span">
                                {pageOptions.length}
                            </Text>
                        </Text>
                        <Text flexShrink="0">Go to page:</Text>{" "}
                        <NumberInput
                            ml={2}
                            mr={8}
                            w={28}
                            min={1}
                            max={pageOptions.length}
                            onChange={(value) => {
                                const page = value ? value - 1 : 0;
                                gotoPage(page);
                            }}
                            defaultValue={pageIndex + 1}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Select
                            w={32}
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[6, 8, 10, 12, 20].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </Select>
                    </Flex>

                    <Flex>
                        <Tooltip label="Next Page">
                            <IconButton
                                onClick={nextPage}
                                isDisabled={!canNextPage}
                                icon={<ChevronRightIcon h={6} w={6} />}
                                backgroundColor='gray.300'
                            />
                        </Tooltip>
                        <Tooltip label="Last Page">
                            <IconButton
                                onClick={() => gotoPage(pageCount - 1)}
                                isDisabled={!canNextPage}
                                icon={<ArrowRightIcon h={3} w={3} />}
                                ml={4}
                                backgroundColor='gray.400'
                            />
                        </Tooltip>
                    </Flex>
                </Flex>
            </Center>
        </>
    );
}

function PanelsInOrder() {
    const [history, setHistory] = useState([]);
    const location = useLocation()
    const { orderID } = location.state
    useEffect(() => {
        axios.get(`http://localhost:4000/panels-in-order?orderID=${orderID}`)
            .then((res) => {
                let x = res.data;
                x.map((item) => {
                    for (let key in item) {
                        if (key === 'panel_id') {
                            item[key] = <Link to='/modules-in-panel' state={{ panelID: item[key] }}><Button colorScheme={'whatsapp'}>{item[key]}</Button></Link>
                        }
                    }
                });
                setHistory(res.data);
            });
    }, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "PANEL ID",
                accessor: "panel_id"
            },
            {
                Header: "PANEL TYPE",
                accessor: "panel_type"
            },
            {
                Header: "DATE",
                accessor: "date"
            }
        ],
        []
    );

    return <CustomTable columns={columns} data={history} />;
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



export default PanelsInOrder;
