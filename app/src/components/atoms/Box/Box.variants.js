import { Space } from "stitches.config";

//It takes a space map a set of cssProperties and a space map property
//to generate variant for that space ej: xsmall = { marginLeft: 10px }
const mapRulesToStichesVariant = (rules, propName) => {
	return {
		...Object.values(rules).reduce((ruleObj, propValue) => {
			return {
				...ruleObj,
				[propValue]: {
					[propName]: propValue,
				},
			};
		}, {}),
	};
};

const mapSpaceToScaleVariant = (scaleMapper, cssSpaceProp) => {
	let resultVariant = {};
	Object.entries(scaleMapper).forEach(([spaceProp, spaceValue]) => {
		resultVariant = {
			...resultVariant,
			[spaceProp]: {
				[cssSpaceProp]: spaceValue,
			},
		};
	});
	return resultVariant;
};

export const margin = {
	right: mapSpaceToScaleVariant(Space, "marginRight"),
	top: mapSpaceToScaleVariant(Space, "marginTop"),
	left: mapSpaceToScaleVariant(Space, "marginLeft"),
	bottom: mapSpaceToScaleVariant(Space, "marginBottom"),
};

export const marginNegative = {
	right: mapSpaceToScaleVariant(Space, "marginRightNegative"),
	top: mapSpaceToScaleVariant(Space, "marginTopNegative"),
	left: mapSpaceToScaleVariant(Space, "marginLeftNegative"),
	bottom: mapSpaceToScaleVariant(Space, "marginBottomNegative"),
};

export const marginVariant = mapSpaceToScaleVariant(Space, "margin");

export const padding = {
	right: mapSpaceToScaleVariant(Space, "paddingRight"),
	top: mapSpaceToScaleVariant(Space, "paddingTop"),
	left: mapSpaceToScaleVariant(Space, "paddingLeft"),
	bottom: mapSpaceToScaleVariant(Space, "paddingBottom"),
};

export const paddingVariant = mapSpaceToScaleVariant(Space, "padding");

const alignItemsRules = {
	flexStart: "flex-start",
	flexEnd: "flex-end",
	center: "center",
};

export const alignItems = mapRulesToStichesVariant(
	alignItemsRules,
	"alignItems"
);

const justifyContentRules = {
	flexStart: "flex-start",
	flexEnd: "flex-end",
	center: "center",
	spaceBetween: "space-between",
	spaceAround: "space-around",
	spaceEvenly: "space-evenly",
};

export const justifyContent = mapRulesToStichesVariant(
	justifyContentRules,
	"justifyContent"
);
