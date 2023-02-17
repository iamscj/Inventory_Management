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

const RequestWarranty = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [filename, setFileName] = useState('Choose a file');
    const [fileSource, setFileSource] = useState('');
    const [file, setFile] = useState();
    const [files, selectFiles] = useFileUpload();
    const location = useLocation()
    const { moduleID, panelID } = location.state;
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Container maxW={"100%"} display={"flex"} flexDir="column" padding='0px'>
                <NavBar navItems={NAV_ITEMS} />
            </Container>
            <Box w={'fit-content'} p={4} m="20px auto">
                <Heading as="h1" size="xl" textAlign="center">
                    Request for Replacement
                </Heading>
                <Form

                    onSubmit={async () => {
                        await sleep(300)
                        try {
                            var re = /(\.pdf)$/i;
                            if (!re.exec(filename)) {
                                throw { response: { data: 'Please upload a pdf file!' } };
                            }
                            var formData = new FormData();
                            formData.append('file', file);
                            for (var key of formData.entries()) {
                                console.log(key);
                            }
                            await axios.post('http://localhost:4000/upload-report', formData);
                            toast({
                                id: 'Success',
                                title: `Request Sent Successfully`,
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                                position: "top",
                            });
                            toast({
                                id: 'Redirecting',
                                title: `Redirecting to dashboard`,
                                status: "info",
                                duration: 2000,
                                isClosable: true,
                                position: "bottom",
                            });
                            setTimeout(() => { navigate('/customer') }, 2000);
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
                            <Heading as="h2" size="l" textAlign="center">
                                <Badge variant='subtle' colorScheme='green' border='3px solid #38a169' borderLeftRadius={'10px'}>Requesting replacement for module </Badge>
                                <Badge variant='solid' colorScheme='green' border='3px solid #38a169'>{moduleID}</Badge>
                                <Badge variant='subtle' colorScheme='green' border='3px solid #38a169'> in panel </Badge>
                                <Badge variant='solid' colorScheme='green' border='3px solid #38a169' borderRightRadius={'10px'}>{panelID}</Badge>
                            </Heading>

                            <Text marginTop='20px' marginBottom='8px'>Upload Report <i>( File Type : <b>.pdf</b> )</i></Text>
                            <Button
                                colorScheme='linkedin'
                                onClick={() =>
                                    selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
                                        setFileName(name);
                                        setFileSource(source);
                                        const renamedFile = new File([file], `${moduleID}|${localStorage.getItem('user-id')}|${name}`, { type: file.type });
                                        setFile(renamedFile);
                                        console.log(renamedFile);
                                    })
                                }>Select File
                            </Button>
                            <Text ml='20px' display={'inline'}> <b>File Uploaded : </b><i>{filename}</i></Text>
                            <a href={fileSource} target='_blank'><ExternalLinkIcon ml='15px' boxSize={5} /></a>
                            <TextareaControl name="comments" label="Comments" />
                            <ButtonGroup spacing={4}>
                                <Button
                                    loadingText="Submitting"
                                    colorScheme="green"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                                <Button
                                    colorScheme="pink"
                                    variant="outline"
                                    onClick={form.reset}
                                    isDisabled={submitting || pristine}
                                >
                                    Reset
                                </Button>
                            </ButtonGroup>
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


export default RequestWarranty;
