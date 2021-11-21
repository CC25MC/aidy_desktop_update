import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { Box, Flex, Pagination, Select, Icon, Text } from 'bumbag';
import { useStockMovements } from 'hooks/models/useStockMovements';
import { usePagination } from "hooks";
import { Fragment } from 'react';
import { ListTile } from 'components/tiles/ListTile';
import dayjs from 'dayjs';

const MovementHistory = () => {
    const { data : history } = useStockMovements();

    const {
        pageIndex,
        gotoPage,
        setResultsPerPage,
        resultsPerPageOptions,
        resultsPerPage,
        totalPages,
        data : paginatedHistory
    } = usePagination({
        data: history,
        searchBy: ["name"]
    });

    return (
        <Fragment>
            <Box>
                { paginatedHistory.map( movement => (
                    <ListTile 
                        key = {movement.id}
                        title = {`${ movement.type === 'ENTRADA' ? 'Entrada' : 'Salida' } de ${movement.product_name} : ${movement.quantity}`}
                        subTitle = {`#${movement.id} - ${dayjs(movement.date).format('DD/MM/YYYY')}`}
                        leading = {(
                            <Box paddingX = "major-2">
                                <Icon 
                                    fontSize = "400" 
                                    icon = { movement.type === 'ENTRADA' ? faLongArrowAltUp : faLongArrowAltDown } 
                                    color = { movement.type === 'ENTRADA' ? 'green' : 'red' }
                                    type = 'font-awesome' 
                                /> 
                            </Box>
                        )}
                        content = {(
                            <Fragment>
                                <Text display = "block">
                                    Saldo
                                </Text>
                                <Text display = "block" fontSize = "12px" >
                                    { movement.balance }
                                </Text>
                            </Fragment>
                        )}
                    />
                ))}
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

export { MovementHistory };