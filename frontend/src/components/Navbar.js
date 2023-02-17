import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Image,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorMode,
    Center,
    propNames,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
export default function NavBar(props) {
    const navigate = useNavigate();
    const { isOpen, onToggle } = useDisclosure();
    const logout=()=>{
        localStorage.clear();
        navigate('/')
    }
    return (
        <Box>
            <Flex
                bg={useColorModeValue('teal.200', 'teal')}
                color={useColorModeValue('black', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={3}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Image height="60px" src='/logo.svg' />
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav navItems={props.navItems} />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar
                                border={'1px solid black'}
                                height={'60px'}
                                backgroundColor={'blue'}
                                width={'60px'}
                                size={'sm'}
                                src={'https://avatars.dicebear.com/api/male/username.svg'}
                            />
                        </MenuButton>
                        <MenuList alignItems={'center'}>
                            <br />
                            <Center>
                                <Avatar
                                    size={'2xl'}
                                    backgroundColor={'blue'}
                                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                                />
                            </Center>
                            <br />
                            <Center>
                                <p>{localStorage.getItem('key')}</p>
                            </Center>
                            <br />
                            <MenuDivider />
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Stack>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav navItems={props.navItems} />
            </Collapse>
        </Box>
    );
}

const DesktopNav = (props) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Center>
            <Stack direction={'row'} spacing={4}>
                {props.navItems.map((navItem) => (
                    <Box key={navItem.label} >
                        <Popover trigger={'hover'} placement={'bottom-start'}>
                            <PopoverTrigger>
                                <Link
                                    p={2}
                                    href={navItem.href ?? '#'}
                                    fontSize={'sm'}
                                    fontWeight={800}
                                    color={linkColor}
                                    _hover={{
                                        textDecoration: 'none',
                                        color: linkHoverColor,
                                    }}>
                                    {navItem.label}
                                </Link>
                            </PopoverTrigger>

                            {navItem.children && (
                                <PopoverContent
                                    border={0}
                                    boxShadow={'xl'}
                                    bg={popoverContentBgColor}
                                    p={4}
                                    rounded={'xl'}
                                    minW={'sm'}>
                                    <Stack>
                                        {navItem.children.map((child) => (
                                            <DesktopSubNav key={child.label} {...child} />
                                        ))}
                                    </Stack>
                                </PopoverContent>
                            )}
                        </Popover>
                    </Box>
                ))}
            </Stack>
        </Center>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = (props) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {props.navItems.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};