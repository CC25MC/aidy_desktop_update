import { Box, Flex, Icon, Text, Pagination, Select, useToasts } from 'bumbag'
import { usePagination } from "hooks";
import { supplierAtom, useDeleteSuppliers, useSuppliers  } from 'hooks/models/useSuppliers';
import { useAtom } from 'jotai';
import { Link } from "react-router-dom";

const AllSuppliers = () => {
    const { data : suppliers } = useSuppliers();
    const {
        data: paginatedSuppliers,
        pageIndex,
        resultsPerPageOptions,
        resultsPerPage,
        setResultsPerPage,
        gotoPage,
        totalPages,
        search
    } = usePagination({
        data: suppliers,
        searchBy: ["name"]
    });
    return (
        <Box>
            <Box minHeight="90%" padding="major-2">
                <Box backgroundColor="primary" marginTop="20px" height="2px" width="100%" />
                <Flex padding="10px" marginTop="10px">
                    <Box marginLeft="auto" width="150px" fontSize="300">
                        <Text>
                            Nombre
                        </Text>
                    </Box>
                    <Box marginLeft="auto" width="150px" fontSize="300">
                        <Text>
                            Direccion
                        </Text>
                    </Box>
                    <Box marginLeft="auto" width="150px" fontSize="300">
                        <Text>
                            Telefono
                        </Text>
                    </Box>
                    <Box marginLeft="auto" width="150px" fontSize="300" />
                </Flex>
                <Box backgroundColor="gray100" marginTop="5px" height="2px" width="100%" />
                {paginatedSuppliers.map((item, key) => (
                    <SupplierItem item={item} key={key} />))
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
        </Box>
            
    );
}

const SupplierItem = ({ item }) => {
    const toasts = useToasts();
    const { mutate : deleteSupplier } = useDeleteSuppliers();
    const [ client , setSupplier ] = useAtom(supplierAtom) 
    const actionDelete = (item) => {
        deleteSupplier({ supplierId: item.id });
        toasts.success({
            title: 'Proveedor Eliminado',
            message: `Se ha eliminado correctamente el proveedor ${item.name}`
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
                        {item.address}
                    </Text>
                </Box>
                <Box marginLeft="auto" alignY="center" width="150px" height="42px">
                    <Text fontSize="300">
                        {item.phone}
                    </Text>
                </Box>
                <Box marginLeft="auto" width="150px" height="42px" >
                    <Flex>
                        <Link to="/productos/proveedores/agregar" style={{ marginLeft: "auto" }} onClick={() => {
                            setSupplier(item);
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

export { AllSuppliers };