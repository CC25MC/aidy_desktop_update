import { useQuery, useMutation, useQueryClient } from "react-query";
import { atom, useAtom } from "jotai";
import { useConnected } from "hooks/useConnected";
import { persistState, getPersistedState } from "utils";
import { PERSISTOR_KEYS } from "variables";
import { useEffect } from 'react';

const billAtom = atom(0);
const billIdsAtom = atom(getPersistedState(PERSISTOR_KEYS.billIds) ?? []);

const useBillsId = () => {
    const [billsId, setBillsId] = useAtom(billAtom);
    const [billIds, setBillIds] = useAtom(billIdsAtom);

    useEffect(() => persistState(PERSISTOR_KEYS.billIds, billIds), [billIds]);

    const deletebillIds = () => {
        billIds.splice(0, 1);
    };
    return {
        billsId, setBillsId, billIds, setBillIds, deletebillIds
    };
};

const useBills = () => {
    const bookshelf = window.bookshelf;
    return useQuery(
        "bills",
        async () => {
            const result = await bookshelf.bills.findMany({
                withRelated: ['history', 'client', 'ticket']
            });
            return result;
        },
        {
            initialData: []
        }
    );
};

const useStockMovements = () => {
    const bookshelf = window.bookshelf;
    return useQuery(
        "stockMovements",
        async () => {
            const result = await bookshelf.stockMovements.findMany();
            return result;
        },
        {
            initialData: []
        }
    );
};

const useMutateBills = () => {
    const bookshelf = window.bookshelf;
    const { setBillsId, setBillIds, billIds } = useBillsId();
    const { connected } = useConnected();
    const queryClient = useQueryClient();
    return useMutation(
        async (form) => {
            //eslint-disable-next-line
            const clientQuery = {
                data: {
                    date: form.date,
                    discount: form.discount,
                    payment_method: form.payment_method,
                    client_id: form.client_id,
                    total: form.total,
                }
            };
            // check
            const result = await bookshelf.bills.create(clientQuery);
            setBillsId(result?.id);
            if (!connected) {
                setBillIds([...billIds, result?.id]);
            }

            const stockMovements = form.checkoutList.map(async (item) => {
                let newProductQuantity = parseInt( item.productQuantity ) - parseInt( item.quantity );

                if(!item.isFastSell){
                    await bookshelf.products.update({
                        where: {
                            id: item.id
                        },
                        data: {
                            quantity: newProductQuantity
                        }
                    });
                }
                const value = await bookshelf.stockMovements.create({
                    data: {
                        product_name: item.name,
                        quantity: item.quantity,
                        balance: newProductQuantity >= 0 ? newProductQuantity : 0,
                        price: item.price,
                        date: form.date, 
                        type: "SALIDA",
                        bill_id: result?.id,
                        product_id: item.product_id,
                        fast_sell: item.isFastSell ? 1 : 0
                    }
                });
                return value;
            });

            await Promise.all(stockMovements);

            return { result, stockMovements };
        }, {
            onSuccess: (data, variables) => {
                queryClient.setQueryData('products', old => {
                    return old.map( product => {
                        let soldProduct = variables.checkoutList.find( p => p.id === product.id );
                        if( soldProduct ){
                            return {
                                ...product,
                                quantity: parseInt( product.quantity ) - parseInt( soldProduct.quantity ) 
                            }
                        }
                        return product;
                    })
                })
            },
        }
    );
};

const useMutateStockMovements = () => {
    const bookshelf = window.bookshelf;
    return useMutation(
        async (form) => {
            //eslint-disable-next-line
            const clientQuery = {
                data: {
                    ...form
                }
            };
            const result = await bookshelf.stockMovements.create(clientQuery);
            return result;
        }
    );
};
export { useBills, useStockMovements, useMutateBills, useMutateStockMovements, useBillsId };