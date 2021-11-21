import { Box, Text, Stack, Flex, Image, Icon } from 'bumbag';
import { useState, Fragment } from 'react';

const BoletaCard = ({ item, actions, boletOffline }) => {
    const [showActions, setShowActions] = useState(false);
    const bgColor = '#011A41';
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
                            <Box flexDirection="column" display="flex" height="100%" justifyContent="center" alignItems="center"  >
                                {
                                    item?.ticket?.preview ?
                                        <Image src={item?.ticket.preview?.replace(/\\/g, "/")} alt={item?.ticket?.folio} style={{ height: "100%" }} />
                                        :
                                        <Box flexDirection="column" display="flex" height="100%" justifyContent="center" alignItems="center" >
                                            <Icon icon="ticket" fontSize="700" color="white" />
                                            { item.client && (
                                                <Text marginTop="8px" display="block" color="secondary" fontSize="14px" fontWeight="bold">
                                                    {item?.client?.name +" "+ item?.client?.lastname}
                                                </Text>
                                            )}
                                        </Box>
                                }

                            </Box>


                        </Box>
                        <Box height="40%" background={"#033A90"} position="relative" paddingY="major-1" paddingX="major-2">
                            <Text display="block" color="white" fontSize="12px">
                                {item?.date}
                            </Text>
                            <Flex marginTop="5px">
                                <Text display="block" color="white" fontSize="12px">
                                    $ {item?.total}
                                </Text>
                                <Box marginLeft="auto" backgroundColor="secondary" borderRadius="2" padding="2px 4px 2px 4px">
                                    <Text display="block" color="primary" fontSize="12px">
                                        {item?.payment_method}
                                    </Text>
                                </Box>
                            </Flex>

                        </Box>
                    </Fragment>
                )
            }
        </Box>
    );
};

export { BoletaCard };