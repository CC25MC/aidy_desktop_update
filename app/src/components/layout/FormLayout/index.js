import { Box, Flex, Text, Button } from 'bumbag';
import React from 'react';
import { useHistory } from 'react-router';
import { IsConnected } from '../IsConnected';

const FormLayout = ({
    title,
    children,
    goback, 
    onGoBack
}) => {
    const history = useHistory();
    return (
        <Box overflow="auto" height = "100%" minWidth = "700px" >
            <Flex padding = "major-4" justifyContent = "space-between" height = "96px">
                <Text>
                    { title }
                </Text>
                <IsConnected />
                <Button.Close color = "secondary" onClick = {() => {
                    if(typeof onGoBack === "function"){
                        onGoBack();
                    }
                    history.push( "/" + goback );
                }} />
            </Flex>
            <Box minHeight = "100%" padding = "major-4" backgroundColor = "primary" borderTopLeftRadius = "16px" borderTopRightRadius = "16px">
                {children}
            </Box>
        </Box>
    );
};

export { FormLayout };