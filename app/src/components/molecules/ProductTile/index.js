import { Box, Text } from "bumbag";

const ProductTile = ({ item : product, ...rest }) => {
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
                {product.name}
            </Text>
        </Box>
    )
};

export { ProductTile };