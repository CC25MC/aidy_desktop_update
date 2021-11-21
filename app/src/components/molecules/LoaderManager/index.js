import { Box, Text, Spinner } from 'bumbag';

const LoaderManager = ({
    show,
    title,
    subTitle,
    children
}) => {
    if(show){
        return (
            <Box flexDirection = "column" height = "100%" display = "flex" justifyContent = "center" alignItems = "center">
                <Spinner hasTrack size="large" />
                <Box>
                    <Text fontWeight = "bold">
                        {title}
                    </Text>
                </Box>
                <Box>
                    <Text fontSize = "12px">
                        {subTitle}
                    </Text>
                </Box>
            </Box>
        )
    }

    return children;
}

export { LoaderManager };