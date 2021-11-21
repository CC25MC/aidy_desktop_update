import { Box, Text } from 'bumbag';
import BG from "assets/fondo.jpg";
import { TextField, Button } from "components";

const KeyView = () => {
	return <Box alignX={"center"} alignY={'center'}
		style={{
			backgroundImage: `url(${BG})`,
			backgroundRepeat: 'no-repeat', width: "100%", backgroundPosition: "center",
			backgroundAttachment: "fixed", backgroundSize: "cover",
			height: "100vh",
		}}>
		<Box width={"510px"} height={"320px"} backgroundColor={"light"} borderRadius={"8px"} padding={"20px"}>
			<Box height={"25%"} alignY={'top'}>
				<Text fontSize="300" textAlign={"center"}  color={"white"}>
					Para disfrutar de un servicio de primera por favor <Text color={"secondary"}>Ingresa key de verificación. </Text>
				</Text>
			</Box>
			<Box height={"50%"} alignY={'center'}>
				<TextField placeholder={"Key de verificación"} icon={"key"} />
			</Box>
			<Box height={"25%"} alignY={'bottom'}>
				<Button width={"100%"} palette={"white"}>
					Ingresar
				</Button>
			</Box>
		</Box>
	</Box>;
};
export default KeyView;

