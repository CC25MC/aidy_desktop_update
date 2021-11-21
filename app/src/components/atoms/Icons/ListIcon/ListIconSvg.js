export const ListIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 32 32"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M8.88889 1.88235H32V5.41176H8.88889V1.88235ZM0 1H5.33333V6.29412H0V1ZM0 13.3529H5.33333V18.6471H0V13.3529ZM0 25.7059H5.33333V31H0V25.7059ZM8.88889 14.2353H32V17.7647H8.88889V14.2353ZM8.88889 26.5882H32V30.1176H8.88889V26.5882Z"
			fill="currentColor"
		/>
	</svg>
);
