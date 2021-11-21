export const ShareIconSvg = ({ title, titleId, ...props }) => (
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
			d="M18.3882 23.7821L12.2 20.4622C11.3921 21.3118 10.3431 21.9028 9.18927 22.1582C8.03547 22.4137 6.83024 22.3218 5.7302 21.8946C4.63017 21.4674 3.68619 20.7245 3.02096 19.7626C2.35573 18.8007 2 17.6641 2 16.5007C2 15.3373 2.35573 14.2008 3.02096 13.2388C3.68619 12.2769 4.63017 11.5341 5.7302 11.1068C6.83024 10.6796 8.03547 10.5878 9.18927 10.8432C10.3431 11.0987 11.3921 11.6896 12.2 12.5393L18.3897 9.21932C18.0383 7.85085 18.2063 6.40329 18.8622 5.14796C19.5181 3.89264 20.6169 2.91574 21.9527 2.40038C23.2884 1.88502 24.7693 1.86658 26.1179 2.34853C27.4665 2.83047 28.59 3.7797 29.2781 5.01829C29.9661 6.25689 30.1712 7.69981 29.8552 9.07658C29.5391 10.4534 28.7234 11.6695 27.561 12.4969C26.3987 13.3244 24.9695 13.7065 23.5413 13.5715C22.113 13.4365 20.7839 12.7937 19.803 11.7636L13.6133 15.0836C13.8509 16.0134 13.8509 16.9866 13.6133 17.9164L19.8015 21.2364C20.7824 20.2063 22.1116 19.5635 23.5398 19.4285C24.968 19.2935 26.3972 19.6756 27.5596 20.5031C28.7219 21.3305 29.5376 22.5466 29.8537 23.9234C30.1698 25.3002 29.9646 26.7431 29.2766 27.9817C28.5886 29.2203 27.465 30.1695 26.1164 30.6515C24.7679 31.1334 23.2869 31.115 21.9512 30.5996C20.6155 30.0843 19.5166 29.1074 18.8607 27.852C18.2048 26.5967 18.0368 25.1491 18.3882 23.7807V23.7821ZM7.89523 19.3995C8.67695 19.3995 9.42664 19.094 9.9794 18.5503C10.5322 18.0065 10.8427 17.269 10.8427 16.5C10.8427 15.731 10.5322 14.9935 9.9794 14.4497C9.42664 13.906 8.67695 13.6005 7.89523 13.6005C7.11351 13.6005 6.36381 13.906 5.81106 14.4497C5.2583 14.9935 4.94777 15.731 4.94777 16.5C4.94777 17.269 5.2583 18.0065 5.81106 18.5503C6.36381 19.094 7.11351 19.3995 7.89523 19.3995ZM24.1063 10.701C24.888 10.701 25.6377 10.3955 26.1904 9.85172C26.7432 9.30795 27.0537 8.57045 27.0537 7.80145C27.0537 7.03245 26.7432 6.29495 26.1904 5.75118C25.6377 5.20742 24.888 4.90194 24.1063 4.90194C23.3246 4.90194 22.5749 5.20742 22.0221 5.75118C21.4693 6.29495 21.1588 7.03245 21.1588 7.80145C21.1588 8.57045 21.4693 9.30795 22.0221 9.85172C22.5749 10.3955 23.3246 10.701 24.1063 10.701ZM24.1063 28.0981C24.888 28.0981 25.6377 27.7926 26.1904 27.2488C26.7432 26.7051 27.0537 25.9676 27.0537 25.1986C27.0537 24.4296 26.7432 23.692 26.1904 23.1483C25.6377 22.6045 24.888 22.299 24.1063 22.299C23.3246 22.299 22.5749 22.6045 22.0221 23.1483C21.4693 23.692 21.1588 24.4296 21.1588 25.1986C21.1588 25.9676 21.4693 26.7051 22.0221 27.2488C22.5749 27.7926 23.3246 28.0981 24.1063 28.0981Z"
			fill="currentColor"
		/>
	</svg>
);