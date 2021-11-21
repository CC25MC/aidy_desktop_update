import { Box, Text, Flex, Avatar, Modal, Icon, Button, Input, Card, Set } from "bumbag";
import { TrashIcon, DiscountIcon, ExchangeIcon } from "components/atoms";
import { useState } from "react";
import Logo from "assets/Logo.png";

const OptionCheckout = ({ deleteProduct, show }) => {
    return <Box borderRadius={"4"} borderTopLeftRadius="0" borderTopRightRadius={"0"} backgroundColor="light" >
        <Flex paddingLeft="10px" paddingRight={"10px"}>
            <Box alignY="center" >
                <Flex onClick={() => deleteProduct()} cursor={"pointer"}>
                    <TrashIcon color={"white"} />
                    <Text fontSize={"100"} marginLeft={"10px"} color="white">
                        Eliminar
                    </Text>
                </Flex>
            </Box>
            <Box alignY="center" height={"50px"} marginLeft={"auto"} >
                <Flex onClick={show} cursor={"pointer"}>
                    <DiscountIcon color={"white"} />
                    <Text fontSize={"100"} marginLeft={"10px"} color="white">
                        Añadir descuento
                    </Text>
                </Flex>
            </Box>
            {/* <Box alignY="center" height={"50px"} marginLeft={"auto"}>
                <Flex onClick={() => { console.log("precio"); }} cursor={"not-allowed"}>
                    <ExchangeIcon color={"white"} />
                     <Text fontSize={"100"} marginLeft={"10px"} color="white">
                        Cambiar precio
                    </Text>
                </Flex>
            </Box> */}
        </Flex>
    </Box>;
};

export const ClientCheckout = ({ item, setClient, client, selected }) => {
    return (
        <Box marginTop={"5px"} onClick={() => setClient(item)} cursor="pointer" >
            <Box borderRadius={"2"} backgroundColor={item.id === client?.id || selected ? "primary" : "body"}>
                <Flex>
                    <Box alignY="center" width="auto" height="42px">
                        <Text color={item.rut === client?.rut || selected ? "body" : "primary"} fontSize="100">
                            {item.name} {item.lastname}
                        </Text>
                    </Box>
                    <Box marginLeft="auto" alignY="center" width="auto" height="42px">
                        <Text color={item.id === client?.id || selected ? "body" : "primary"} fontSize="100">
                            {item.rut}
                        </Text>
                    </Box>
                </Flex>
            </Box>
            <Box backgroundColor="gray100" height="2px" width="100%" />
        </Box>

    );
};

export const ResumenCheckout = ({ item }) => {
    return (
        <Box marginTop={"20px"}>
            <Box borderRadius={"2"}>
                <Flex>
                    <Avatar src={item.hasImages || Logo} alt={"img"} borderRadius={"2"} />
                    <Box alignY="center" marginLeft={"115px"} width="200px">
                        <Box>
                            <Text fontSize={"200"} color="white">
                                {item.name}
                            </Text>
                        </Box>
                    </Box>
                    <Box alignY="center" marginLeft={"auto"} width={"100px"}>
                        <Box>
                            <Text fontSize={"100"} color="span">
                                {`${item.quantity} x $${item.price}`}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize={"200"} color="white">
                                ${item.total}
                            </Text>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export const CheckoutListItem = ({ 
    item, 
    removeProducList, 
    id, 
    operationQuantity, 
    discountProduct 
}) => {
    const modal = Modal.useState();
    const [options, setOptions] = useState(false);
    const [desc, setDesc] = useState(0);
    const deleteProduct = () => {
        removeProducList(id);
        setOptions(!options);
    };   
    return (
        <Box marginTop={"10px"}>
            <Modal {...modal} style={{
                minWidth: 600
            }}>
                <Card
                    title={`Aplicar Descuento al Producto ${item.name}`}
                    footer={(
                        <Set>
                            <Button palette="secondary" onClick={() => {
                                discountProduct(item, desc);
                                modal.hide();
                            }}>
                                Aplicar Descuento
                            </Button>
                        </Set>
                    )}
                    headerAddon={
                        <Modal.Disclosure  onClick={() => {
                            modal.hide();
                        }} use={Button.Close}>Cerrar</Modal.Disclosure>
                    }
                >
                    <Box  padding="major-2">
                        <Input placeholder="Descuento" value={desc} onChange={e => setDesc(e.target.value)}/>
                    </Box>
                </Card>
            </Modal>
            <Box borderRadius={"2"} backgroundColor="body">
                <Flex>
                    <Box display = "flex" alignY = "center">
                        <Box marginRight = "8px">
                            {item.hasImages 
                                ? (
                                    <Avatar src={item.hasImages || Logo} alt={item.name} borderRadius={"2"} />
                                )
                                : (
                                    <Box backgroundColor = {item.color} borderRadius="2" width = "45px" height = "45px" marginRight = "8px" >
                                        <Box flexDirection="column" display="flex" height="100%" justifyContent="center" alignItems="center" >
                                            <Icon icon="flour" fontSize="200" color="white" />
                                        </Box>
                                    </Box>
                                )
                            }
                        </Box>
                        <Box alignY="center" width={"100px"}>
                            <Box>
                                <Text fontSize={"100"} color="primary">
                                    {item.name}
                                </Text>
                            </Box>
                            <Box marginTop="-4px">
                                <Text fontSize={"100"} color="span">
                                    {`$${item.price}`}
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box marginLeft = "8px" display = "flex">
                        <Box alignX={"center"} alignY="center" marginLeft={"auto"}>
                            <Box alignX={"center"} alignY="center" borderRadius={"2"} width={"38px"} height={"38px"} backgroundColor="btn" onClick={() => operationQuantity(id, "quantity", "suma")} cursor={"pointer"} >
                                <Text fontSize={"400"} color="#2E6FD3">
                                    +
                                </Text>
                            </Box>
                        </Box>
                        <Box alignX={"center"} alignY="center" width={"40px"} marginLeft={"auto"}>
                            <Box alignX={"center"} alignY="center" backgroundColor="body" >
                                <Text fontSize={"200"} color="primary">
                                    {item.quantity}
                                </Text>
                            </Box>
                        </Box>
                        <Box alignX={"center"} alignY="center" marginLeft={"auto"}>
                            <Box alignX={"center"} alignY="center" borderRadius={"2"} width={"38px"} height={"38px"} backgroundColor="btn" onClick={() => item.quantity == 1 ? null : operationQuantity(id, "quantity", "resta")} cursor={item.quantity == 1 ? "not-allowed" : "pointer"} >
                                <Text fontSize={"400"} color="#2E6FD3">
                                    -
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box marginLeft = "8px" display = "flex" >
                        <Box alignX={"center"} alignY="center" width={"100px"} marginLeft={"auto"}>
                            <Box alignX={"center"} alignY="center" backgroundColor="body" >
                                <Text fontSize={"100"} color="primary">
                                    ${item.total}
                                </Text>
                            </Box>
                        </Box>
                        <Box alignX={"center"} alignY="center" marginLeft={"auto"}>
                            <Box alignX={"center"} alignY="center" width={"48px"} height={"48px"} backgroundColor="body" onClick={() => { setOptions(!options); }} cursor={"pointer"} >
                                <Icon icon="main3" fontSize="600" color={"primary"} marginTop={"10px"} />
                            </Box>
                        </Box>
                    </Box>
                </Flex>
            </Box>
            {options &&
                <OptionCheckout 
                    deleteProduct={deleteProduct} show={ ()=> modal.show()} 
                />
            }
        </Box>
    );
};

