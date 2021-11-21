import { Box, Text } from "bumbag";

const ClientTile = ({ item : client, ...rest }) => {
    return (
        <Box 
            paddingX = "major-3" 
            paddingY = "major-2"
            cursor = "pointer"
            _hover = {{
                backgroundColor: '#ededed'
            }}
            {...rest}
        >
            <Text>
                {client.name}
            </Text>
        </Box>
    )
};

export { ClientTile };