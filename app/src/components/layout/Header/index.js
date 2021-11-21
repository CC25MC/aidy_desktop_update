import { Box, Stack, Heading, Button, Icon, Flex, Set, Input } from 'bumbag';
import { useHistory,  useRouteMatch } from 'react-router';
import { Link } from "react-router-dom";
import { Fragment } from "react";

export const Header = ({
    title, 
    action, 
    actions,
    search
}) => {
    const history = useHistory();
    const match = useRouteMatch();
    return (
        <Box padding="major-2">
            <Flex justifyContent="space-between">
                <Stack spacing="major-3" orientation="horizontal" alignY="center">
                    {title === "Punto de Venta" ?
                        <Heading use="h4" >
                            {title}
                        </Heading> : <>
                            <Button onClick={() => {
                                history.push("/pos");
                            }}>
                                <Icon icon="chevron-left" color="#fff" />
                            </Button>
                            <Heading use="h4" >
                                {title}
                            </Heading>
                        </>}
                </Stack>
                <Set spacing = "major-2">
                    {search !== undefined && (
                        <Fragment>
                            <Input 
                                placeholder = "buscar" 
                                before={<Input.Icon icon="search" />}
                                size = "small"
                                width = "130px"
                                display = {{
                                    "mobile": "none",
                                    "tablet": "none",
                                    "desktop": "none",
                                    "widescreen": "block",
                                    "fullHD": "block"
                                }}
                                {...search}
                            />
                            <Box
                                display = {{
                                    "mobile": "block",
                                    "tablet": "block",
                                    "desktop": "block",
                                    "widescreen": "none",
                                    "fullHD": "none"
                                }}
                            >
                                <Input 
                                    placeholder = "buscar" 
                                    before={<Input.Icon icon="search" />}
                                    size = "small"
                                    width = "130px"
                                    {...search}
                                />
                            </Box>
                        </Fragment>
                    )}
                    {actions !== undefined
                        ? (actions) 
                        : (
                            <Button iconAfter="chevron-right" use={Link} to={`${match.url}/agregar`}>
                                {action ? action : "Agregar"} 
                            </Button>
                        )
                    }
                </Set>
            </Flex>
        </Box>
    );
};