export const AddimageIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 36 36"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M31.5 22.5V27H36V30H31.5V34.5H28.5V30H24V27H28.5V22.5H31.5ZM31.512 4.5C32.334 4.5 33 5.1675 33 5.9895V19.5H30V7.5H6V28.4985L21 13.5L25.5 18V22.2435L21 17.7435L10.2405 28.5H21V31.5H4.488C4.09322 31.4996 3.71475 31.3425 3.43573 31.0632C3.15672 30.7839 3 30.4053 3 30.0105V5.9895C3.00275 5.59557 3.16035 5.21853 3.43877 4.93983C3.71719 4.66113 4.09407 4.50314 4.488 4.5H31.512ZM12 10.5C12.7956 10.5 13.5587 10.8161 14.1213 11.3787C14.6839 11.9413 15 12.7044 15 13.5C15 14.2956 14.6839 15.0587 14.1213 15.6213C13.5587 16.1839 12.7956 16.5 12 16.5C11.2044 16.5 10.4413 16.1839 9.87868 15.6213C9.31607 15.0587 9 14.2956 9 13.5C9 12.7044 9.31607 11.9413 9.87868 11.3787C10.4413 10.8161 11.2044 10.5 12 10.5Z"
			fill="currentColor"
		/>
	</svg>
);
