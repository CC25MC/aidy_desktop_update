import { useSidebar } from "hooks";
import { useLocation } from "react-router";
import {
    MenuIcon,
    Box,
    SettingsIcon,
    BoxIcon,
    BoxactiveIcon,
    ClientsIcon,
    ClientsactiveIcon,
    PosIcon,
    PosactiveIcon,
    ListIcon,
} from "components";
import { motion } from "framer-motion";
import {
    SidebarContainer,
    SidebarIcon,
    SidebarItem,
    SidebarLink,
    sidebarConfig,
    sidebarVariants
} from "./Sidebar.styles";

const menu = [
    {
        icon: <ClientsIcon {...sidebarConfig.itemProps} />,
        iconActive: <ClientsactiveIcon {...sidebarConfig.itemProps} />,
        title: 'Clientes',
        to: '/client'
    },
    {
        icon: <BoxIcon {...sidebarConfig.itemProps} />,
        iconActive: <BoxactiveIcon {...sidebarConfig.itemProps} />,
        title: 'Productos',
        to: '/productos'
    },
    {
        icon: <PosIcon {...sidebarConfig.itemProps} />,
        iconActive: <PosactiveIcon {...sidebarConfig.itemProps} />,
        title: 'POS',
        to: '/POS'
    },
    {
        icon: <ListIcon {...sidebarConfig.itemProps} />,
        iconActive: <ListIcon {...sidebarConfig.itemProps} />,
        title: 'Historial',
        to: '/history'
    },
];

export const Sidebar = () => {

    const { variant, toggle } = useSidebar();
    // const { logOut } = useAuth();
    const url = useLocation();
    return (
        <Box
            css={{
                position: 'fixed',
                left: 24,
                top: 80,
                height: '100%',
                zIndex: "sidebar"
            }}
        >
            <SidebarContainer
                as={motion.nav}
                variants={sidebarVariants}
                animate={variant}
                mode={variant}
                initial="initial"
            >
                <Box as="ul" css={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}>
                    <SidebarItem as="li" className="item">
                        <SidebarLink className="no-highlight" onClick={toggle} to="#">
                            <SidebarIcon className="no-highlight" >
                                <MenuIcon  {...sidebarConfig.itemProps} />
                            </SidebarIcon>
                        </SidebarLink>
                    </SidebarItem>
                    {menu.map(menuItem => (
                        <SidebarItem as="li" className={`item${url.pathname === menuItem.to ? "-active" : ""}`} key={menuItem.to}>
                            <SidebarLink className="no-highlight" to={menuItem.to}>
                                <Box className={`select${url.pathname === menuItem.to ? "-active" : ""}`} />
                                <SidebarIcon className={`icon${url.pathname === menuItem.to ? "-active" : ""}`} >
                                    {url.pathname === menuItem.to ? menuItem.iconActive : menuItem.icon}
                                </SidebarIcon>
                                <Box as="span" className={`link-text${url.pathname === menuItem.to ? "-active" : ""}`}>
                                    {menuItem.title}
                                </Box>
                            </SidebarLink>
                        </SidebarItem>
                    ))}
                    <SidebarItem as="li" className="settings" >
                        <SidebarLink to="/settings" >
                            <SidebarIcon>
                                <SettingsIcon {...sidebarConfig.itemProps} />
                            </SidebarIcon>
                            <Box as="span" className="link-text">
                                Ajustes
                            </Box>
                        </SidebarLink>
                    </SidebarItem>
                </Box>
            </SidebarContainer>
        </Box>
    );
};

