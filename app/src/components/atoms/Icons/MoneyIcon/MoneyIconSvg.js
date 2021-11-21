export const MoneyIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 31 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M1.63574 1.20312H30.2295V16.9386H1.63574V1.20312Z"
			stroke="currentColor"
			strokeWidth={1.53431}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M15.9332 13.0047C18.1114 13.0047 19.8772 11.2434 19.8772 9.07082C19.8772 6.89821 18.1114 5.13696 15.9332 5.13696C13.755 5.13696 11.9893 6.89821 11.9893 9.07082C11.9893 11.2434 13.755 13.0047 15.9332 13.0047Z"
			stroke="currentColor"
			strokeWidth={1.53431}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M23.8211 13.0047H25.7931M6.07324 5.13696H8.04522H6.07324Z"
			stroke="currentColor"
			strokeWidth={1.53431}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
