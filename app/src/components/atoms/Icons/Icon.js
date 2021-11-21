import { Box } from "../Box";
import PropTypes from "prop-types";
import { styled } from "stitches.config";

export const Icon = styled(Box, {
	width: "1em",
	height: "1em",
	fontSize: "100%",
	variants: {
		size: {
			xsmall: {
				width: "16px",
				height: "16px",
			},
			small: {
				width: "20px",
				height: "20px",
			},
			standard: {
				width: "24px",
				height: "24px",
			},
			large: {
				width: "28px",
				height: "28px",
			},
			xlarge: {
				width: "32px",
				height: "32px"
			},
			xxlarge: {
				width: "42px",
				height: "42px"
			},
			fill: {
				width: "100%",
				height: "100%",
			},
		},
	},
});

const IconSizes = ["xsmall", "small", "standard", "large","xlarge", "xxlarge", "fill"];

Icon.propTypes = {
	size: PropTypes.oneOf(IconSizes),
};
