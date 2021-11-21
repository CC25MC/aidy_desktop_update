export const OtherpaymentIconSvg = ({ title, titleId, ...props }) => (
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
				d="M23.819 17.582L29.1596 15.8105C29.2964 15.7593 29.4216 15.6817 29.5282 15.5821C29.6348 15.4825 29.7206 15.3629 29.7807 15.2301C29.8408 15.0974 29.8741 14.9541 29.8785 14.8084C29.883 14.6628 29.8585 14.5178 29.8066 14.3816L25.7862 3.31911C25.7348 3.18272 25.657 3.05778 25.5572 2.95147C25.4573 2.84516 25.3374 2.75957 25.2043 2.69961C25.0712 2.63965 24.9275 2.6065 24.7815 2.60207C24.6355 2.59764 24.4901 2.62202 24.3536 2.6738L5.59146 9.44958C5.45472 9.50077 5.32946 9.57839 5.22288 9.67799C5.11629 9.77759 5.03048 9.8972 4.97037 10.03C4.91025 10.1627 4.87702 10.306 4.87258 10.4517C4.86814 10.5973 4.89258 10.7423 4.94449 10.8785L5.86873 13.3215L26.618 5.76208M22.7824 10.2793L24.8619 9.54177"
				stroke="currentColor"
				strokeWidth={1.53431}
				strokeMiterlimit={10}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M22.7094 13.6641H2.74581C2.13328 13.6641 1.63672 14.1593 1.63672 14.7703V26.3859C1.63672 26.9969 2.13328 27.4922 2.74581 27.4922H22.7094C23.322 27.4922 23.8185 26.9969 23.8185 26.3859V14.7703C23.8185 14.1593 23.322 13.6641 22.7094 13.6641Z"
				stroke="currentColor"
				strokeWidth={1.53431}
				strokeMiterlimit={10}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x={9.03027}
				y={23.8047}
				width={1.38636}
				height={1.38281}
				rx={0.691407}
				fill="currentColor"
			/>
			<rect
				x={12.2656}
				y={23.8047}
				width={1.38636}
				height={1.38281}
				rx={0.691407}
				fill="currentColor"
			/>
			<rect
				x={15.5}
				y={23.8047}
				width={1.38636}
				height={1.38281}
				rx={0.691407}
				fill="currentColor"
			/>
			<rect
				x={1.94196}
				y={16.7358}
				width={21.5717}
				height={2.15319}
				stroke="currentColor"
				strokeWidth={1.53431}
			/>
		</g>
		<defs>
			<clipPath id="clip0">
				<rect
					width={29.5758}
					height={29.5}
					fill="white"
					transform="translate(0.712891 0.296875)"
				/>
			</clipPath>
		</defs>
	</svg>
);
