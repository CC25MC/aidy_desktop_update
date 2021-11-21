import { Box, Text, Flex, Icon, Divider } from "bumbag";
import { CloseIcon } from "components";
const options = [
    {
        title: "Opciones de envío",
    },
    {
        title: "Añadir observación",
    },
    {
        title: "Añadir descuento",
    },
];
export const MoreOptions = ({ close }) => {
    return (<Box padding={"30px"} right="24px" borderRadius="2" position="fixed" width="455px" top="40%" backgroundColor="light">
        <Flex>
            <Text fontSize={"100"} color="white">
                Mas opciones
            </Text>
            <Box alignX={"center"} alignY="center" marginLeft={"auto"} borderRadius={"2"} width={"42px"} onClick={() => close()} cursor={"pointer"}>
                <CloseIcon color="#fffff" />
            </Box>
        </Flex>
        {options.map((item, key) => (
            <Box key={key} marginTop="15px" onClick={() => close()} cursor={"pointer"}>
                <Flex >
                    <Text fontSize={"100"} color="white">
                        {item.title}
                    </Text>
                    <Box alignX={"center"} alignY="center" marginLeft={"auto"} borderRadius={"2"} width={"42px"} >
                        <Icon icon={"arrowRight"} />
                    </Box>
                </Flex>
                <Divider marginTop="15px" />
            </Box>
        ))}
    </Box>);
};