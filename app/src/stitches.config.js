import { createCss } from "@stitches/react";

const baseColor = "#c39e45";

export const Colors = {
	primary: baseColor,
	body: "#f2f5fb",
	"primary.muted": "#A4C1ED",
};

export const Space = {
	none: "0px",
	gutter: "12px",
	small: "8px",
	regular: "16px",
	medium: "24px",
	large: "32px",
	xlarge: "40px",
};

export const FontSizes = {
	xxsmall: "6.76px",
	xsmall: "9px",
	small: "12px",
	regular: "16px",
	medium: "21.33px",
	large: "28.43px",
	xlarge: "37.90px",
};

export const { styled, css } = createCss({
	prefix: "",
	tokens: {
		colors: Colors,
		space: Space,
		fontSizes: FontSizes,
		radii: {
			card: "12px",
		},
		zIndices: {
			sidebar: "480",
			navbar: "320"
		}
	},
	breakpoints: {
		sm: (rule) => `@media (min-width: 640px)  { ${rule} }`,
		md: (rule) => `@media (min-width: 768px)  { ${rule} }`,
		lg: (rule) => `@media (min-width: 1024px) { ${rule} }`,
		xl: (rule) => `@media (min-width: 1280px) { ${rule} }`,
		xxl: (rule) => `@media (min-width: 1536px) { ${rule} }`,
	},
	utils: {
		size: () => (value) => ({
			width: value,
			height: value,
		}),
		mx: () => (value) => ({
			marginLeft: value,
			marginRight: value,
		}),
		my: () => (value) => ({
			marginTop: value,
			marginBottom: value,
		}),
		px: () => (value) => ({
			paddingLeft: value,
			paddingRight: value,
		}),
		py: () => (value) => ({
			paddingTop: value,
			paddingBottom: value,
		}),
		marginTopNegative: () => (value) => ({
			marginTop: "-" + value,
		}),
		marginLeftNegative: () => (value) => ({
			marginLeft: "-" + value,
		}),
	},
});
