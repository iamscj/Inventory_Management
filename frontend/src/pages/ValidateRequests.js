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
    Button,
    ButtonGroup,
    useToast
} from "@chakra-ui/react";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    ExternalLinkIcon
} from "@chakra-ui/icons";
import { Link } from "react-router-dom"
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
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
                    Request History
                </Heading>
            </Container>
            <Center>

                <Table {...getTableProps()} variant='striped' width={'70%'} border='3px solid gray' marginTop={'5vh'}>
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

function ValidateRequests() {
    const [history, setHistory] = useState([]);
    const toast = useToast();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:4000/validate-requests`)
            .then((res) => {
                let x = res.data;
                x.map((item) => {
                    for (let key in item) {
                        item['action'] =
                            <ButtonGroup spacing='2'>
                                <Button size='xsm' padding='3px' border='2px solid green' colorScheme='green' requestid={item['request_id']} onClick={async (e) => {
                                    try {
                                        let requestID = e.target.getAttribute("requestid");
                                        let status = "Granted";
                                        let response = await axios.post('http://localhost:4000/validate-requests', {
                                            requestID: requestID,
                                            status: status
                                        });
                                        toast({
                                            id: 'Success',
                                            title: response.data,
                                            status: "success",
                                            duration: 1500,
                                            isClosable: true,
                                            position: "top",
                                        });
                                        setTimeout(() => { window.location.reload(); }, 1500);
                                    } catch (err) {
                                        toast({
                                            id: 'Error',
                                            title: err.response.data,
                                            status: "error",
                                            duration: 2000,
                                            isClosable: true,
                                            position: "top",
                                        })
                                    }
                                }}>Grant</Button>
                                <Button padding='3px' border='2px solid red' colorScheme='red' size='xsm' requestid={item['request_id']} onClick={async (e) => {
                                    try {
                                        let requestID = e.target.getAttribute("requestid");
                                        let status = "Denied";
                                        let response = await axios.post('http://localhost:4000/validate-requests', {
                                            requestID: requestID,
                                            status: status
                                        })
                                        toast({
                                            id: 'Success',
                                            title: response.data,
                                            status: "success",
                                            duration: 1500,
                                            isClosable: true,
                                            position: "top",
                                        });
                                        setTimeout(() => { window.location.reload(); }, 1500);
                                    } catch (err) {
                                        toast({
                                            id: 'Error',
                                            title: err.response.data,
                                            status: "error",
                                            duration: 2000,
                                            isClosable: true,
                                            position: "top",
                                        })
                                    }
                                }}>Deny</Button>
                            </ButtonGroup>
                        if (key === 'report_file') {
                            item[key] = <b>Open <IconButton colorScheme={'white'} color='black' icon={<ExternalLinkIcon boxSize={5} filename={item[key]} onClick={async (e) => {
                                const downloadedFileResponse = await axios({
                                    url: `http://localhost:4000/warranty-report?fileName=${e.target.getAttribute("filename")}`,
                                    method: 'get',
                                    responseType: 'arraybuffer',
                                    headers: {},
                                })
                                const fileBlob = new Blob([downloadedFileResponse.data], {
                                    type: "application/pdf"
                                });
                                const fileURL = URL.createObjectURL(fileBlob);
                                window.open(fileURL, '_blank');
                            }} />}></IconButton></b>
                        }
                    }
                });
                setHistory(res.data);
            });
    }, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "REQUEST ID",
                accessor: "request_id"
            },
            {
                Header: "MODULE ID",
                accessor: "module_id"
            },
            {
                Header: "CUSTOMER ID",
                accessor: "customer_id"
            },
            {
                Header: "REQUEST DATE",
                accessor: "request_date"
            },
            {
                Header: "REPORT",
                accessor: "report_file"
            },
            {
                Header: "ACTION",
                accessor: "action"
            }
        ],
        []
    );

    return <CustomTable columns={columns} data={history} />;
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

export default ValidateRequests;
