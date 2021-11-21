import { useAtom } from "jotai";
import { useState } from "react";
import { listArticles } from "variables";
import { useProducts } from "hooks/models/useProducts";
import { useToasts } from 'bumbag';
export const Actions = () => {
	const toasts = useToasts();
	const [checkoutList, setCheckoutList] = useAtom(listArticles);
	const [payMethods, setPayMethods] = useState("Debito");
	const [client, setClient] = useState({});
	const [options, setOptions] = useState(false);
	const { data: products } = useProducts();
	const data = products?.map(product => {
		product['hasImages'] = product?.images?.map(item => item?.path);
		return product;
	});
	const [invoice, setInvoice] = useState({
		checkoutList: [],
		client: {},
		payMethods: "",
		date: "",
	});
	const emptyList = () => {
		setCheckoutList([]);
	};
	const addProducList = (product) => {
		var newData;
		const resultado = checkoutList.find(item => item.name === product.name);

		if (resultado) {
			newData = checkoutList.map((item) => {
				if (item.name === product.name) {
					item["quantity"] = item["quantity"] + 1;
					item["total"] = item["price"] * item["quantity"];
					return item;
				}
				return item;
			});
		} else {
			newData = [
				...checkoutList,
				{
					id: product.id,
					productQuantity: product.quantity,
					name: product.name,
					price: product.price,
					hasImages: product.hasImages?.[0],
					quantity: 1,
					total: product.price,
					isFastSell: product.isFastSell,
					color: product.color,
					product_id: product.id
				}
			];
		}

		setCheckoutList(newData);
	};
	const discountProduct = (product, percentage) => {
		var newData;
		const resultado = checkoutList.find(item => item.name === product.name);
		if (resultado) {
			newData = checkoutList.map((item) => {
				if (item.name === product.name) {
					item["total"] = item["total"] - (item["total"] * (percentage / 100));
					return item;
				}
				return item;
			});
			setCheckoutList(newData);
		}
	};
	const removeProducList = (position) => {
		const newData = [
			...checkoutList.slice(0, position),
			...checkoutList.slice(position + 1),
		];
		setCheckoutList(newData);
	};
	const operationQuantity = (index, props, operation) => {
		const newData = checkoutList.map((item, key) => {
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
		setCheckoutList(newData);
	};
	const totalOrder = (product) => {
		var subtotal = 0;
		product.map((item) => {
			subtotal = subtotal + item["total"];
			return item;
		});
		return subtotal;
	};

	const handlechangePayMethods = (methods) => {
		setPayMethods(methods);
	};
	const enterPress = (event) => {
		if (event.keyCode === 13) {
			var code = event.target.value;
			const resultado = data.find(item => item.code === code);
			if (resultado) {
				const res = checkoutList.find(item => item.name === resultado.name);
				var newData;
				if (res) {
					newData = checkoutList.map((item) => {
						if (item.name === res.name) {
							item["quantity"] = item["quantity"] + 1;
							item["total"] = item["price"] * item["quantity"];
							return item;
						}
						return item;
					});
				} else {
					newData = [
						...checkoutList,
						{
							name: resultado.name,
							price: resultado.price,
							hasImages: resultado.hasImages[0],
							quantity: 1,
							total: resultado.price
						}
					];
				}

				setCheckoutList(newData);
			} else {
				toasts.danger({
					title: 'Codigo no encontrado',
					message: 'Asegurate de haber registrado el codigo correctamente'
				});
			}
		}
	};
	const open = () => setOptions(!options);
	const close = () => setOptions(false);

	return {
		checkoutList,
		data,
		payMethods,
		client,
		invoice,
		setInvoice,
		setCheckoutList,
		setClient,
		addProducList,
		handlechangePayMethods,
		emptyList,
		removeProducList,
		operationQuantity,
		totalOrder,
		options,
		open,
		close,
		enterPress,
		discountProduct
	};
};

