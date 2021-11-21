const supplierFilter = (data,state) => {
    const { value : selectedSupplier } = state;
    if(!selectedSupplier) {
        return true;
    }

    return  data.supplier?.name === selectedSupplier?.name;
};

const productsFilters = {
    supplier: supplierFilter
}

export { productsFilters };