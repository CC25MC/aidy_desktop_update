import { Box } from "bumbag";
import BG from "assets/Bg3.jpg";
import mainBg from "assets/fondo.jpg";

const bgDefault = `url(${BG})`;
const bgSmall = `url(${mainBg})`

export const BackgroundImage = ({ children }) => {
	return (
		<Box 
			background = {{
				default: bgSmall,
				widescreen: bgDefault,
				fullHD: bgDefault
			}}
			style={{
				backgroundRepeat: 'no-repeat', width: "100%", backgroundPosition: "center",
				backgroundAttachment: "fixed", backgroundSize: "cover",
				height: "100vh",
			}}
		>
			{children}
		</Box>
	);
};
