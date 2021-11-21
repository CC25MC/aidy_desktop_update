import { Fragment } from 'react';
import { Box, Flex, Pagination, Select, Set } from 'bumbag';
import { ProductTile } from 'components/tiles';

const ProductStock = ({ products : paginatedProducts , pagination }) => {
    const {
        pageIndex,
        gotoPage,
        setResultsPerPage,
        resultsPerPageOptions,
        resultsPerPage,
        totalPages,
    } = pagination;
    return (
        <Fragment>
            <Box minHeight="90%" padding="major-2">
                <Set>
                    {paginatedProducts.map(product => (
                        <ProductTile
                            item={product}
                            key={product.id}
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

export { ProductStock };