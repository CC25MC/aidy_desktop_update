import { AdminLayout, Header, BoletaCard } from "components";
import { 
    Stack, 
    Box, 
    Set, 
    Icon, 
    Pagination, 
    Select, 
    Flex, 
    Modal, 
    Card, 
    Text, 
    Input, 
    Button, 
    Spinner,
    Disclosure,
    Divider
} from 'bumbag';
import { Switch, Route, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BoletaForm } from "./BoletaForm";
import { useTickets, useBills, useClients, } from "hooks/models";
import { useProducts } from "hooks/models/useProducts";
import { useAsync, useNuxo, usePagination } from "hooks";
import { useAuth } from "hooks/useClient";
import { ClientTile, ProductTile } from "components/molecules";
import { paymentMethods } from "variables";
import { PaymentTypeTile } from "components/molecules";
import { DateRange } from 'react-date-range';
import { es } from 'date-fns/locale';
import dayjs from 'dayjs';
import { historyFilters } from "utils/filters";
import { ExportExcel } from "components/molecules";

const DEFAULT_FORMAT = "MMM DD YYYY";

const HistoryView = () => {
    const [boleta, setBoleta] = useState({});
    const { cancelBoleta } = useNuxo();
    const { user } = useAuth();
    const { run, isLoading } = useAsync();
    const match = useRouteMatch();
    // const { data: tickets } = useTickets();
    const { data: bill } = useBills();
    const { data: clients } = useClients();
    const { data: products } = useProducts();
    const [ticketToCancel, setTicketToCancel] = useState(null);
    const [companyRut, setCompanyRut] = useState("");
    const modal = Modal.useState();
    const filtersModal = Modal.useState();

    const [selectedClient, setSelectedClient ] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [selectedProduct, setSelectedProduct ] = useState(null);
    const [selectionRange, setSelectionRange] = useState({
        startDate: null,
        endDate: null,
        key: 'selection',
    });
    
    const { 
        data : paginatedBills, 
        pageIndex, 
        resultsPerPageOptions, 
        resultsPerPage,
        setResultsPerPage,
        gotoPage, 
        totalPages,
        search 
    } = usePagination({
        data: bill,
        searchBy: ["ticket.id","id"],
        filters: [
            [ selectedClient , historyFilters.client ],
            [ selectedPaymentMethod, historyFilters.paymentMethod ],
            [ selectionRange , historyFilters.date ],
            [ selectedProduct , historyFilters.products ]
        ]
    });

    return (
        <AdminLayout>
        <Header
            title="Historial"
            search = {search}
            actions = {(
                <Set>
                    <Box 
                        alignX={"center"} 
                        alignY="center" 
                        marginLeft="10px" 
                        borderRadius={"2"} 
                        backgroundColor="btn" 
                        use = {Button}
                        onClick = {
                            () => {
                                filtersModal.show();
                            }
                        }
                    >
                        <Icon icon={"filter"} fontSize="400" color="#2E6FD3" />
                    </Box>
                    <ExportExcel
                        data = {bill}
                        name = "Historico"
                        keys = {{
                            id: "ID",
                            date: 'fecha',
                            payment_method: 'Metodo de pago',
                            client: {
                                label: 'Cliente',
                                value: (data) => data.client 
                                    ? `${data.client?.name} ${data.client?.lastname}`
                                    : ""
                            },
                            total: "Total",
                            discount: "Descuento"
                        }}
                        button = {(
                            <Box 
                                alignX={"center"} 
                                alignY="center" 
                                marginLeft="10px" 
                                borderRadius={"2"} 
                                backgroundColor="btn" 
                                use = {Button}
                            >
                                <Icon icon={"download"} fontSize="400" color="#2E6FD3" />
                            </Box>
                        )}
                    />
                </Set>
            )}
        />
        <Switch>
            <Route path={match.path} exact >
                <Modal {...modal} style={{
                    minWidth: 460
                }}>
                    <Card
                        title="Anular Boleta"
                        footer={(
                            <Set>
                                <Button disabled={!companyRut} onClick={() => {
                                    const params = {
                                        user: user.rut,
                                        password: user.passwordEboleta,
                                        rut: user.rut,
                                        certificatePassword: "",
                                        total: ticketToCancel.total,
                                        folio: ticketToCancel.folio,
                                        companyRut
                                    };
                                    run(cancelBoleta(params));
                                }}>
                                    Culminar anulacion
                                </Button>
                            </Set>
                        )}
                        headerAddon={
                            <Modal.Disclosure onClick={() => {
                                modal.hide();
                                setTicketToCancel(null);
                            }} use={Button.Close}>Close</Modal.Disclosure>
                        }
                    >
                        {!isLoading ? (
                            <Stack spacing="major-2">
                                <Text>
                                    Ingrese el rut de la empresa
                                    para poder anular su boleta
                                </Text>
                                <Input value={companyRut} placeholder="Rut de la empresa" onChange={(e) => {
                                    setCompanyRut(e.target.value);
                                }} />
                            </Stack>
                        ) : (
                            <Stack spacing="major-2" alignX="center">
                                <Spinner />
                                <Text>
                                    Cancelando boleta...
                                </Text>
                            </Stack>
                        )}
                    </Card>
                </Modal>
                
                <Modal {...filtersModal} style = {{
                    minWidth: 560,
                }}>
                    <Card
                        height = "560px"
                        overflowY = "scroll"
                        title="Filtrar por"
                        headerAddon={
                            <Modal.Disclosure onClick={() => {
                                filtersModal.hide();
                            }} use={Button.Close}>Close</Modal.Disclosure>
                        }
                    >
                        <Disclosure.State >
                            <Disclosure width="100%">
                                <Box marginTop="15px" cursor={"pointer"} paddingY = "major-2">
                                    <Flex justifyContent = "space-between" alignY = "center">
                                        <Text fontSize={"14px"} fontWeight="semibold" color="primary">
                                            Cliente
                                        </Text>
                                        {selectedClient && (
                                            <Box borderRadius = "6px" backgroundColor = "btn" padding = "4px 8px">
                                                <Set>
                                                    <Text display = "block" color="#2E6FD3" fontSize = "14px">
                                                        {selectedClient.name} {selectedClient.lastname}
                                                    </Text>
                                                    <Button.Close onClick = {() => {
                                                        setSelectedClient(null);
                                                    }} />
                                                </Set>
                                            </Box>
                                        )}
                                    </Flex>
                                    <Divider marginTop="15px" backgroundColor="primary" />
                                </Box>
                            </Disclosure>
                            <Disclosure.Content>
                                <Box>
                                    {clients.map( (client, key) => (
                                        <ClientTile  
                                            item = {client} 
                                            key = {key} 
                                            onClick = {() => {
                                                setSelectedClient(client);
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Disclosure.Content>
                        </Disclosure.State>
                        <Disclosure.State >
                            <Disclosure width="100%">
                                <Box marginTop="15px" cursor={"pointer"}>
                                    <Flex justifyContent = "space-between" alignY = "center" >
                                        <Text fontSize={"14px"} fontWeight="semibold" color="primary">
                                            Fecha
                                        </Text>
                                        { (selectionRange.endDate && selectionRange.startDate) && (
                                            <Box borderRadius = "6px" backgroundColor = "btn" padding = "4px 8px">
                                                <Set>
                                                    <Text display = "block" color="#2E6FD3" fontSize = "14px">
                                                        { dayjs(selectionRange.startDate).format(DEFAULT_FORMAT) } - { dayjs(selectionRange.endDate).format(DEFAULT_FORMAT) }
                                                    </Text>
                                                    <Button.Close onClick = {() => {
                                                        setSelectionRange({
                                                            startDate: null,
                                                            endDate: null,
                                                            key: 'selection',
                                                        })
                                                    }} />
                                                </Set>
                                            </Box>
                                        )}

                                    </Flex>
                                    <Divider marginTop="15px" backgroundColor="primary" />
                                </Box>
                            </Disclosure>
                            <Disclosure.Content>
                                <Box paddingY = "major-2" display = "flex" justifyContent = "center">
                                    <DateRange
                                        locale = {es}
                                        ranges={[selectionRange]}
                                        onChange={(item) => {
                                            setSelectionRange(item.selection);
                                        }}
                                    />
                                </Box>
                            </Disclosure.Content>
                        </Disclosure.State>
                        <Disclosure.State >
                            <Disclosure width="100%">
                                <Box marginTop="15px" cursor={"pointer"} paddingY = "major-2">
                                    <Flex justifyContent = "space-between" alignY = "center">
                                        <Text fontSize={"14px"} fontWeight="semibold" color="primary">
                                            Tipo de pago
                                        </Text>
                                        {selectedPaymentMethod && (
                                            <Box borderRadius = "6px" backgroundColor = "btn" padding = "4px 8px">
                                                <Set>
                                                    <Text fontSize = "14px" color="#2E6FD3">
                                                        {selectedPaymentMethod.methods}
                                                    </Text>
                                                    <Button.Close onClick = {() => {
                                                        setSelectedPaymentMethod(null);
                                                    }} />
                                                </Set>
                                            </Box>
                                        )}
                                    </Flex>
                                    <Divider marginTop="15px" backgroundColor="primary" />
                                </Box>
                            </Disclosure>
                            <Disclosure.Content>
                                <Box>
                                    {paymentMethods.map( item => (
                                        <PaymentTypeTile  
                                            item = {item} 
                                            key = {item.id} 
                                            onClick = {() => {
                                                setSelectedPaymentMethod(item)
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Disclosure.Content>
                        </Disclosure.State>
                        <Disclosure.State >
                            <Disclosure width="100%">
                                <Box marginTop="15px" cursor={"pointer"} paddingY = "major-2">
                                    <Flex justifyContent = "space-between" alignY = "center">
                                        <Text fontSize={"14px"} fontWeight="semibold" color="primary">
                                            Productos
                                        </Text>
                                        {selectedProduct && (
                                            <Box borderRadius = "6px" backgroundColor = "btn" padding = "4px 8px">
                                                <Set>
                                                    <Text fontSize = "14px" color="#2E6FD3">
                                                        {selectedProduct.name}
                                                    </Text>
                                                    <Button.Close onClick = {() => {
                                                        setSelectedProduct(null);
                                                    }} />
                                                </Set>
                                            </Box>
                                        )}
                                    </Flex>
                                    <Divider marginTop="15px" backgroundColor="primary" />
                                </Box>
                            </Disclosure>
                            <Disclosure.Content>
                                <Box>
                                    {products.map( item => (
                                        <ProductTile  
                                            item = {item} 
                                            key = {item.id} 
                                            onClick = {() => {
                                                setSelectedProduct(item)
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Disclosure.Content>
                        </Disclosure.State>
                    </Card>
                </Modal>
                
                <Box height="81vh">
                    <Box padding="major-2" minHeight = "90%">
                        <Set>
                            {paginatedBills.map(bolet => (
                                <BoletaCard
                                    boletOffline = {bolet.history}
                                    item={bolet}
                                    key={bolet.id}
                                    actions={{
                                        label: 'Opciones',
                                        top: (
                                            <Link to="/history/view" onClick={() => {
                                                setBoleta(bolet);
                                            }}>
                                                <Box
                                                    width="100%"
                                                    marginAuto
                                                    textAlign="center"
                                                    use="button"
                                                    display="flex"
                                                    justifyContent="center"
                                                >
                                                    <Icon icon="view" fontSize="300" color="white" />
                                                </Box>
                                            </Link>
                                        ),
                                        bottom: (
                                            <Box cursor="pointer" role="button" width="100%" marginAuto textAlign="center" use="button" display="flex" justifyContent="center" onClick={() => {
                                                setTicketToCancel(bolet);
                                                setCompanyRut("");
                                                modal.show();
                                            }}>
                                                <Icon icon="delete" fontSize="300" color="white" />
                                            </Box>
                                        )
                                    }}
                                />
                            ))}
                        </Set>
                    </Box>
                    <Box alignX="center" alignY="bottom">
                        <Flex>
                            <Pagination
                                nextText="Siguiente"
                                previousText="Atrás"
                                currentPage={pageIndex + 1}
                                onChangePage={ page => gotoPage(page - 1)}
                                numberOfPages={totalPages}
                            />
                            <Select
                                onChange={e => {
                                    console.log(e.target.value);
                                    setResultsPerPage(e.target.value);
                                }}
                                value={resultsPerPage}
                                options={resultsPerPageOptions.map( opt => ({
                                    label: opt,
                                    value: opt
                                }))}
                            />
                        </Flex>
                    </Box>
                </Box>
            </Route>
            <Route path={`${match.path}/view`}>
                <BoletaForm item={boleta} />
            </Route>
        </Switch>
    </AdminLayout>
    );
};
export default HistoryView;