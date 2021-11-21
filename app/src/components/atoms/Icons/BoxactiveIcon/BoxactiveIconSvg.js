export const BoxactiveIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M1 4H31V10H1V4ZM3 10H29V28H3V10Z"
			stroke="currentColor"
			strokeWidth={2}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M22 14C22 14.5304 21.7893 15.0391 21.4142 15.4142C21.0391 15.7893 20.5304 16 20 16H12C11.4696 16 10.9609 15.7893 10.5858 15.4142C10.2107 15.0391 10 14.5304 10 14"
			stroke="#022864"
			strokeWidth={2}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
