import { Box } from "../Box";
import { NavLink as NLink } from "react-router-dom";

const NavLink = ({ className, children, ...props }) => {
	return (
		<NLink className={className.toString()} {...props}>
			{children}
		</NLink>
	);
};

export const Link = ({ to, children, css, ...props }) => {
	return (
		<Box  {...props} as={NavLink} to={to} css={css}>
			{children}
		</Box>
	);
};
