import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import {
    Box,
    CssBaseline,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Drawer as MuiDrawer,
    Toolbar
} from '@mui/material';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import type { Theme } from '@mui/material/styles';
import { styled, useTheme } from '@mui/material/styles';
import type { CSSObject } from '@mui/system';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../utils/path';
import Navbar from './Navbar';

const _drawerWidth = 240;

const StyledIcon = styled(FontAwesomeIcon)<{ active: boolean }>(({ theme, active }) => ({
    color: active ? theme.palette.primary.dark : "inherit",
    "&:hover": {
        color: theme.palette.primary.dark,
    },
}));
const openedMixin = (theme: Theme): CSSObject => ({
    width: _drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: _drawerWidth,
                // width: `calc(100% - ${_drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: _drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function MainLayout({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const handleToggleDrawer: () => void = () => setOpen((prevOpen) => !prevOpen);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    // const activePath = PATH.find(({ path }) => pathname.startsWith(path));
    console.log(pathname);
    const handleDrawerClose: () => void = () => setOpen(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleToggleDrawer}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            // open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Navbar />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
                    {PATH?.map(({ name, path, icon }, index) => (
                        <><ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate(path)}
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    open
                                        ? {
                                            justifyContent: 'initial',
                                        }
                                        : {
                                            justifyContent: 'center',
                                        },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: 'center',
                                        },
                                        open
                                            ? {
                                                mr: 3,
                                            }
                                            : {
                                                mr: 'auto',
                                            },
                                    ]}
                                >
                                    <StyledIcon
                                        active={pathname === path}
                                        icon={[icon?.prefix ?? "fas", icon?.name ?? "question"]} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={t(name)}
                                    sx={[
                                        open
                                            ? {
                                                opacity: 1,
                                            }
                                            : {
                                                opacity: 0,
                                            },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                            {index === 0 && <Divider />}
                        </>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
                {/* <Breadcrumbs />
                <MainTable /> */}
            </Box>
        </Box>
    );
}
