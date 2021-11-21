export const TrashIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 31 31"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M25.6719 3.875H20.3438V2.90625C20.3438 1.30115 19.0426 0 17.4375 0H13.5625C11.9574 0 10.6562 1.30115 10.6562 2.90625V3.875H5.32812C3.99058 3.875 2.90625 4.95933 2.90625 6.29688V8.23438C2.90625 8.76943 3.33995 9.20312 3.875 9.20312H27.125C27.6601 9.20312 28.0938 8.76943 28.0938 8.23438V6.29688C28.0938 4.95933 27.0094 3.875 25.6719 3.875ZM12.5938 2.90625C12.5938 2.37223 13.0285 1.9375 13.5625 1.9375H17.4375C17.9715 1.9375 18.4062 2.37223 18.4062 2.90625V3.875H12.5938V2.90625Z"
			fill="currentColor"
		/>
		<path
			d="M4.74456 11.1406C4.57169 11.1406 4.43395 11.2851 4.44218 11.4578L5.2414 28.2318C5.31527 29.7842 6.59039 31 8.14402 31H22.8557C24.4093 31 25.6845 29.7842 25.7583 28.2318L26.5575 11.4578C26.5658 11.2851 26.428 11.1406 26.2552 11.1406H4.74456ZM19.3749 13.5625C19.3749 13.0273 19.8084 12.5938 20.3436 12.5938C20.8788 12.5938 21.3124 13.0273 21.3124 13.5625V26.1562C21.3124 26.6915 20.8788 27.125 20.3436 27.125C19.8084 27.125 19.3749 26.6915 19.3749 26.1562V13.5625ZM14.5311 13.5625C14.5311 13.0273 14.9646 12.5938 15.4999 12.5938C16.0351 12.5938 16.4686 13.0273 16.4686 13.5625V26.1562C16.4686 26.6915 16.0351 27.125 15.4999 27.125C14.9646 27.125 14.5311 26.6915 14.5311 26.1562V13.5625ZM9.68736 13.5625C9.68736 13.0273 10.1209 12.5938 10.6561 12.5938C11.1913 12.5938 11.6249 13.0273 11.6249 13.5625V26.1562C11.6249 26.6915 11.1913 27.125 10.6561 27.125C10.1209 27.125 9.68736 26.6915 9.68736 26.1562V13.5625Z"
			fill="currentColor"
		/>
	</svg>
);