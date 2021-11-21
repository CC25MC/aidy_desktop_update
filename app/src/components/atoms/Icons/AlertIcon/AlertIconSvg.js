export const AlertIconSvg = ({ title, titleId, ...props }) => (
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
			d="M17.7752 1.78372L31.8027 27.6486C31.932 27.8869 32 28.1573 32 28.4324C32 28.7076 31.932 28.9779 31.8027 29.2162C31.6735 29.4545 31.4876 29.6524 31.2638 29.79C31.0399 29.9276 30.786 30 30.5275 30H2.47251C2.21403 30 1.9601 29.9276 1.73625 29.79C1.5124 29.6524 1.32651 29.4545 1.19727 29.2162C1.06804 28.9779 0.999998 28.7076 1 28.4324C1 28.1573 1.06804 27.8869 1.19728 27.6486L15.2248 1.78372C15.354 1.54543 15.5399 1.34756 15.7638 1.20999C15.9876 1.07242 16.2415 1 16.5 1C16.7585 1 17.0124 1.07242 17.2362 1.20999C17.4601 1.34756 17.646 1.54543 17.7752 1.78372ZM15.0275 22.1621V25.2973H17.9725V22.1621H15.0275ZM15.0275 11.1891V19.027H17.9725V11.1891H15.0275Z"
			fill="currentColor"
		/>
	</svg>
);