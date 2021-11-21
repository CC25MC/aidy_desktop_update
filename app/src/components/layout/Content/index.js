import { styled } from "stitches.config";
import { useSidebar } from "hooks";
import { sidebarConfig } from "../Sidebar/Sidebar.styles";

export const Content = ({children}) => {

	const {variant} = useSidebar();

	return (
		<MainContainer layout = {variant} >
			{children}
		</MainContainer>
	);

};

const MainContainer = styled("main",{
	marginLeft: 110,
	paddingTop: 80,
	variants: {
		layout: {
			expanded: {
				marginLeft: "270px"
			},
            collapsed: {
                marginLeft: sidebarConfig.collapsed
            }
		}
	}
});