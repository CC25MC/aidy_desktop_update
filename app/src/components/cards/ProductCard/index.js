import { Box, Text, Stack } from 'bumbag';
import { useState, Fragment } from 'react';
import { Icon, Image } from 'bumbag';


const ProductCard = ({ item, actions }) => {
    const [showActions, setShowActions] = useState(false);
    const bgColor = colorForBackground[item.color] ?? '#033A90';
    const { label, top: TopComponent, bottom: BottomComponent } = actions ?? {};
    return (
        <Box
            width="170px"
            height="170px"
            borderRadius="8px"
            overflow="hidden"
            onClick={() => {
                setShowActions(!showActions);
            }}
        >
            {showActions && actions?.top && actions?.bottom && actions?.label
                ? (
                    <Fragment>
                        <Box display="flex" background={bgColor} height="100%" padding="major-2">
                            <Stack spacing="major-2" width="100%">
                                <Box>
                                    {TopComponent}
                                </Box>
                                <Box width="100%" height="1px" background="rgba(255,255,255,.6)" />
                                <Box textAlign="center">
                                    <Text color="white">
                                        {label}
                                    </Text>
                                </Box>
                                <Box width="100%" height="1px" background="rgba(255,255,255,.6)" />
                                <Box>
                                    {BottomComponent}
                                </Box>
                            </Stack>
                        </Box>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Box height="60%" background={bgColor}>
                            {item.images?.length ?
                                (<Box flexDirection="column" display="flex" height="100%" justifyContent="center" alignItems="center"  >
                                    <Image src={item.images[0].path} alt={item.name} style={{  height:"100%" }} />
                                </Box>
                                )
                                : (
                                    <Box flexDirection="column" display="flex" height="100%" justifyContent="center" alignItems="center" >
                                        <Icon icon="flour" fontSize="400" color="white" />
                                        <Text marginTop="8px" display="block" color="white" fontSize="14px" fontWeight="bold">
                                            {item.name}
                                        </Text>
                                    </Box>
                                )
                            }
                        </Box>
                        <Box height="40%" background={item.color} paddingY="major-1" paddingX="major-2">
                            <Text display="block" color="white" fontSize="14px">
                                {item.name}
                            </Text>
                            <Text display="block" color="white" fontSize="12px">
                                $ {item.price}
                            </Text>
                        </Box>
                    </Fragment>
                )
            }
        </Box>
    );
};

const colorForBackground = {
    '#033A90': '#011A41',
    '#FFC700': '#D09809',
    '#6DC229': '#027419',
    '#DB2E2E': '#600000',
    '#4608AC': '#240066',
    '#FF7A00': '#D76D04'
};

export { ProductCard };