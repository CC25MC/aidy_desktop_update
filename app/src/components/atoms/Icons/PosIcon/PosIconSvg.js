export const PosIconSvg = ({ title, titleId, ...props }) => (
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
			d="M61.0312 130.781C70.6617 130.781 78.4688 122.974 78.4688 113.344C78.4688 103.713 70.6617 95.9062 61.0312 95.9062C51.4008 95.9062 43.5938 103.713 43.5938 113.344C43.5938 122.974 51.4008 130.781 61.0312 130.781Z"
			stroke="currentColor"
			strokeWidth={15}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M76.7236 121.19L156.936 156.937"
			stroke="currentColor"
			strokeWidth={15}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M156.938 165.656C161.753 165.656 165.656 161.753 165.656 156.938C165.656 152.122 161.753 148.219 156.938 148.219C152.122 148.219 148.219 152.122 148.219 156.938C148.219 161.753 152.122 165.656 156.938 165.656Z"
			stroke="currentColor"
			strokeWidth={15}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M246.305 144.732L255.895 171.76M161.297 98.5226L179.606 69.7507L161.297 98.5226ZM166.964 61.9038L191.812 77.1616L166.964 61.9038ZM197.916 128.166L226.687 104.626L197.916 128.166ZM216.661 92.8554L236.714 116.396L216.661 92.8554ZM223.2 168.708L251.1 158.246L223.2 168.708Z"
			stroke="currentColor"
			strokeWidth={15}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M232.791 200.531H8.71875M257.203 200.531H232.791C228.282 175.322 217.319 151.711 200.969 132C184.619 112.289 163.442 97.1499 139.5 88.0594V21.7969C139.5 18.3283 138.122 15.0019 135.67 12.5492C133.217 10.0966 129.89 8.71875 126.422 8.71875H21.7969C18.3283 8.71875 15.0019 10.0966 12.5492 12.5492C10.0966 15.0019 8.71875 18.3283 8.71875 21.7969V257.203C8.71875 260.672 10.0966 263.998 12.5492 266.451C15.0019 268.903 18.3283 270.281 21.7969 270.281H257.203C260.672 270.281 263.998 268.903 266.451 266.451C268.903 263.998 270.281 260.672 270.281 257.203V213.609C270.281 210.141 268.903 206.814 266.451 204.362C263.998 201.909 260.672 200.531 257.203 200.531V200.531Z"
			stroke="currentColor"
			strokeWidth={15}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
