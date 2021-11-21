import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const clientFilter = (data,state) => {
    const { value : selectedClient } = state;
    if(!selectedClient){
        return true;
    }

    return data.client?.name === selectedClient?.name && 
        data.client?.lastname === selectedClient?.lastname
};

const dateFilter = (data,state) => {
    const { value : selectionRange } = state;
    if(selectionRange.endDate && selectionRange.startDate){
        return dayjs(data.date).isBetween( 
            dayjs(selectionRange.startDate).subtract(1,'day'), 
            dayjs(selectionRange.endDate).subtract(1,'day')
        );
    }
    return true;
}

const paymentMethodFilter = (data,state) => {
    const { value : paymentMethod } = state;
    if(paymentMethod){
        return data?.payment_method === paymentMethod.methods;
    }
    return true;
}

const productFilter = (data,state) => {
    const { value : product } = state;
    if(product){
        return data.history.filter( p => p.product_id === product.id ).length;
    }
    return true;
}

const historyFilters = {
    client: clientFilter,
    date: dateFilter,
    paymentMethod: paymentMethodFilter,
    products: productFilter
}

export { historyFilters };