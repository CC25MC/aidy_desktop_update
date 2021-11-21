export const BoxIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 279 279"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M8.71875 34.875H270.281V87.1875H8.71875V34.875ZM26.1562 87.1875H252.844V244.125H26.1562V87.1875Z"
			stroke="currentColor"
			strokeWidth={15}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M191.812 122.062C191.812 126.687 189.975 131.123 186.705 134.393C183.435 137.663 179 139.5 174.375 139.5H104.625C100 139.5 95.565 137.663 92.2948 134.393C89.0247 131.123 87.1875 126.687 87.1875 122.062"
			stroke="currentColor"
			strokeWidth={15}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
