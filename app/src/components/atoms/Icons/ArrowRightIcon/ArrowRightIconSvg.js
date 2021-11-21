export const ArrowRightIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M13.172 12L8.22198 7.04999L9.63598 5.63599L16 12L9.63598 18.364L8.22198 16.95L13.172 12Z"
			fill="white"
		/>
	</svg>
);
