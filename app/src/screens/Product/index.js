import React from 'react';
import { Actions } from "./Actions";
import ProductView from "./View";

const ProductContainer = ({ ...props }) => {
	const actions = Actions();
	return <ProductView {...props} {...actions} />;
};

export default ProductContainer;
