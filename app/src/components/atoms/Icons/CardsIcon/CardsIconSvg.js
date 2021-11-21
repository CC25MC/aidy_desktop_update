export const CardsIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 31 30"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<g clipPath="url(#clip0)">
			<path
				d="M23.6667 17.4258L29.0073 15.6543C29.144 15.6031 29.2693 15.5255 29.3759 15.4259C29.4825 15.3263 29.5683 15.2066 29.6284 15.0739C29.6885 14.9411 29.7217 14.7978 29.7262 14.6522C29.7306 14.5066 29.7062 14.3615 29.6543 14.2254L25.6338 3.16286C25.5825 3.02647 25.5047 2.90153 25.4048 2.79522C25.305 2.68891 25.185 2.60332 25.0519 2.54336C24.9188 2.4834 24.7751 2.45025 24.6292 2.44582C24.4832 2.44139 24.3377 2.46577 24.2012 2.51755L5.43912 9.29333C5.30238 9.34452 5.17712 9.42214 5.07053 9.52174C4.96395 9.62134 4.87814 9.74095 4.81802 9.87372C4.75791 10.0065 4.72468 10.1498 4.72024 10.2954C4.7158 10.441 4.74024 10.5861 4.79215 10.7222L5.71639 13.1652L26.4656 5.60583M22.63 10.123L24.7096 9.38552"
				stroke="currentColor"
				strokeWidth={1.53431}
				strokeMiterlimit={10}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M22.5581 13.5078H2.59444C1.98191 13.5078 1.48535 14.0031 1.48535 14.6141V26.2297C1.48535 26.8407 1.98191 27.3359 2.59444 27.3359H22.5581C23.1706 27.3359 23.6672 26.8407 23.6672 26.2297V14.6141C23.6672 14.0031 23.1706 13.5078 22.5581 13.5078Z"
				stroke="currentColor"
				strokeWidth={1.53431}
				strokeMiterlimit={10}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M19.0453 23.6486H19.9695M5.18164 19.9611H11.6513H5.18164ZM17.1968 17.1954H19.9695H17.1968ZM5.18164 23.6486H6.10588H5.18164ZM9.80285 23.6486H10.7271H9.80285ZM14.4241 23.6486H15.3483H14.4241Z"
				stroke="currentColor"
				strokeWidth={1.53431}
				strokeMiterlimit={10}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0">
				<rect
					width={29.5758}
					height={29.5}
					fill="white"
					transform="translate(0.560547 0.140625)"
				/>
			</clipPath>
		</defs>
	</svg>
);
