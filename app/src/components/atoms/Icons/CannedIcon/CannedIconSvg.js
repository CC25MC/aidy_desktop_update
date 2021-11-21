export const CannedIconSvg = ({ title, titleId, ...props }) => (
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
			d="M32 12.2281C32 12.1506 31.9932 12.0732 31.9797 11.9969C31.9686 11.9197 31.9401 11.846 31.8964 11.7814C31.4962 9.56179 27.0279 6.05554 18.2661 2.85704C11.3464 0.330728 5.08331 -0.615647 2.68281 0.503353C2.20069 0.696478 1.81806 1.07779 1.62344 1.55935C0.928875 3.47267 4.09312 6.08048 8.59169 8.41392C5.31112 8.84742 0 9.90823 0 12.2281C0 12.2384 0.0028125 12.2614 0.0031875 12.2762C0.0030625 12.2818 0 12.2865 0 12.2922V27.6947C0 30.4958 8.04894 31.9614 16 31.9614C23.9511 31.9614 32 30.4958 32 27.6947V12.2922C32 12.2864 31.9969 12.2817 31.9966 12.2759C31.9971 12.2613 32 12.2384 32 12.2281ZM2.62656 1.92342C2.72981 1.71173 2.91194 1.54892 3.13387 1.47004C3.89206 1.19092 4.69894 1.06842 5.50575 1.10992C8.22969 1.10992 12.6318 1.93542 17.9006 3.85917C26.6417 7.04998 31.3292 10.8833 30.8422 12.227C30.7389 12.4387 30.5568 12.6015 30.3349 12.6804C29.3276 13.15 27.1048 13.1817 24.0534 12.6464C24.049 12.6458 24.0456 12.6429 24.0411 12.6424L24.0165 12.6399C21.1379 12.1013 18.3112 11.3155 15.5677 10.2913C13.7499 9.62767 12.1103 8.93623 10.6532 8.24529C10.6417 8.24092 10.6322 8.23342 10.6204 8.22985C5.09181 5.6031 2.24081 2.98523 2.62656 1.92342ZM16.5438 13.2948C18.9685 13.2902 21.3916 13.4222 23.8016 13.6903C24.6062 13.834 25.3686 13.9416 26.0807 14.0122C26.4847 14.0786 26.8782 14.1537 27.2647 14.2332C23.573 15.0919 19.7897 15.4932 16 15.4281C15.6112 15.4281 15.2254 15.4244 14.8424 15.4168C14.7882 15.4159 14.7343 15.4148 14.6803 15.4137C12.1545 15.3739 9.63488 15.151 7.14131 14.7467C7.01119 14.7242 6.88119 14.7017 6.75481 14.6784C6.68588 14.6658 6.61981 14.6524 6.55181 14.6395C6.08544 14.5506 5.64519 14.4565 5.23387 14.358C8.95519 13.6018 12.7467 13.2454 16.5438 13.2948ZM3.58175 13.6846C3.501 13.7102 3.42775 13.7552 3.36838 13.8157C2.95519 13.6713 2.55344 13.4961 2.16644 13.2917C4.37612 12.1147 9.35588 11.2678 14.8816 11.1743C14.9885 11.214 15.0951 11.2544 15.2021 11.2935C16.1578 11.6424 17.1005 11.9605 18.0227 12.2479C17.5327 12.2379 17.0424 12.2281 16.5438 12.2281C11.4328 12.2281 6.70887 12.7591 3.58175 13.6846ZM10.3626 9.28667C11.0278 9.59848 11.7121 9.90267 12.4096 10.1966C7.324 10.4819 3.15625 11.3687 1.23281 12.598C1.15044 12.5064 1.09544 12.3936 1.07406 12.2724C1.0735 12.267 1.07119 12.2614 1.07081 12.256L1.07025 12.2539C1.06931 12.2422 1.06844 12.2305 1.06662 12.2187C1.08788 11.3567 3.97869 9.89223 10.3626 9.28667ZM30.9333 27.6948C30.9333 29.031 25.2521 30.8948 16 30.8948C6.74794 30.8948 1.06669 29.031 1.06669 27.6948V13.8661C1.07837 13.8744 1.09331 13.8819 1.10512 13.8902C1.22506 13.9729 1.35494 14.0542 1.49475 14.1338C1.54638 14.1636 1.59863 14.1932 1.65269 14.2224C1.75925 14.2793 1.87119 14.3353 1.98769 14.3905C2.09675 14.443 2.20856 14.4947 2.32538 14.5452C2.38744 14.5718 2.4515 14.5979 2.51588 14.624C2.69963 14.6994 2.89056 14.7727 3.09081 14.8435L3.09394 14.8446C4.877 15.4272 6.7145 15.8275 8.57831 16.0394C8.64481 16.0482 8.71181 16.0566 8.77888 16.065C9.04756 16.0988 9.31919 16.1305 9.59369 16.1604C9.72719 16.175 9.8615 16.1891 9.99656 16.2028C10.2111 16.2243 10.4271 16.2445 10.6446 16.2635C10.8304 16.28 11.0167 16.296 11.2054 16.3108C11.3848 16.3247 11.5652 16.3372 11.7461 16.3495C11.9619 16.3644 12.1776 16.3789 12.3967 16.3915C12.5714 16.4015 12.7471 16.4096 12.9228 16.4181C13.1418 16.4288 13.3598 16.4398 13.5816 16.4482C13.7929 16.4562 14.0049 16.4614 14.2169 16.4673C14.4046 16.4725 14.5905 16.479 14.7799 16.4825C15.1864 16.4904 15.5931 16.4944 16 16.4947C16.3449 16.4947 16.6902 16.4909 17.0352 16.4854C17.1094 16.4842 17.1835 16.483 17.2577 16.4815C17.5953 16.4749 17.9321 16.4657 18.2683 16.4541C18.3211 16.4522 18.3734 16.4498 18.4262 16.4478C18.7336 16.4361 19.0399 16.4222 19.3448 16.4059C19.4036 16.4028 19.4625 16.4001 19.5211 16.3968C19.8536 16.3782 20.1838 16.3569 20.5118 16.3329C20.5798 16.328 20.6471 16.3226 20.7149 16.3175C21.0352 16.293 21.3536 16.2667 21.6682 16.2372L21.7204 16.2327C22.0461 16.2019 22.3669 16.1674 22.685 16.1312C22.7539 16.1234 22.8226 16.1154 22.8911 16.1074C23.2047 16.0704 23.5148 16.0311 23.8193 15.9888C23.8564 15.9836 23.8924 15.978 23.9294 15.9727C24.2101 15.9329 24.4861 15.8908 24.7576 15.8464C24.8131 15.8373 24.8689 15.8286 24.924 15.8194C25.2131 15.7709 25.4962 15.7198 25.7734 15.6662C25.8288 15.6555 25.8829 15.6443 25.9378 15.6334C26.1975 15.5817 26.4522 15.5282 26.6999 15.4719C26.7266 15.4659 26.7543 15.4602 26.7809 15.454C27.0433 15.3936 27.2965 15.33 27.5439 15.2644C27.5996 15.2497 27.6548 15.2347 27.7096 15.2197C27.9537 15.1529 28.1919 15.0842 28.4194 15.0122C28.4417 15.0052 28.4626 14.9977 28.4847 14.9905C28.6948 14.923 28.8959 14.853 29.0904 14.7811C29.135 14.7647 29.1802 14.7484 29.2239 14.7317C29.4252 14.6547 29.6173 14.5754 29.8001 14.4935C29.8376 14.4767 29.8727 14.4595 29.9093 14.4425C30.0714 14.3672 30.2258 14.2899 30.3712 14.2105C30.3967 14.1967 30.424 14.1832 30.449 14.1692C30.6056 14.0811 30.7492 13.99 30.8841 13.897C30.8994 13.8865 30.9184 13.8768 30.9334 13.8662L30.9333 27.6948Z"
			fill="currentColor"
		/>
		<path
			d="M29.4323 16.2737C29.1639 16.0728 28.8153 16.013 28.4953 16.113C24.2464 17.4203 18.3417 17.5614 16 17.5614C13.6583 17.5614 7.75363 17.4203 3.50469 16.1127C3.18462 16.013 2.83619 16.0729 2.56769 16.2737C2.29512 16.476 2.13406 16.7952 2.13331 17.1346V26.9156C2.1305 27.3133 2.35106 27.679 2.70412 27.862C4.54325 28.8089 9.488 29.8281 16 29.8281C22.512 29.8281 27.4568 28.8089 29.2958 27.862C29.6489 27.679 29.8695 27.3133 29.8666 26.9156V17.1346C29.8659 16.7952 29.7049 16.476 29.4323 16.2737ZM16 28.7614C8.70731 28.7614 4.43388 27.5528 3.2 26.9156L3.19112 17.1323C7.57863 18.4823 13.6104 18.6281 16 18.6281C18.3896 18.6281 24.4213 18.4823 28.8 17.1346L28.8073 26.9135C27.5661 27.5529 23.2927 28.7614 16 28.7614Z"
			fill="currentColor"
		/>
		<path
			d="M25.863 19.764C25.6957 19.669 25.4902 19.6716 25.3255 19.7708L22.5062 21.4411C20.8573 20.3476 18.0266 19.6947 14.9333 19.6947C9.76456 19.6947 5.86662 21.4143 5.86662 23.6947C5.86662 25.9752 9.76456 27.6947 14.9333 27.6947C18.3317 27.6947 21.3979 26.9041 22.9219 25.6403L25.325 27.0851C25.4897 27.1842 25.6951 27.187 25.8625 27.0924C26.0299 26.9978 26.1334 26.8203 26.1333 26.6281V20.2281C26.1334 20.036 26.0301 19.8587 25.863 19.764ZM10.3737 26.0765C8.23519 25.5026 6.93337 24.5677 6.93337 23.6948C6.93337 22.8231 8.23131 21.8895 10.3645 21.3153L10.4886 21.5383C11.3256 22.9473 11.281 24.7115 10.3737 26.0765ZM25.0667 25.6851L23.4714 24.726C23.0891 24.494 22.6021 24.5276 22.2552 24.8098C20.9209 25.9145 18.0469 26.6281 14.9334 26.6281C13.7703 26.6321 12.6093 26.529 11.4651 26.3202C12.3894 24.6915 12.3823 22.6951 11.4464 21.073C12.5966 20.8617 13.7639 20.7573 14.9334 20.7615C17.7818 20.7615 20.4579 21.3625 21.9167 22.3302C22.2612 22.5662 22.7115 22.5805 23.0703 22.367L25.0667 21.1698V25.6851Z"
			fill="currentColor"
		/>
		<path
			d="M9.44533 23.0495C9.41876 23.0281 9.3917 23.0068 9.36514 22.9854C9.33551 22.9651 9.30326 22.949 9.26933 22.9372C9.23745 22.9211 9.20314 22.9103 9.16776 22.9055C9.0657 22.884 8.95951 22.8951 8.86414 22.9372C8.79882 22.963 8.73907 23.0011 8.68807 23.0494C8.48182 23.2597 8.48182 23.5964 8.68807 23.8067C8.73914 23.8549 8.79889 23.8929 8.86414 23.9187C8.92826 23.9461 8.99707 23.9606 9.06676 23.9614C9.10064 23.9604 9.13445 23.9568 9.16783 23.9507C9.2032 23.9456 9.23751 23.9348 9.26939 23.9186C9.30333 23.9069 9.33558 23.8907 9.3652 23.8705C9.39176 23.8493 9.41883 23.828 9.44539 23.8066C9.5427 23.7043 9.59795 23.5691 9.60008 23.428C9.59926 23.3582 9.58476 23.2893 9.55739 23.2251C9.53026 23.1606 9.49239 23.1012 9.44533 23.0495Z"
			fill="currentColor"
		/>
		<path
			d="M23.3484 11.6815C23.6348 11.7447 23.9185 11.5649 23.9835 11.2789C24.0485 10.9929 23.8704 10.7081 23.5849 10.6414C21.3389 10.1193 19.1274 9.45868 16.963 8.66324C14.3291 7.71955 11.7759 6.56393 9.32862 5.2078C9.07244 5.06355 8.74781 5.15381 8.60287 5.40962C8.45787 5.66537 8.54725 5.99024 8.80256 6.13593C11.3013 7.52099 13.9081 8.7013 16.5974 9.66537C18.8039 10.4763 21.0586 11.1497 23.3484 11.6815Z"
			fill="currentColor"
		/>
		<path
			d="M9.49424 3.65962C12.1037 4.20169 14.6691 4.93818 17.1687 5.863C19.4248 6.67537 21.624 7.63787 23.7516 8.744C24.0121 8.88062 24.3341 8.7805 24.4711 8.52018C24.6082 8.25987 24.5086 7.93775 24.2484 7.80025C22.0786 6.67175 19.8355 5.68975 17.5344 4.86094C14.9839 3.91756 12.3663 3.16637 9.70362 2.61381C9.41481 2.556 9.13381 2.74325 9.07599 3.03206C9.01824 3.32081 9.20549 3.60181 9.49424 3.65962Z"
			fill="currentColor"
		/>
	</svg>
);