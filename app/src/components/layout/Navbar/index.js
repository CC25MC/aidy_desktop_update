import { Box, Avatar, NotificationIcon } from "components";
import { Text } from "bumbag";
import Logo from "assets/Logo.png";
import { useConnected } from 'hooks';

// import {
//     //  useAuth, 
//     useSidebar
// } from "hooks";
import { useAuth } from "hooks/useClient";

const navbarConfig = {
    height: "80px"
};

export const Navbar = ({
    rightContent: rightContentProp
}) => {
    const { user } = useAuth();
    const { listCheckoutOffline } = useConnected();

    let rightContent = rightContentProp || (<UserAvatar />);

    return (
        <Box
            css={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                zIndex: "navbar"
            }}
        >
            <Box as="nav" css={{
                display: "flex",
                alignItems: "center",
            }}>
                <Box css={{
                    mx: "24px",
                    display: "flex",
                    alignItems: "center",
                    height: navbarConfig.height,
                }}>
                    <Text fontSize="300" fontWeight={"bold"} color={"primary"} >
                        AIDY LITE
                    </Text>
                </Box>

                <Box
                    css={{
                        marginLeft: "auto",
                        marginRight: "50px"
                    }}
                >
                    {listCheckoutOffline && (
                        <Box
                            css={{
                                position:
                                    "absolute",
                                marginTop: "-10px",
                                marginLeft: "-6px",
                                fontSize: "12px",
                                textAlign: "center",
                                fontWeight: "bold",
                                width: "18px",
                                lineHeight: "18px",
                                height: "18px",
                                background: "#FFB800",
                                color: "white",
                                borderRadius:
                                    "18px",
                            }}
                        >
                            {listCheckoutOffline.length}
                        </Box>)}
                        <NotificationIcon size={"standard"} color={"#011A41"} />
                </Box>

                <Box
                    css={{
                        marginTop: "-10px",
                        marginRight: "24px"
                    }}
                >
                    <Text fontSize="100" color={"primary"} >
                        { user?.name || user?.lastname 
                            ?  user?.name + " " + user?.lastname || "Admin" 
                            : "Invitado"
                        }
                    </Text>
                </Box>
                <Box
                    css={{
                        marginRight: "24px"
                    }}
                >
                    {rightContent}
                </Box>
            </Box>
        </Box>
    );
};

const UserAvatar = () => {
    // const {user} = useAuth();
    // let props = {
    //     ...(user?.username && typeof user?.username === "string"
    //         ? { children: user.username.slice(0,2).toUpperCase() } 
    //         : { src: "" }
    //     )
    // };
    return (
        <Avatar src={Logo} alt="img" />
    );
};