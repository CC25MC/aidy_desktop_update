export const CloseIconSvg = ({ title, titleId, ...props }) => (
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
			d="M16.4853 14.6L23.0853 8L24.9707 9.88533L18.3707 16.4853L24.9707 23.0853L23.0853 24.9707L16.4853 18.3707L9.88533 24.9707L8 23.0853L14.6 16.4853L8 9.88533L9.88533 8L16.4853 14.6Z"
			fill="currentColor"
		/>
	</svg>
);
