export const DrinksIconSvg = ({ title, titleId, ...props }) => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 28 32"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		focusable="false"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M11.8 8.67245V13.8666H2.8C2.64087 13.8666 2.48826 13.9228 2.37574 14.0229C2.26321 14.1229 2.2 14.2585 2.2 14.4V16.4074L1.06338 18.4281C1.02169 18.5022 0.99999 18.5838 1 18.6666V29.3333C0.99999 29.4161 1.02169 29.4978 1.06338 29.5718L2.26337 31.7051C2.31321 31.7937 2.3898 31.8682 2.48458 31.9203C2.57936 31.9724 2.68858 31.9999 2.8 31.9999H12.4C12.5114 31.9999 12.6206 31.9724 12.7154 31.9203C12.8102 31.8682 12.8868 31.7937 12.9366 31.7051L12.9477 31.6851C13.4443 31.956 14.0349 32.0568 14.6089 31.9685C15.183 31.8803 15.7013 31.6092 16.0667 31.2058C16.6171 31.69 17.4586 31.9999 18.4 31.9999C19.3414 31.9999 20.1829 31.69 20.7333 31.2061C21.0449 31.5496 21.4687 31.7987 21.9463 31.9191C22.4239 32.0395 22.9318 32.0252 23.3998 31.8783C23.8679 31.7313 24.2732 31.4589 24.5598 31.0986C24.8464 30.7383 25.0002 30.3079 25 29.8666C25 29.8555 25 29.8444 24.9988 29.8333L24.4027 21.3545L24.9939 17.6753C24.9977 17.6503 24.9995 17.6252 24.9992 17.6H25V8.67245C25.001 8.12518 24.8115 7.59103 24.4577 7.14319L21.3524 3.19999H21.4C21.5591 3.19999 21.7117 3.1438 21.8243 3.04378C21.9368 2.94377 22 2.80811 22 2.66666V1.6C21.9995 1.1758 21.8096 0.769109 21.4722 0.469155C21.1347 0.1692 20.6772 0.000476421 20.2 0H16.6C16.1228 0.000476421 15.6652 0.1692 15.3278 0.469155C14.9903 0.769109 14.8005 1.1758 14.8 1.6V2.66666C14.8 2.80811 14.8632 2.94377 14.9757 3.04378C15.0883 3.1438 15.2409 3.19999 15.4 3.19999H15.4476L12.3426 7.14319C11.9886 7.591 11.7991 8.12515 11.8 8.67245ZM2.2 28.7999V19.2H7.06667C7.66 20.5619 8.2 22.0027 8.2 23.4666C8.2 25.8533 7.37867 27.2533 6.39512 28.7999H2.2ZM8.35067 19.2H9.46667C10.06 20.5619 10.6 22.0027 10.6 23.4666C10.6 25.8533 9.77867 27.2533 8.79512 28.7999H7.7689C8.6581 27.3533 9.4 25.838 9.4 23.4666C9.4 21.9678 8.91737 20.5445 8.35067 19.2ZM12.0292 30.9333H3.1708L2.5708 29.8666H12.6292L12.0292 30.9333ZM22.6 30.9333C22.2819 30.9329 21.9768 30.8205 21.7519 30.6205C21.5269 30.4205 21.4004 30.1494 21.4 29.8666C21.4 29.7252 21.3368 29.5895 21.2243 29.4895C21.1117 29.3895 20.9591 29.3333 20.8 29.3333C20.6409 29.3333 20.4883 29.3895 20.3757 29.4895C20.2632 29.5895 20.2 29.7252 20.2 29.8666C20.2 30.4448 19.3757 30.9333 18.4 30.9333C17.4243 30.9333 16.6 30.4448 16.6 29.8666C16.6 29.7252 16.5368 29.5895 16.4243 29.4895C16.3117 29.3895 16.1591 29.3333 16 29.3333C15.8409 29.3333 15.6883 29.3895 15.5757 29.4895C15.4632 29.5895 15.4 29.7252 15.4 29.8666C15.4001 30.064 15.3386 30.2575 15.2222 30.4256C15.1059 30.5937 14.9394 30.7298 14.7412 30.8188C14.543 30.9077 14.3209 30.9461 14.0997 30.9295C13.8784 30.9129 13.6667 30.842 13.4881 30.7248L14.1366 29.5715C14.1783 29.4975 14.2 29.416 14.2 29.3333V18.6666C14.2 18.5838 14.1783 18.5022 14.1366 18.4281L13.9708 18.1333H23.7082L23.2061 21.2579C23.2002 21.2939 23.1986 21.3303 23.2012 21.3666L23.8 29.8816C23.7952 30.1618 23.6667 30.4291 23.4422 30.6258C23.2177 30.8226 22.9152 30.933 22.6 30.9333ZM16 1.6C16.0002 1.4586 16.0634 1.32303 16.1759 1.22305C16.2884 1.12306 16.4409 1.06682 16.6 1.06666H20.2C20.3591 1.06682 20.5116 1.12306 20.6241 1.22305C20.7365 1.32303 20.7998 1.4586 20.8 1.6V2.13333H16V1.6ZM13 8.67245C12.9994 8.34411 13.1131 8.02363 13.3253 7.75492L16.9124 3.19999H19.8876L23.4746 7.75492C23.6869 8.02363 23.8006 8.34411 23.8 8.67245V9.59998H13V8.67245ZM13 14.4V10.6666H23.8V17.0666H13.3708L13 16.4074V14.4ZM13 28.7999H10.1689C11.0581 27.3533 11.8 25.838 11.8 23.4666C11.8 21.9678 11.3174 20.5445 10.7507 19.2H13V28.7999ZM2.5708 18.1333L3.1708 17.0666H8.8C8.95913 17.0666 9.11174 17.0104 9.22426 16.9104C9.33679 16.8104 9.4 16.6748 9.4 16.5333C9.4 16.3919 9.33679 16.2562 9.22426 16.1562C9.11174 16.0562 8.95913 16 8.8 16H3.4V14.9333H11.8V16H11.2C11.0409 16 10.8883 16.0562 10.7757 16.1562C10.6632 16.2562 10.6 16.3919 10.6 16.5333C10.6 16.6748 10.6632 16.8104 10.7757 16.9104C10.8883 17.0104 11.0409 17.0666 11.2 17.0666H12.0292L12.6292 18.1333H2.5708Z"
			fill="currentColor"
		/>
	</svg>
);