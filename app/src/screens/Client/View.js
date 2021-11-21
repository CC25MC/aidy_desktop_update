import { Box, Flex, Text, Icon, useToasts, Pagination, Select, DropdownMenu, Button, Modal, Card } from "bumbag";
import { AdminLayout, Header } from "components";
import { ExportExcel, LoaderManager, Dropzone } from "components/molecules";
import { useClients, useDeleteClients, clientAtom } from "hooks/models/useClients";
import { Switch, Route, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { ClientForm } from "./ClientForm";
import { useAtom } from 'jotai';
import { usePagination } from "hooks";
import { Fragment, useEffect } from "react";
import { useImportClientsMutation } from "hooks/useClient";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { readExcelFile } from "utils";

const ItemClient = ({ item, deleteClient, setClient }) => {
    const toasts = useToasts();
    const actionDelete = (item) => {
        deleteClient({ clientId: item.id });
        toasts.success({
            title: 'Cliente Eliminado',
            message: `Se ha eliminado correctamente el cliente ${item.name}`
        });
    };
    return <>
        <Box padding="10px" alignY="center">
            <Flex >
                <Box marginLeft="auto" alignY="center" width="150px" height="42px">
                    <Text fontSize="300">
                        {item.name}
                    </Text>
                </Box>
                <Box marginLeft="auto" alignY="center" width="150px" height="42px" >
                    <Text fontSize="300">
                        {item.lastname}
                    </Text>
                </Box>
                <Box marginLeft="auto" alignY="center" width="150px" height="42px">
                    <Text fontSize="300">
                        {item.rut}
                    </Text>
                </Box>
                <Box marginLeft="auto" alignY="center" width="150px" height="42px" >
                    <Text fontSize="300">
                        {item.phone}
                    </Text>
                </Box>
                <Box marginLeft="auto" width="150px" height="42px" >
                    <Flex>
                        <Link to="/client/editar" style={{ marginLeft: "auto" }} onClick={() => {
                            setClient(item);
                        }}>
                            <Box alignX={"center"} alignY="center" borderRadius={"2"} width={"42px"} height="42px" backgroundColor="btn" cursor={"pointer"} >

                                <Icon icon="edit" />
                            </Box>

                        </Link>
                        <Box alignX={"center"} alignY="center" marginLeft="auto" borderRadius={"2"} width={"42px"} height="42px" backgroundColor="btn" onClick={() => actionDelete(item)} cursor={"pointer"} >
                            <Icon icon="delete" />
                        </Box>
                    </Flex>

                </Box>
            </Flex>
        </Box>
        <Box backgroundColor="gray100" height="2px" width="100%" />
    </>;
};

const PosView = ({ formInitialValues, formValidation }) => {
    const match = useRouteMatch();
    const { data: clients } = useClients();
    const { mutate: deleteClient } = useDeleteClients();
    const { mutate : importClients, isLoading : isImportingClients, data, reset } = useImportClientsMutation();
    //eslint-disable-next-line
    const [client, setClient] = useAtom(clientAtom);
    const modal = Modal.useState();
    const {
        data: paginatedClients,
        pageIndex,
        resultsPerPageOptions,
        resultsPerPage,
        setResultsPerPage,
        gotoPage,
        totalPages,
        search
    } = usePagination({
        data: clients,
        searchBy: ["name", "lastname", "rut"]
    });

    useEffect( () => {
        if(data){
            modal.hide();
        }
    } , [data]);

    return (
        <AdminLayout>
            <Header
                title="Clientes"
                action="Añadir Clientes"
                actions={(
                    <Fragment>
                        <Button iconAfter="chevron-right" use={Link} to={`${match.url}/agregar`}>
                            Agregar
                        </Button>
                        <DropdownMenu
                            menu={
                                <DropdownMenu.Group title="Actions">
                                    <DropdownMenu.Item color = "#fff" _hover = {{
                                        color: "#000"
                                    }} onClick = {() => {
                                        reset();
                                        modal.show();
                                    }}>
                                        Importar
                                    </DropdownMenu.Item>
                                    <ExportExcel
                                        data = {clients}
                                        name = "Clientes"
                                        keys = {{
                                            id: "ID",
                                            name: "Nombre",
                                            lastname: "Apellido",
                                            phone: "Telefono",
                                            whatsapp: "Whatsapp",
                                            address: "Direccion",
                                            rut: "rut"
                                        }}
                                        button = {(
                                            <DropdownMenu.Item color = "#fff" _hover = {{
                                                color: "#000"
                                            }}>
                                                Exportar
                                            </DropdownMenu.Item>
                                        )}
                                    />
                                    <DropdownMenu.Item color = "#fff" _hover = {{
                                        color: "#000"
                                    }} onClick = {() => {
                                        reset();
                                        modal.show();
                                    }}>
                                        Modificar
                                    </DropdownMenu.Item>
                                </DropdownMenu.Group>
                            }
                        >
                            <Button>
                                <Icon icon = {faEllipsisV} type = 'font-awesome' />
                            </Button>
                        </DropdownMenu>
                    </Fragment>
                )}
            />
            <Modal {...modal} style={{
                minWidth: 460
            }}>
                <Card
                    title="Cargar archivo"
                    headerAddon={
                        <Modal.Disclosure {...modal} use={Button.Close}/>
                    }
                >
                    <Box height="360px">
                        <LoaderManager
                            title = "Espera..."
                            subTitle = "Estamos importando tus productos"
                            show = {isImportingClients}
                        >
                            <Dropzone
                                onChange = {(files) => {
                                    readExcelFile(files[0]).then( data => {
                                        importClients({ clients: data });
                                    });
                                }}
                                accept = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                label = "arrastra tu archivo excel aqui o haz click en el recuadro para cargarlo"
                            />
                        </LoaderManager>
                    </Box>
                </Card>
            </Modal>
            <Switch>
                <Route path={match.path} exact >
                    <Box minHeight="90%" padding="major-2">
                        {/* <Box alignX="right">
                                <Input width="400px" label="Buscar" type="search" />
                            </Box> */}

                        <Box backgroundColor="primary" marginTop="20px" height="2px" width="100%" />

                        <Flex padding="10px" marginTop="10px">
                            <Box marginLeft="auto" width="150px" fontSize="300">
                                <Text>
                                    Nombre
                                </Text>
                            </Box>
                            <Box marginLeft="auto" width="150px" fontSize="300">
                                <Text>
                                    Apellido
                                </Text>
                            </Box>
                            <Box marginLeft="auto" width="150px" fontSize="300">
                                <Text>
                                    Rut
                                </Text>
                            </Box>
                            <Box marginLeft="auto" width="150px" fontSize="300">
                                <Text>
                                    Teléfono
                                </Text>
                            </Box>
                            <Box marginLeft="auto" width="150px" fontSize="300" />
                        </Flex>
                        <Box backgroundColor="gray100" marginTop="5px" height="2px" width="100%" />

                        {paginatedClients.map((item, key) => (
                            <ItemClient item={item} key={key} deleteClient={deleteClient} setClient={setClient} />))
                        }
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
                                    options={resultsPerPageOptions.map(opt => ({
                                        label: opt,
                                        value: opt
                                    }))}
                                />
                            </Flex>
                        </Box>

                    </Box>

                </Route>
                <Route path={`${match.path}/agregar`}>
                    <ClientForm formInitialValues={formInitialValues} formValidation={formValidation} />
                </Route>
                <Route path={`${match.path}/editar`}>
                    <ClientForm formInitialValues={formInitialValues} formValidation={formValidation} />
                </Route>
            </Switch>


        </AdminLayout>
    );
};
export default PosView;

