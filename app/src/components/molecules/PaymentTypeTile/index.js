import { Box, Text } from "bumbag";

const PaymentTypeTile = ({ item, ...rest }) => {
    return (
        <Box
            paddingX = "major-3" 
            paddingY = "major-2" 
            cursor = "pointer" 
            _hover = {{
                backgroundColor: "#ededed"
            }}
            {...rest}
        >
            <Text>
                {item.methods}
            </Text>
        </Box>
    )
};

export { PaymentTypeTile };