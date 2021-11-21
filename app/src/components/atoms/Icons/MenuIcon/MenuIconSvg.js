export const MenuIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 24 22"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M17.3333 18.6667V21.3333H2.66667V18.6667H17.3333ZM24 9.33333V12H0V9.33333H24ZM21.3333 0V2.66667H6.66667V0H21.3333Z"
			fill="currentColor"
		/>
	</svg>
);
