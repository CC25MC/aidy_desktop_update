import {
	justifyContent,
	alignItems,
	marginVariant,
	paddingVariant,
	margin,
	padding,
	marginNegative,
} from "./Box.variants";
import { styled } from "stitches.config";
import React, { forwardRef } from "react";

const BaseBox = styled("div", {

	outline: 0,

	variants: {
		//margin
		margin: marginVariant,
		marginRight: margin.right,
		marginLeft: margin.left,
		marginBottom: margin.bottom,
		marginTop: margin.top,
		marginRightNegative: marginNegative.right,
		marginLeftNegative: marginNegative.left,
		marginBottomNegative: marginNegative.bottom,
		marginTopNegative: marginNegative.top,
		//padding
		padding: paddingVariant,
		paddingRight: padding.right,
		paddingLeft: padding.left,
		paddingBottom: padding.bottom,
		paddingTop: padding.top,
		//flex
		alignItems,
		justifyContent,
	},
});

export const Box = forwardRef( (props,ref) => {
	return <BaseBox {...props} ref = {ref} />;
});

Box.displayName = "Box";
