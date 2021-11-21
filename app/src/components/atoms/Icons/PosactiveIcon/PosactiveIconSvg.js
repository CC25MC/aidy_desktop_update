export const PosactiveIconSvg = ({ title, titleId, ...props }) => (
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
			d="M7 15C8.10457 15 9 14.1046 9 13C9 11.8954 8.10457 11 7 11C5.89543 11 5 11.8954 5 13C5 14.1046 5.89543 15 7 15Z"
			stroke="#022864"
			strokeWidth={2}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M8.80002 13.9L18 18"
			stroke="#022864"
			strokeWidth={2}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M18 19C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17C17.4477 17 17 17.4477 17 18C17 18.5523 17.4477 19 18 19Z"
			stroke="#022864"
			strokeWidth={2}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M28.25 16.6L29.35 19.7M18.5 11.3L20.6 7.99998L18.5 11.3ZM19.15 7.09998L22 8.84998L19.15 7.09998ZM22.7 14.7L26 12L22.7 14.7ZM24.85 10.65L27.15 13.35L24.85 10.65ZM25.6 19.35L28.8 18.15L25.6 19.35Z"
			stroke="#022864"
			strokeWidth={2}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M26.7 23H1M29.5 23H26.7C26.1829 20.1086 24.9254 17.4005 23.0502 15.1398C21.175 12.879 18.746 11.1426 16 10.1V2.5C16 2.10218 15.842 1.72064 15.5607 1.43934C15.2794 1.15804 14.8978 1 14.5 1H2.5C2.10218 1 1.72064 1.15804 1.43934 1.43934C1.15804 1.72064 1 2.10218 1 2.5V29.5C1 29.8978 1.15804 30.2794 1.43934 30.5607C1.72064 30.842 2.10218 31 2.5 31H29.5C29.8978 31 30.2794 30.842 30.5607 30.5607C30.842 30.2794 31 29.8978 31 29.5V24.5C31 24.1022 30.842 23.7206 30.5607 23.4393C30.2794 23.158 29.8978 23 29.5 23V23Z"
			stroke="currentColor"
			strokeWidth={2}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
