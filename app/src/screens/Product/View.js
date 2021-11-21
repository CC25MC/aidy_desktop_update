import React , {Fragment, useEffect, useState} from "react";
import { AdminLayout, Header, ProductCard } from "components";
import { Switch as RouterSwitch, Route, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { 
    Box, 
    Set, 
    Icon, 
    useToasts, 
    Pagination, 
    Flex, 
    Select, 
    Tabs, 
    DropdownMenu,
    Card,
    Modal,
    Button,
    Text,
    Stack,
    Switch,
    Disclosure
} from 'bumbag';
import { useProducts, useDeleteProducts, productAtom } from "hooks/models/useProducts";
import { useAtom } from 'jotai';
import { usePagination } from "hooks";
import { ProductForm } from './components/ProductForm';
import { ProductStock } from './components/ProductStock';
import { MovementHistory } from "./components/MovementHistory";
import { AllSuppliers } from "./components/AllSuppliers";
import { SupplierForm } from "./components/SupplierForm";
import { faEllipsisV, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Dropzone, LoaderManager, ExportExcel } from "components/molecules";
import { readExcelFile } from "utils";
import { useCreateMultipleProductsMutation, useImportProductsMutation } from "hooks/models/useProducts";
import { useSuppliers, useMutateSupplier } from "hooks/models/useSuppliers";
import { Formik } from 'formik';
import { TextField } from "components/formik";
import { productsFilters } from "utils/filters/products";

const ProductView = () => {
    const match = useRouteMatch();
    const { data: products } = useProducts();
    const { data: suppliers } = useSuppliers();
    const { mutateAsync : createProducts, isLoading : isCreatingProducts  } = useCreateMultipleProductsMutation();
    const { mutateAsync : createSupplier, isLoading : isCreatingSupplier  } = useMutateSupplier();
    const [ currentModel , setCurrentModel ] = useState(match.url);
    const { mutate : importProducts, isLoading : isImportingProducts, data, reset } = useImportProductsMutation();
    const modal = Modal.useState();
    const priceListModal = Modal.useState();
    const disclosure = Disclosure.useState();
    const [ selectedSupplier, setSelectedSupplier ] = useState(null);
    const {
        data : paginatedProducts,
        search,
        ...pagination
    } = usePagination({
        data: products,
        searchBy: ["name"],
        filters: [
            [ selectedSupplier , productsFilters.supplier ]
        ]
    });

    useEffect( () => {
        if(data){
            modal.hide();
        }
    } , [data]);

    return (
        <AdminLayout>
            <Header
                title="Productos"
                search = {search}
                actions={(
                    <Fragment>
                        <Button size = "small" iconAfter="chevron-right" use={Link} to={`${currentModel}/agregar`}>
                            Agregar
                        </Button>
                        <Disclosure {...disclosure} >
                            <Button size = "small">
                                <Icon icon = {faFilter} type = 'font-awesome' />
                            </Button>
                        </Disclosure>
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
                                        data = {products}
                                        name = "Productos"
                                        keys = {{
                                            id: "ID",
                                            name: "Nombre",
                                            price: "Precio",
                                            code: "Codigo",
                                        }}
                                        button = {(
                                            <DropdownMenu.Item color = "#fff" _hover = {{
                                                color: "#000"
                                            }}>
                                                Exportar
                                            </DropdownMenu.Item>
                                        )}
                                    />
                                    <DropdownMenu.Item 
                                        color = "#fff"
                                         _hover = {{
                                            color: "#000"
                                        }} 
                                        onClick = {() => {
                                            reset();
                                            modal.show();
                                        }}
                                    >
                                        Modificar
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item 
                                        color = "#fff" 
                                        _hover = {{
                                            color: "#000"
                                        }} 
                                        onClick = {() => {
                                            priceListModal.show();
                                        }}
                                    >
                                        Crear lista de precio
                                    </DropdownMenu.Item>
                                </DropdownMenu.Group>
                            }
                        >
                            <Button size = "small" >
                                <Icon icon = {faEllipsisV} type = 'font-awesome' />
                            </Button>
                        </DropdownMenu>
                    </Fragment>
                )}
            />
            <Disclosure.Content {...disclosure}>
                {!!suppliers.length && (
                    <Select
                        //containLabel = {true}
                        variant="filled"
                        //label = "Proveedores"
                        color = "#000"
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
            </Disclosure.Content>
            <Modal {...priceListModal} style = {{
                minWidth: 460
            }} >
                <Card
                    title="Nueva lista de precios"
                    headerAddon={
                        <Modal.Disclosure {...priceListModal} use={Button.Close}/>
                    }
                >
                    <Formik
                        initialValues = {{
                            name: '',
                            clone: true
                        }}
                        onSubmit = {async values => {
                            const { name, clone } = values;
                            const newSupplier = await createSupplier({ name });
                            if( clone ){
                                await createProducts({
                                    products: products.map( ({id,supplier,category,images, ...product}) => {
                                        return {
                                            data: {
                                                ...product,
                                                supplier_id: newSupplier.id,
                                                ...( category ? { category_id: category.id } : {} )
                                            },
                                            ...( images.length  
                                                ? { relations: {
                                                    images: images.map( ({ path, name }) => ({ path, name }) )
                                                } }
                                                : {}    
                                            ),
                                            include: {
                                                images: true,
                                                supplier: true,
                                                category: true
                                            }
                                        }
                                    })
                                })
                            }
                            priceListModal.hide();
                        }}
                    >
                        {({ handleSubmit, values, setFieldValue }) => {
                            return (
                                <Stack>
                                    <Text>
                                        Para crear una lista de precios 
                                        indica el nombre  del proveedor
                                    </Text>
                                    <Box marginTop = "major-2">
                                        <TextField name="name" label="Nombre Proveedor" />
                                    </Box>
                                    <Switch 
                                        checked = { values.clone }
                                        label="Clonar productos existentes" 
                                        onChange = { event => setFieldValue('clone',event.target.checked)}
                                    />
                                    <Button isLoading = { isCreatingProducts || isCreatingSupplier } onClick = {() => {
                                        handleSubmit();
                                    }}>
                                        Crear
                                    </Button>
                                </Stack>
                            )
                        }}
                    </Formik>
                </Card>
            </Modal>
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
                            show = {isImportingProducts}
                        >
                            <Dropzone
                                onChange = {(files) => {
                                    readExcelFile(files[0]).then( data => {
                                        importProducts({ products: data });
                                    });
                                }}
                                accept = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                label = "arrastra tu archivo excel aqui o haz click en el recuadro para cargarlo"
                            />
                        </LoaderManager>
                    </Box>
                </Card>
            </Modal>
            <RouterSwitch>
                <Route path={match.path} exact >
                    <Tabs defaultSelectedId = "products"  >
                        <Tabs.List>
                            <Tabs.Tab onClick = { () => { setCurrentModel(match.url) } } color = "#000" tabId = "products" > Productos </Tabs.Tab>
                            <Tabs.Tab color = "#000" tabId = "stock" > Stock </Tabs.Tab>
                            <Tabs.Tab color = "#000" tabId = "history" > Historial </Tabs.Tab>
                            <Tabs.Tab onClick = { () => { setCurrentModel(`${match.url}/proveedores`) } } color = "#000" tabId = "suppliers" > Proveedores </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel tabId = "products" >
                            <AllProducts
                                products = {paginatedProducts}
                                pagination = {pagination}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel tabId = "stock" >
                            <ProductStock 
                                products = {paginatedProducts}
                                pagination = {pagination}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel tabId = "history" >
                            <MovementHistory />
                        </Tabs.Panel>
                        <Tabs.Panel tabId = "suppliers" >
                            <AllSuppliers />
                        </Tabs.Panel>
                    </Tabs>
                </Route>
                <Route path={`${match.path}/agregar`}>
                    <ProductForm />
                </Route>
                <Route path={`${match.path}/editar`}>
                    <ProductForm />
                </Route>
                <Route path={`${match.path}/proveedores/agregar`}>
                    <SupplierForm/>
                </Route>
            </RouterSwitch>
        </AdminLayout>
    );
};

const AllProducts = ({ products : paginatedProducts, pagination }) => {
    //eslint-disable-next-line
    const [product, setProduct] = useAtom(productAtom);
    const toasts = useToasts();
    const { mutate: deleteProducts } = useDeleteProducts();
    const {
        pageIndex,
        gotoPage,
        setResultsPerPage,
        resultsPerPageOptions,
        resultsPerPage,
        totalPages,
    } = pagination;

    const actionDelete = (item) => {
        deleteProducts({ productId: item.id });
        toasts.success({
            title: 'Producto Eliminado',
            message: `Se ha eliminado correctamente el producto ${item.name}`
        });
    };

    return (
        <Fragment>
            <Box minHeight="90%" padding="major-2">
                <Set>
                    {paginatedProducts.map(product => (
                        <ProductCard
                            item={product}
                            key={product.id}
                            actions={{
                                label: 'Opciones',
                                top: (
                                    <Link to="/productos/editar" onClick={() => {
                                        setProduct(product);
                                    }}>
                                        <Box
                                            width="100%"
                                            marginAuto
                                            textAlign="center"
                                            use="button"
                                            display="flex"
                                            justifyContent="center"
                                        >
                                            <Icon icon="edit" fontSize="300" color="white" />
                                        </Box>
                                    </Link>
                                ),
                                bottom: (
                                    <Box cursor="pointer" role="button" width="100%" marginAuto textAlign="center" use="button" display="flex" justifyContent="center" onClick={() => {
                                        actionDelete(product);
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
                        onChangePage={page => gotoPage(page - 1)}
                        numberOfPages={totalPages}
                    />
                    <Select
                        onChange={e => {
                            setResultsPerPage(e.target.value)
                        }}
                        value={resultsPerPage}
                        options={resultsPerPageOptions.map( opt => ({
                            label: opt,
                            value: opt
                        }))}
                    />
                </Flex>
            </Box>
        </Fragment>
    )
}


export default ProductView;

