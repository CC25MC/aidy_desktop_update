import { 
    Box, 
    Columns, 
    Text, 
    Flex, 
    Set, 
    Icon, 
    Button, 
    Drawer, 
    Modal, 
    Card, 
    Input, 
    Select, 
    Pagination, 
    Stack,
    Disclosure,
    Show,
    DropdownMenu
} from "bumbag";
import { useState, Fragment, useRef } from 'react';
import { 
    AdminLayout, 
    CheckoutListItem, 
    Main3horizontalIcon, 
    MoreOptions,
    Invoice, 
    ProductCard, 
    Header, 
    TextField, 
    FormLayout, 
    ClientCheckout 
} from "components";
import { Scrollbars } from 'react-custom-scrollbars';
import { paymentMethods } from "variables";
import { Switch, Route, useRouteMatch, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useClients } from "hooks/models/useClients";
import { DateTime } from "luxon";
import { useMutateBills } from "hooks/models";
import { usePagination } from "hooks";
import { faBarcode, faBolt, faFilter, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Formik } from 'formik';
import { TextField as FormikTextField } from 'components/formik';
import { useSuppliers } from 'hooks/models/useSuppliers';
import { productsFilters } from "utils/filters/products";

const POSView = ({
    checkoutList,
    removeProducList,
    operationQuantity,
    emptyList,
    totalOrder,
    payMethods,
    handlechangePayMethods,
    options,
    // open,
    close,
    data,
    addProducList,
    // enterPress,
    client,
    setClient,
    invoice,
    setInvoice,
    setCheckoutList,
    discountProduct
}) => {
    //eslint-disable-next-line
    const audio = new Audio('/scanner-effect.mp3');
    const scannerRef = useRef();
    const [panelOption, setPanelOption] = useState("");
    const [scena, setScena] = useState(false);
    const [desc, setDesc] = useState(0);
    const [ selectedSupplier, setSelectedSupplier ] = useState(null);
    const match = useRouteMatch();
    const history = useHistory();
    const { data: clients } = useClients();
    const { data: suppliers } = useSuppliers();
    const { mutateAsync: saveBills, isLoading: isMutatingBill } = useMutateBills();
    const [productsscanned, setProductScanned] = useState([]);
    const [productNotFound, setProductNotFound] = useState(false);
    const disclosure = Disclosure.useState();
    const modal = Modal.useState();
    const fastSellModal = Modal.useState();
    const {
        data: paginatedProducts,
        pageIndex,
        resultsPerPageOptions,
        resultsPerPage,
        setResultsPerPage,
        gotoPage,
        totalPages,
        search
    } = usePagination({
        data: data,
        searchBy: ["name", "code"],
        filters: [
            [ selectedSupplier , productsFilters.supplier ]
        ]
    });

    const handleBilling = () => {
        const date = DateTime.now().toLocaleString(
            DateTime.DATE_FULL
        );
        setInvoice({
            checkoutList,
            payMethods,
            client,
            date: date,
            discount: desc,
            total: Math.ceil(totalOrder(checkoutList) - (totalOrder(checkoutList) * (desc / 100)))
        });
        saveBills({
            date: date,
            payment_method: payMethods,
            client_id: client?.id,
            discount: desc,
            total: Math.ceil(totalOrder(checkoutList) - (totalOrder(checkoutList) * (desc / 100))),
            checkoutList: checkoutList,
        }).then(() => {
            history.push(`${match.url}/invoice`);
        });
    }

    return (
        <AdminLayout>
            <Switch>
                <Route path={match.path} exact >
                    <Modal {...modal} style={{
                        minWidth: 460
                    }}>
                        <Card title={scena ? "Aplicar Descuento" : "Escanear productos"}
                            headerAddon={
                                <Button.Close onClick={() => {
                                    modal.hide();
                                }} />
                            }
                        >
                            {scena ?
                                <Box>
                                    <Stack padding="30px" orientation="horizontal" spacing="major-2">
                                        <Input placeholder="Descuento" value={desc} onChange={e => setDesc(e.target.value)} />
                                    </Stack>
                                    <Box padding="0px 30px 30px 30px">
                                        <Button palette="secondary" width="100%" onClick={() => {
                                            setScena(false);
                                            modal.hide();
                                        }}>
                                            Aplicar Descuento
                                        </Button>
                                    </Box>
                                </Box>
                                :
                                <Box height="auto">
                                    <Box
                                        {...(productNotFound ? {
                                            height: 0,
                                            display: 'none'
                                        } : {})}
                                    >
                                        <Input placeholder="escaneando" ref={scannerRef} onKeyDown={(e) => {
                                            if (e.keyCode === 13) {
                                                var code = e.target.value;
                                                const resultado = data.find(item => item.code === code);
                                                if (resultado) {
                                                    const res = productsscanned.find(item => item.name === resultado.name);
                                                    var newData;
                                                    if (res) {
                                                        newData = productsscanned.map((item) => {
                                                            if (item.name === res.name) {
                                                                item["quantity"] = item["quantity"] + 1;
                                                                item["total"] = item["price"] * item["quantity"];
                                                                return item;
                                                            }
                                                            return item;
                                                        });
                                                    } else {
                                                        newData = [
                                                            ...productsscanned,
                                                            {
                                                                name: resultado.name,
                                                                price: resultado.price,
                                                                hasImages: resultado.hasImages[0],
                                                                quantity: 1,
                                                                total: resultado.price
                                                            }
                                                        ];
                                                    }
                                                    setProductScanned(newData);
                                                } else {
                                                    setProductNotFound(true);
                                                }
                                                scannerRef.current.value = '';
                                            }
                                        }}
                                            onChange={() => {
                                                audio.currentTime = 0;
                                                audio.addEventListener('timeupdate', function () {
                                                    if (audio.currentTime >= 0.05) {
                                                        audio.pause();
                                                    }
                                                }, false);
                                                audio.play();
                                            }}
                                        />
                                        {productsscanned.map((product, key) => (
                                            <Box key={key} >
                                                <CheckoutListItem
                                                    item={product}
                                                    key={key}
                                                    id={key}
                                                    removeProducList={(position) => {
                                                        const newData = [
                                                            ...productsscanned.slice(0, position),
                                                            ...productsscanned.slice(position + 1),
                                                        ];
                                                        setProductScanned(newData);
                                                    }}
                                                    operationQuantity={(index, props, operation) => {
                                                        const newData = productsscanned.map((item, key) => {
                                                            if (key === index) {
                                                                if (operation === "suma") {
                                                                    item[props] = item[props] + 1;
                                                                } else {
                                                                    item[props] = item[props] - 1;
                                                                }
                                                                item["total"] = item["price"] * item[props];
                                                                return item;
                                                            }
                                                            return item;
                                                        });
                                                        setProductScanned(newData);
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                        {productsscanned && (
                                            <Box alignY="center" alignX="center" padding="major-2">
                                                <Set>
                                                    <Button palette="secondary" onClick={() => {
                                                        setProductScanned([]);
                                                    }}>
                                                        Limpiar
                                                    </Button>
                                                    <Button onClick={() => {
                                                        setCheckoutList(checkoutList.concat(productsscanned));
                                                        setProductScanned([]);
                                                        modal.hide();
                                                    }}>
                                                        Agregar a la Orden Actual
                                                    </Button>
                                                </Set>

                                            </Box>)}
                                    </Box>
                                    {productNotFound && (
                                        <Box textAlign="center">
                                            <Box>
                                                <Text>
                                                    Producto no encontrado, ¿Desea registrarlo?
                                                </Text>
                                            </Box>
                                            <Box alignY="center" alignX="center" padding="major-2">
                                                <Set>
                                                    <Button palette="secondary" onClick={() => { setProductNotFound(false); }}>
                                                        No
                                                    </Button>
                                                    <Button use={Link} to="/productos/agregar">
                                                        Registrar
                                                    </Button>
                                                </Set>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            }
                        </Card>
                    </Modal>
                    <Modal { ...fastSellModal } style={{
                        minWidth: 460
                    }} >
                        <Formik 
                            initialValues = {{
                                price: '',
                                description: ''
                            }}
                            onSubmit = {(values) => {
                                addProducList({
                                    quantity: 0,
                                    name: values.description || 'Item sin descripcion',
                                    price: values.price,
                                    isFastSell: true
                                })
                            }}
                        >
                            {({ handleSubmit }) => {
                                return(
                                    <Card title={'Venta Rapida'}
                                        headerAddon={
                                            <Button.Close onClick={() => {
                                                fastSellModal.hide();
                                            }} />
                                        }
                                        footer = {(
                                            <Set>
                                                <Button onClick = { () => {
                                                    handleSubmit();
                                                }}>
                                                    Agregar
                                                </Button>
                                                <Button variant = 'ghost' onClick = {() => {
                                                    fastSellModal.hide();
                                                }}>
                                                    Cerrar
                                                </Button>
                                            </Set>
                                        )}
                                    >
                                        <Stack>
                                            <FormikTextField name = "price" label = "Precio" />
                                            <FormikTextField name = "description" label = "Descripcion" />
                                        </Stack>
                                    </Card>
                                )
                            }}
                        </Formik>
                    </Modal>
                    <Box padding="0px 24px 0px 0px">
                        <Columns isGapless>
                            <Columns.Column spread={8} spreadTablet = {12} spreadMobile = {12} spreadDesktop = {12}>
                                <Header
                                    title="Punto de Venta"
                                    actions={(
                                        <Fragment>
                                            <Button size = "small" onClick={() => {
                                                modal.show();
                                                setTimeout(() => {
                                                    scannerRef.current.focus();
                                                }, 200)
                                            }}>
                                                <Icon icon = {faBarcode} type = 'font-awesome' />
                                            </Button>
                                            <Button size = "small" onClick={() => {
                                                fastSellModal.show();
                                            }}>
                                                <Icon icon = {faBolt} type = 'font-awesome' />
                                            </Button>
                                            <Disclosure {...disclosure} >
                                                <Button size = "small">
                                                    <Icon icon = {faFilter} type = 'font-awesome' />
                                                </Button>
                                            </Disclosure>
                                        </Fragment>
                                    )}
                                    search={search}
                                />
                                <Disclosure.Content {...disclosure}>
                                    <Box color = "#000">
                                    {!!suppliers.length && (
                                        <Select
                                            //containLabel = {true}
                                            variant="filled"
                                            //label = "Proveedores"
                                            color = "#000"
                                            size = "small"
                                            placeholder = "Proveedor"
                                            onChange = { event => {
                                                setSelectedSupplier(
                                                    suppliers.find( s => s.name === event.target.value )
                                                )
                                            }}
                                            options={
                                                [
                                                    { label: 'Todos', value: '' },
                                                    ...suppliers.map( supplier => ({
                                                        label: supplier.name,
                                                        value: supplier.name
                                                    }))
                                                ]
                                            }
                                        />
                                    )}
                                    </Box>
                                </Disclosure.Content>
                                <Show below = "desktop">
                                    <SummaryOrderPanel 
                                        checkoutList = {checkoutList}
                                        onBilling = {handleBilling}
                                        onClearItems = {emptyList}
                                        onSelectClient = {setClient}
                                        onSelectPaymentMethod = {handlechangePayMethods}
                                        currentClient = {client}
                                        currentPaymentMethod = {payMethods}
                                    />
                                </Show>
                                <Box minHeight="90%">
                                    <Box padding="major-2">
                                        <Set>
                                            {paginatedProducts.map(product => (
                                                <Box key={product.id} onClick={() => addProducList(product)} cursor="pointer">
                                                    <ProductCard
                                                        item={product}
                                                    />
                                                </Box>
                                            ))}
                                        </Set>
                                    </Box>
                                    <Box alignX="center" alignY="bottom" marginTop="10px">
                                        <Flex>
                                            <Pagination
                                                nextText="Siguiente"
                                                previousText="Atrás"
                                                currentPage={pageIndex + 1}
                                                onChangePage={page => gotoPage(page - 1)}
                                                numberOfPages={totalPages}
                                            />
                                            <Select
                                                onChange={e => {
                                                    setResultsPerPage(e.target.value)
                                                }}
                                                value={resultsPerPage}
                                                options={[
                                                    ...resultsPerPageOptions.map(opt => ({
                                                        label: opt,
                                                        value: opt
                                                    }))
                                                ]}
                                            />
                                        </Flex>
                                    </Box>
                                </Box>
                            </Columns.Column>
                            <Show above = "desktop">
                                <Columns.Column spread={4} spreadTablet = {6} spreadMobile = {6} >
                                    <Box height = "calc(100vh - 100px)" backgroundColor = "body">
                                        <Box padding = "major-2" display = "flex" justifyContent = "space-between">
                                            { panelOption === 'client'  
                                                ? (
                                                    <Fragment>
                                                        <Text fontSize={"200"} color="primary">
                                                            Seleccionar cliente
                                                        </Text>
                                                        <Box display = "flex">
                                                            <Button use = {Button.Close} onClick = {() => {
                                                                setPanelOption("")
                                                            }} />
                                                        </Box>
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        <Text fontSize={"200"} color="primary">
                                                            Orden Actual
                                                        </Text>
                                                        <Box display = "flex">
                                                            <Box 
                                                                alignX={"center"} 
                                                                alignY="center" 
                                                                borderRadius={"2"} 
                                                                width={"40px"} 
                                                                backgroundColor="btn" 
                                                                onClick={() => setPanelOption("client")} 
                                                                cursor={"pointer"} 
                                                            >
                                                                <Icon icon="client" color="#2E6FD3" />
                                                            </Box>
                                                            <Box 
                                                                alignX={"center"} 
                                                                alignY="center" 
                                                                marginLeft={"10px"} 
                                                                borderRadius={"2"} 
                                                                width={"110px"} 
                                                                backgroundColor="btn" 
                                                                onClick={() => emptyList()} 
                                                                cursor={"pointer"} 
                                                            >
                                                                <Text fontSize={"100"} color="#2E6FD3">
                                                                    Limpiar todo
                                                                </Text>
                                                            </Box>
                                                        </Box>
                                                    </Fragment>
                                                )
                                            }
                                        </Box>
                                        <Box padding = "major-2" height = "45%">
                                            <Scrollbars 
                                                renderTrackHorizontal={props => <Box {...props} style={{display: 'none'}} className="track-horizontal"/>}
                                                style={{ 
                                                    height: "100%" ,
                                                    overflowX: 'hidden'
                                                }}
                                            >
                                                {panelOption === "client" 
                                                    ? (
                                                        <Fragment>
                                                            <Box borderRadius={"2"} backgroundColor="body">
                                                                <Flex>
                                                                    <Box alignY="center" width="auto" height="42px">
                                                                        <Text color="primary" fontSize="100">
                                                                            Nombre
                                                                        </Text>
                                                                    </Box>
                                                                    <Box marginLeft="auto" alignY="center" width="auto" height="42px">
                                                                        <Text color="primary" fontSize="100">
                                                                            Rut
                                                                        </Text>
                                                                    </Box>
                                                                </Flex>
                                                            </Box>
                                                            <Box backgroundColor="gray100" height="2px" width="100%" />
                                                            {clients.map((item, key) => (
                                                                <ClientCheckout 
                                                                    item={item} 
                                                                    key={key}  
                                                                    setClient={setClient} 
                                                                    client={client} 
                                                                />
                                                            ))}
                                                        </Fragment>
                                                    )
                                                    : (
                                                        <Fragment>
                                                            {checkoutList.map((item, key) => (
                                                                <CheckoutListItem 
                                                                    item={item} 
                                                                    key={key} 
                                                                    id={key}
                                                                    removeProducList={removeProducList} 
                                                                    operationQuantity={operationQuantity} 
                                                                    discountProduct={discountProduct} 
                                                                />
                                                            ))}
                                                        </Fragment>
                                                    )
                                                }
                                            </Scrollbars>
                                        </Box>
                                        <Box 
                                            borderRadius={"2"} 
                                            backgroundColor="primary" 
                                            padding={"30px"} 
                                            color="white"
                                        >
                                            <Flex>
                                                <Text fontSize={"300"} color="white">
                                                    Total: {`$ ${Math.ceil(totalOrder(checkoutList) - (totalOrder(checkoutList) * (desc / 100))) || 0}`}
                                                </Text>
                                                <Box alignX={"center"} alignY="center" marginLeft={"auto"} borderRadius={"2"} width={"42px"} backgroundColor="btn" onClick={() => console.log("disabled")} cursor={"not-allowed"} >
                                                    <Main3horizontalIcon color={"#2E6FD3"} />
                                                </Box>
                                            </Flex>
                                            <Columns isGapless>
                                                {paymentMethods.map((item, key) => (
                                                    <Box key={key} borderRadius={"2"} marginRight="16px" marginTop="2%" width={"72px"} height={"72px"} alignX={"center"} alignY="center" onClick={() => handlechangePayMethods(item.methods)} backgroundColor={payMethods === item.methods ? "secondary" : null} border={payMethods === item.methods ? null : "1px solid #FFB800"} cursor={"pointer"} >
                                                        <Box>
                                                            {payMethods === item.methods ? item.icon : item.iconActive}
                                                        </Box>
                                                        <Text color={payMethods === item.methods ? "primary" : "secondary"} style={{ fontSize: "10px" }}>
                                                            {item.methods}
                                                        </Text>
                                                    </Box>)
                                                )}
                                            </Columns>
                                            <Box alignX={"right"} onClick={() => { modal.show(); setScena(true); }} cursor={"pointer"} >
                                                <Text fontSize={"200"} color="secondary">
                                                    Dar descuento
                                                </Text>
                                            </Box>
                                            <Box width={"100%"}>
                                                <Button 
                                                    disabled={!checkoutList.length > 0 && !client.length > 0} 
                                                    width={"100%"} 
                                                    onClick = {handleBilling} 
                                                    palette="white" 
                                                    isLoading={isMutatingBill}
                                                >
                                                    Facturar
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Columns.Column>
                            </Show>
                        </Columns>
                    </Box>
                </Route>
                <Route path={`${match.path}/invoice`} exact >
                    <Drawer isFullScreen={true} visible={true} style={{
                        zIndex: 1960
                    }}>
                        <FormLayout title={"Resumen"} alignX="center" alignY="center" goback="pos">
                            <Invoice checkoutList={checkoutList} payMethods={payMethods} client={client} emptyList={emptyList} invoice={invoice} />
                        </FormLayout>
                    </Drawer>
                </Route>
            </Switch>
        </AdminLayout>
    );
};

const SummaryOrderPanel = ({
    checkoutList,
    onBilling,
    onClearItems,
    onSelectClient,
    onSelectPaymentMethod,
    currentClient,
    currentPaymentMethod,
    ...rest
}) => {
    const [ collapsed , setCollapsed ] = useState(true);
    const [ viewingPanel, setViewingPanel ] = useState("");
    const { data : clients } = useClients();
    return(
        <Box width = "100%" {...rest}>
            {!collapsed
                ? (
                    <Columns width = "100%" backgroundColor = "body" isGapless>
                        <Columns.Column spread = {7} padding = "major-2">
                            <Box display = "flex" justifyContent = "space-between">
                                { viewingPanel === 'client-panel' 
                                    ? (
                                        <Fragment>
                                            <Box display = "flex" alignY = "center">
                                                <Button use = {Button.Close} marginRight = "8px" onClick = { () => setViewingPanel("") } />
                                                <Text fontSize={"200"} color="primary">
                                                    Seleccionar Cliente
                                                </Text>
                                            </Box>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <Box display = "flex" alignY = "center">
                                                <Button use = {Button.Close} marginRight = "8px" onClick = { () => setCollapsed(true) } />
                                                <Text fontSize={"200"} color="primary">
                                                    Orden Actual
                                                </Text>
                                            </Box>
                                            <Box display = "flex">
                                                <Box 
                                                    alignX={"center"} 
                                                    alignY="center" 
                                                    borderRadius={"2"} 
                                                    width={"40px"} 
                                                    backgroundColor="btn" 
                                                    cursor={"pointer"} 
                                                    onClick = {() => {
                                                        setViewingPanel("client-panel")
                                                    }}
                                                >
                                                    <Icon icon="client" color="#2E6FD3" />
                                                </Box>
                                                <Box 
                                                    alignX={"center"} 
                                                    alignY="center" 
                                                    marginLeft={"10px"} 
                                                    borderRadius={"2"} 
                                                    width={"110px"} 
                                                    backgroundColor="btn" 
                                                    cursor={"pointer"} 
                                                    onClick = {onClearItems}
                                                >
                                                    <Text fontSize={"100"} color="#2E6FD3">
                                                        Limpiar todo
                                                    </Text>
                                                </Box>
                                            </Box>
                                        </Fragment>
                                    )
                                }
                            </Box>
                            <Scrollbars 
                                renderTrackHorizontal= { props => 
                                    <Box {...props} style={{display: 'none'}} className="track-horizontal"
                                />}
                                style={{ 
                                    height: "300px" ,
                                    overflowX: 'hidden'
                                }}
                            >
                                {viewingPanel !== 'client-panel' 
                                    ? (
                                        <Fragment>
                                            {checkoutList.map((item, key) => (
                                                <CheckoutListItem 
                                                    item={item} 
                                                    key={key} 
                                                    id={key}
                                                />
                                            ))}
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {clients.map( client => (
                                                <ClientCheckout 
                                                    item={client} 
                                                    key={client.id}  
                                                    setClient={onSelectClient} 
                                                    selected = { client.id === currentClient?.id }
                                                />
                                            ))}
                                        </Fragment>
                                    )
                                }
                            </Scrollbars>
                        </Columns.Column>
                        <Columns.Column spread = {5} height = "100s%">
                            <Box width = "100%" height = "100%" backgroundColor = "primary">
                                <Box padding = "major-2" display = "flex" justifyContent = "space-between" >
                                    <Text color = "white">
                                        Total: $ { getOrderTotal(checkoutList,0) }
                                    </Text>
                                    <Button 
                                        borderRadius="2" 
                                        width="42px" 
                                        backgroundColor="btn" 
                                        cursor="not-allowed"
                                        onClick={() => console.log("disabled")} 
                                    >
                                        <Main3horizontalIcon color="#2E6FD3" />
                                    </Button>
                                </Box>
                                <Set padding = "major-2">
                                    {paymentMethods.map((item, key) => (
                                        <PaymentMethodItem 
                                            item = {item} 
                                            key = {key} 
                                            selected = {currentPaymentMethod === item.methods}
                                            onSelect = {onSelectPaymentMethod}
                                        />
                                    ))}
                                </Set>
                                <Box padding = "major-2">
                                    <Button palette = "white" onClick = {onBilling}>
                                        Facturar
                                    </Button>
                                </Box>
                            </Box>
                        </Columns.Column>
                    </Columns>
                ) : (
                    <Columns width = "100%" backgroundColor = "body" isGapless>
                        <Columns.Column spread = {7} padding = "major-2" width = "100%">
                            <Box display = "flex" justifyContent = "space-between" width = "100%">
                                <Box display = "flex" alignY = "center">
                                    <Box 
                                        use = {Button}
                                        size = "medium"
                                        onClick = {() => {
                                            setCollapsed(false);
                                        }}
                                    >
                                        <Icon icon= {faChevronDown} type = "font-awesome" color = "white" />
                                    </Box>  
                                    <Text display = "flex" marginLeft = "major-2" display = "flex" alignItems = "center">
                                        Orden actual    
                                    </Text>                          
                                </Box>
                                <Box  display = "flex" alignItems = "center">
                                    <Text>
                                        Items: {checkoutList.length}
                                    </Text>
                                </Box>
                                <Box display = "flex" alignItems = "center">
                                    <Button size = "medium" onClick = {onBilling}>
                                        Facturar
                                    </Button>
                                </Box>
                            </Box>
                        </Columns.Column>
                        <Columns.Column spread = {5}>

                        </Columns.Column>
                    </Columns>
                )
            }
        </Box>
    );
}

const PaymentMethodItem = ({item , selected , onSelect }) => {
    return (
        <Box 
            borderRadius="2" 
            width="72px" 
            height="72px" 
            alignX="center" 
            alignY="center" 
            onClick= {() => {
                if(typeof onSelect === "function"){
                    onSelect(item.methods)
                }
            }} 
            backgroundColor = { selected ? "secondary" : null } 
            border= { selected ? null : "1px solid #FFB800" } 
            cursor= "pointer"
         >
            <Box>
                { selected ? item.icon : item.iconActive}
            </Box>
            <Text color={ selected ? "primary" : "secondary"} fontSize = "10px">
                {item.methods}
            </Text>
        </Box>
    )
}


const getTotalFromList = (products) => {
    var subtotal = 0;
    products.map((item) => {
        subtotal = subtotal + item["total"];
        return item;
    });
    return subtotal;
}

const getOrderTotal = (checkoutList,discount) => {
    return Math.ceil(
        getTotalFromList(checkoutList) - ( getTotalFromList(checkoutList) * (discount / 100) ) 
    ) || 0
}


/*
const SummaryOrderPanel = () => {
    return (
        <Box color="white" >
            <Box borderRadius={"2"} backgroundColor="body">
                <Box height={"auto"}>
                    <Box borderRadius={"2"} height={"100%"} backgroundColor="body" padding={"15px 30px 30px 30px"} color="white">
                        <Flex>
                            {panelOption === "client" ?
                                <>
                                    <Box alignX={"center"} alignY="center" borderRadius={"2"} width={"48px"} backgroundColor="btn" onClick={() => setPanelOption("")} cursor={"pointer"} >
                                        <Icon icon="chevron-left" color="#2E6FD3" />
                                    </Box>

                                    <TextField placeholder={"Buscar"} marginLeft={"auto"} icon={"search"} />
                                    {client.name ?
                                        <Box alignX={"center"} alignY="center" marginLeft={"20px"} borderRadius={"2"} onClick={() => setClient({})} cursor={"pointer"} >
                                            <Icon icon="close" color="red" />
                                        </Box> : null}
                                </>

                                : <>
                                    <Text fontSize={"200"} color="primary">
                                        Orden Actual
                                    </Text>
                                    <Box alignX={"center"} alignY="center" marginLeft={"auto"} borderRadius={"2"} width={"40px"} backgroundColor="btn" onClick={() => setPanelOption("client")} cursor={"pointer"} >
                                        <Icon icon="client" color="#2E6FD3" />
                                    </Box>
                                    <Box alignX={"center"} alignY="center" marginLeft={"10px"} borderRadius={"2"} width={"110px"} backgroundColor="btn" onClick={() => emptyList()} cursor={"pointer"} >
                                        <Text fontSize={"100"} color="#2E6FD3">
                                            Limpiar todo
                                        </Text>
                                    </Box>
                                </>}

                        </Flex>
                        <Scrollbars style={{ height: "380px" }}>
                            {panelOption === "client" ?
                                <>
                                    <Box borderRadius={"2"} backgroundColor="body">
                                        <Flex>
                                            <Box alignY="center" width="auto" height="42px">
                                                <Text color="primary" fontSize="100">
                                                    Nombre
                                                </Text>
                                            </Box>
                                            <Box marginLeft="auto" alignY="center" width="auto" height="42px">
                                                <Text color="primary" fontSize="100">
                                                    Rut
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Box>
                                    <Box backgroundColor="gray100" height="2px" width="100%" />
                                    {clients.map((item, key) => (<ClientCheckout item={item} key={key} setClient={setClient} client={client} />))}

                                </> :
                                <>
                                    {checkoutList.map((item, key) => (
                                        <CheckoutListItem item={item} key={key} id={key} removeProducList={removeProducList} operationQuantity={operationQuantity} discountProduct={discountProduct} />
                                    ))}
                                </>}
                        </Scrollbars>

                    </Box>
                </Box>
                {options ? <MoreOptions close={close} /> : null}
                <Box borderRadius={"2"} height={"auto"} backgroundColor="primary" padding={"30px"} color="white">
                    <Flex>
                        <Text fontSize={"300"} color="white">
                            Total: {`$ ${Math.ceil(totalOrder(checkoutList) - (totalOrder(checkoutList) * (desc / 100))) || 0}`}
                        </Text>
                        <Box alignX={"center"} alignY="center" marginLeft={"auto"} borderRadius={"2"} width={"42px"} backgroundColor="btn" onClick={() => console.log("disabled")} cursor={"not-allowed"} >
                            <Main3horizontalIcon color={"#2E6FD3"} />
                        </Box>
                    </Flex>
                    <Columns isGapless>
                        {paymentMethods.map((item, key) => (
                            <Box key={key} borderRadius={"2"} marginRight="16px" marginTop="2%" width={"72px"} height={"72px"} alignX={"center"} alignY="center" onClick={() => handlechangePayMethods(item.methods)} backgroundColor={payMethods === item.methods ? "secondary" : null} border={payMethods === item.methods ? null : "1px solid #FFB800"} cursor={"pointer"} >
                                <Box>
                                    {payMethods === item.methods ? item.icon : item.iconActive}
                                </Box>
                                <Text color={payMethods === item.methods ? "primary" : "secondary"} style={{ fontSize: "10px" }}>
                                    {item.methods}
                                </Text>
                            </Box>)
                        )}
                    </Columns>
                    <Box alignX={"right"} onClick={() => { modal.show(); setScena(true); }} cursor={"pointer"} >
                        <Text fontSize={"200"} color="secondary">
                            Dar descuento
                        </Text>
                    </Box>
                    <Box width={"100%"}>
                        <Button use={Link} disabled={!checkoutList.length > 0 && !client.length > 0} width={"100%"} onClick={() => {
                            const date = DateTime.now().toLocaleString(
                                DateTime.DATE_FULL);
                            setInvoice({
                                checkoutList,
                                payMethods,
                                client,
                                date: date,
                                discount: desc,
                                total: Math.ceil(totalOrder(checkoutList) - (totalOrder(checkoutList) * (desc / 100)))
                            });
                            saveBills({
                                date: date,
                                payment_method: payMethods,
                                client_id: client?.id,
                                discount: desc,
                                total: Math.ceil(totalOrder(checkoutList) - (totalOrder(checkoutList) * (desc / 100))),
                                checkoutList: checkoutList,
                            }).then(() => {
                                history.push(`${match.url}/invoice`);
                            });
                        }} palette="white" isLoading={isMutatingBill}>
                            Facturar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}*/

export default POSView;

