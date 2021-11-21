import { Flex, Image, Icon, Box, Text, Button, Modal, Card, Input, Set, Columns } from "bumbag";
import { Fragment, useState } from "react";
import { useMutateStockMovement } from "hooks/models/useStockMovements";
import dayjs from "dayjs";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

const ProductTile = ({ item : product }) => {
    const [ quantity , setQuantity ]  = useState("");
    const { mutate : addMovement } = useMutateStockMovement();
    const modal = Modal.useState();
    return (
        <Fragment>
            <Flex borderRadius = "8px" width = "100%" overflow = "hidden">
                <Box display = "flex" alignItems = "center">
                    <Box width = "80px" height = "80px" backgroundColor = {product.color} >
                        {product.image && (
                            <Image src = {product.image} alt = {product.name} />
                        )}
                    </Box>
                    <Text display = "block" marginLeft = "major-2">
                        {product.name}
                    </Text>
                </Box>
                <Box flex = "1" display = "flex" alignItems = "center" justifyContent = "center">
                    <Box>
                        <Text display = "block" >
                            Stock: {product.quantity ?? 0}
                        </Text>
                        <Text display = "block" color = "gray" fontSize = "12px">
                            Costo de stock: $ { (product.quantity ?? 0) * product.price }
                        </Text>
                    </Box>
                </Box>
                <Box flex = "1" display = "flex" alignItems = "center" padding = "major-2" justifyContent = "flex-end" >
                    <Box>
                        <Button variant = "ghost" onClick = { () => { modal.show() } }>
                            <Icon icon = "add" />
                        </Button>
                    </Box>
                </Box>
            </Flex>
            <Modal {...modal} style={{
                minWidth: 460
            }}>
                <Card
                    footer = {
                        <Set>
                            <Button disabled = { quantity <= 0 } variant="ghost" onClick={() => {
                                addMovement({
                                    product,
                                    quantity,
                                    date: dayjs().toISOString()
                                })
                                modal.hide();
                            }}>
                                OK
                            </Button>
                        </Set>
                    }
                    title={`Agregar stock: ${product.name}`}
                    headerAddon={
                        <Modal.Disclosure {...modal} use={Button.Close}/>
                    }
                >
                   <Input 
                        placeholder = "Cantidad" 
                        value = {quantity} 
                        type = "number" 
                        onChange  = {(e) => { setQuantity(e.target.value) }}  
                    />
                    <Columns>
                        { Array.from({ length: 12 }, (_,n) =>{
                            return (
                                <Columns.Column spread = {4}>
                                    <Box 
                                        use = "button"
                                        padding = "18px" 
                                        color = "secondary"
                                        cursor = "pointer"
                                        display = "flex"
                                        alignItems = "center"
                                        justifyContent = "center"
                                        width = "100%"
                                        border = "0"
                                        onClick = {() => {
                                            if( n + 1 === 11 ) {
                                                setQuantity("");
                                                return;
                                            }

                                            if( n + 1 === 12 ) {
                                                setQuantity( quantity.substr(0, quantity.length - 1 ) );
                                                return
                                            }

                                            let value = n + 1;

                                            if( n + 1 === 10 ){
                                                value = 0
                                            }

                                            setQuantity(
                                                quantity + "" + (value)
                                            );
                                        }}
                                        _active = {{
                                            backgroundColor: "secondary",
                                            color: "#fff"
                                        }}
                                    >
                                        <Text fontSize = "32px">
                                            {(() => {

                                                if( n + 1 === 10 ){
                                                    return 0;
                                                }

                                                if( n + 1 === 11 ){
                                                    return "x"
                                                }

                                                if( n + 1 === 12 ){
                                                    return  (
                                                        <Icon paddingTop = "9px" icon = {faBackspace} type = "font-awesome" />
                                                    )
                                                }

                                                return n + 1;

                                            })() }
                                        </Text>
                                    </Box>
                                </Columns.Column>
                            )
                        })}
                    </Columns>
                </Card>
            </Modal>
        </Fragment>
    );
}

export { ProductTile };