/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react'
import { render } from 'react-dom'
import {
    Box,
    Button,
    ButtonGroup,
    CSSReset,
    Heading,
    Icon,
    ThemeProvider,
    theme,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Checkbox,
    Progress,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
    Badge,
    Center,
    Text,
    useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Container
} from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Field, useField, useForm } from 'react-final-form'
import { useFileUpload } from "use-file-upload";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios'
import NavBar from '../components/Navbar'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const AddPanels = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [stock, setStock] = useState([0, 0, 0, 0, 0]);
    const [predicted, setPredicted] = useState([0, 0, 0, 0, 0]);
    const [add, setAdd] = useState([0, 0, 0, 0, 0]);

    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Container maxW={"100%"} display={"flex"} flexDir="column" padding='0px'>
                <NavBar navItems={NAV_ITEMS} />
            </Container>
            <Box w={'fit-content'} p={4} m="20px auto">
                <Heading as="h1" size="xl" textAlign="center">
                    Add Panels To Inventory
                </Heading>
                <Form

                    onSubmit={async () => {
                    }}
                    render={({
                        handleSubmit,
                        form,
                        errors,
                        submitting,
                        pristine,
                        values
                    }) => (
                        <Box
                            as="form"
                            p={4}
                            marginTop={'10vh'}
                            borderWidth="2px"
                            borderColor={'gray.400'}
                            rounded="lg"
                            shadow="5px 5px 8px rgba(0,0,0,0.3)"
                            onSubmit={handleSubmit}
                        >
                            <Text marginTop='8px' marginBottom='8px'><b>Current Stock</b><Button ml='10px' size='xsm' padding='2px' colorScheme={'linkedin'} float='right' width='150px' border='3px solid blue' onClick={async () => {
                                let response = await axios.get('http://localhost:4000/panel-stock');
                                setStock(response.data);
                            }}>Get Stock</Button></Text>
                            <TableContainer border='2px solid black' borderRadius={'10px'}>
                                <Table variant='striped' colorScheme={'teal'}>
                                    <Thead bg='limegreen'>
                                        <Tr>
                                            <Th>Panel 1</Th>
                                            <Th>Panel 2</Th>
                                            <Th>Panel 3</Th>
                                            <Th>Panel 4</Th>
                                            <Th>Panel 5</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody >
                                        <Tr>
                                            <Td>{stock[0]}</Td>
                                            <Td>{stock[1]}</Td>
                                            <Td>{stock[2]}</Td>
                                            <Td>{stock[3]}</Td>
                                            <Td>{stock[4]}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Text marginTop='20px' marginBottom='8px'><b>Stock Requirement Predictions</b><Button ml='10px' size='xsm' padding='2px' colorScheme={'linkedin'} float='right' width='150px' border='3px solid blue' onClick={async () => {
                                try {
                                    let response = await axios.get('http://localhost:5000/get-prediction');
                                    // console.log(response.data);
                                    setPredicted(response.data);
                                } catch (err) {
                                    console.log(err.response.data);
                                }
                            }}>Get Prediction</Button></Text>
                            <TableContainer border='2px solid black' borderRadius={'10px'}>
                                <Table variant='striped' colorScheme={'yellow'}>
                                    <Thead bg='orange' >
                                        <Tr>
                                            <Th>Panel 1</Th>
                                            <Th>Panel 2</Th>
                                            <Th>Panel 3</Th>
                                            <Th>Panel 4</Th>
                                            <Th>Panel 5</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody >
                                        <Tr>
                                            <Td>{predicted[0]}</Td>
                                            <Td>{predicted[1]}</Td>
                                            <Td>{predicted[2]}</Td>
                                            <Td>{predicted[3]}</Td>
                                            <Td>{predicted[4]}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Text marginTop='20px' marginBottom='8px'><b>Add Panels</b><Button ml='10px' size='xsm' padding='2px' colorScheme={'linkedin'} float='right' width='150px' border='3px solid blue' onClick={async () => {
                                try {
                                    for (let panelType = 1; panelType < 6; panelType++) {
                                        for (let i = 0; i < add[panelType - 1]; i++) {
                                            await axios.post('http://localhost:4000/add-panel', { panelType: panelType });
                                        }
                                    }
                                    toast({
                                        id: 'Success',
                                        title: `Panels Added Successfully, reload stock!`,
                                        status: "success",
                                        duration: 2000,
                                        isClosable: true,
                                        position: "top",
                                    });
                                    setTimeout(() => { window.location.reload(); }, 2000);
                                    setAdd([0, 0, 0, 0, 0]);
                                } catch (err) {
                                    toast({
                                        id: 'Error',
                                        title: err.response.data,
                                        status: "error",
                                        duration: 2000,
                                        isClosable: true,
                                        position: "top",
                                    });
                                }
                            }}>Update Stock</Button></Text>
                            <TableContainer border='2px solid black' borderRadius={'10px'}>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Panel 1</Th>
                                            <Th>Panel 2</Th>
                                            <Th>Panel 3</Th>
                                            <Th>Panel 4</Th>
                                            <Th>Panel 5</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody >
                                        <Tr>
                                            <Td>
                                                <NumberInput size='sm' defaultValue={0} min={0} width='80px'>
                                                    <NumberInputField focusBorderColor='red.200' border='1px solid gray' readOnly />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper
                                                            onClick={() => {
                                                                let currentValues = add;
                                                                currentValues[0] += 1;
                                                                setAdd(currentValues);
                                                                console.log(add);
                                                            }}
                                                            bg='green.300'
                                                            _active={{ bg: 'green.500' }}
                                                        />
                                                        <NumberDecrementStepper
                                                            onClick={() => {
                                                                let currentValues = add;
                                                                if (currentValues[0] > 0) currentValues[0] -= 1;
                                                                setAdd(currentValues);
                                                                console.log(add);
                                                            }}
                                                            bg='red.300'
                                                            _active={{ bg: 'red.500' }}
                                                        />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Td>
                                            <Td>
                                                <NumberInput size='sm' defaultValue={0} min={0} width='80px'>
                                                    <NumberInputField focusBorderColor='red.200' border='1px solid gray' readOnly />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper
                                                            onClick={() => {
                                                                let currentValues = add;
                                                                currentValues[1] += 1;
                                                                setAdd(currentValues);
                                                                console.log(add);
                                                            }}
                                                            bg='green.300'
                                                            _active={{ bg: 'green.500' }}
                                                        />
                                                        <NumberDecrementStepper
                                                            onClick={() => {
                                                                let currentValues = add;
                                                                if (currentValues[1] > 0) currentValues[1] -= 1;
                                                                setAdd(currentValues);
                                                                console.log(add);
                                                            }}
                                                            bg='red.300'
                                                            _active={{ bg: 'red.500' }}
                                                        />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Td>
                                            <Td>
                                                <NumberInput size='sm' defaultValue={0} min={0} width='80px'>
                                                    <NumberInputField focusBorderColor='red.200' border='1px solid gray' readOnly />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper
                                                            onClick={() => {
                                                                let currentValues = add;
                                                                currentValues[2] += 1;
                                                                setAdd(currentValues);
                                                                console.log(add);
                                                            }}
                                                            bg='green.300'
                                                            _active={{ bg: 'green.500' }}
                                                        />
                                                        <NumberDecrementStepper
                                                            onClick={() => {
                                                                let currentValues = add;
                                                                if (currentValues[2] > 0) currentValues[2] -= 1;
                                                                setAdd(currentValues);
                                                                console.log(add);
                                                            }}
                                                            bg='red.300'
                                                            _active={{ bg: 'red.500' }}
                                                        />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Td>
                                            <Td>
                                                <NumberInput size='sm' defaultValue={0} min={0} width='80px'>
                                                    <NumberInputField focusBorderColor='red.200' border='1px solid gray' readOnly />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper
                                                            onClick={() => {
                                                                let currentValues = add;
                                                                currentValues[3] += 1;
                                                                setAdd(currentValues);
                                                                console.log(add);
                                                            }}
                                                            bg='green.300'
                                                            _active={{ bg: 'green.500' }}
                                                        />
                                                        <NumberDecrementStepper
                                                            onClick={() => {
                                                                let currentValues = add;
                                                                if (currentValues[3] > 0) currentValues[3] -= 1;
                                                                setAdd(currentValues);
                                                                console.log(add);
                                                            }}
                                                            bg='red.300'
                                                            _active={{ bg: 'red.500' }}
                                                        />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Td>
                                            <Td>
                                                <NumberInput size='sm' defaultValue={0} min={0} width='80px'>
                                                    <NumberInputField focusBorderColor='red.200' border='1px solid gray' readOnly />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper
                                                            onClick={() => {
                                                                let currentValues = add;
                                                                currentValues[4] += 1;
                                                                setAdd(currentValues);
                                                                console.log(add);
                                                            }}
                                                            bg='green.300'
                                                            _active={{ bg: 'green.500' }}
                                                        />
                                                        <NumberDecrementStepper
                                                            onClick={() => {
                                                                let currentValues = add;
                                                                if (currentValues[4] > 0) currentValues[4] -= 1;
                                                                setAdd(currentValues);
                                                                console.log(add);
                                                            }}
                                                            bg='red.300'
                                                            _active={{ bg: 'red.500' }}
                                                        />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                />
            </Box>
        </ThemeProvider>
    );
}

const AdaptedTextarea = ({ input, meta, ...rest }) => (
    <Textarea {...input} {...rest} isInvalid={meta.error && meta.touched} />
)

const Control = ({ name, ...rest }) => {
    const {
        meta: { error, touched }
    } = useField(name, { subscription: { touched: true, error: true } })
    return <FormControl {...rest} isInvalid={error && touched} />
}

const Error = ({ name }) => {
    const {
        meta: { error }
    } = useField(name, { subscription: { error: true } })
    return <FormErrorMessage>{error}</FormErrorMessage>
}

const TextareaControl = ({ name, label }) => (
    <Control name={name} my={4}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Field
            borderColor='gray'
            name={name}
            component={AdaptedTextarea}
            placeholder={label}
            id={name}
        />
        <Error name={name} />
    </Control>
)

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

export default AddPanels;
