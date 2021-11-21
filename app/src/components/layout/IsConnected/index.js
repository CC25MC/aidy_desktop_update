import { Box, Text, Badge } from 'bumbag';
import { useConnected } from 'hooks';

export const IsConnected = () => {
    const {connected} = useConnected();

    return (
        <Badge marginLeft={"auto"} width="100px" height="35px" palette={connected ? "success" : "offline"}>
            <Box borderRadius="7" width="7px" backgroundColor={connected ? "#074F18" : "#997400"} height="7px" />
            <Text marginLeft={"5px"} color={connected ? "#074F18" : "#997400"}>
                {connected ? "Online" : "Offline"}
            </Text>
        </Badge>
    );
};