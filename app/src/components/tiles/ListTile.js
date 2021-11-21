import { Flex, Icon, Box, Text, Button } from "bumbag";
import { useState } from "react";

const ListTile = ({ title, subTitle, actions, leading, content }) => {
    const [ show , setShow ] = useState(false);
    return (
        <Flex borderRadius = "8px" width = "100%" overflow = "hidden">
            <Box display = "flex" alignItems = "center">
                {leading && (leading)}
                <Box>
                    <Text display = "block">
                        {title}
                    </Text>
                    <Text display = "block" fontSize = "12px" >
                        {subTitle}
                    </Text>
                </Box>
            </Box>
            <Box flex = "1" display = "flex" alignItems = "center" padding = "major-2" justifyContent = "flex-end" >
                <Box>
                    {content}
                </Box>
            </Box>
            {actions && (
                <Box flex = "1" display = "flex" alignItems = "center" padding = "major-2" justifyContent = "flex-end" >
                    <Box>
                        <Button variant = "ghost" onClick = {() => { setShow(!show) }}>
                            <Icon icon = "add" />
                        </Button>
                    </Box>
                </Box>
            )}
            {show && (
                <Box display = "flex" color = "#fff" padding = "major-2" backgroundColor = {product.color}>
                    <Box display = "flex" alignItems = "center" marginRight = "major-2">
                        Modificar
                    </Box>
                    <Box display = "flex" alignItems = "center">
                        Eliminar
                    </Box>
                </Box>
            )}
        </Flex>
    );
}

export { ListTile };