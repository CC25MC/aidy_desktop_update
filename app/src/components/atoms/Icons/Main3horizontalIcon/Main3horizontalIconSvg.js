export const Main3horizontalIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 18 4"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M-8.74228e-08 2C-3.93402e-08 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 -1.35505e-07 2 -8.74228e-08C0.9 -3.93402e-08 -1.35505e-07 0.9 -8.74228e-08 2ZM14 2C14 3.1 14.9 4 16 4C17.1 4 18 3.1 18 2C18 0.899999 17.1 -7.47465e-07 16 -6.99382e-07C14.9 -6.513e-07 14 0.899999 14 2ZM7 2C7 3.1 7.9 4 9 4C10.1 4 11 3.1 11 2C11 0.9 10.1 -4.41485e-07 9 -3.93402e-07C7.9 -3.4532e-07 7 0.9 7 2Z"
			fill="currentColor"
		/>
	</svg>
);
