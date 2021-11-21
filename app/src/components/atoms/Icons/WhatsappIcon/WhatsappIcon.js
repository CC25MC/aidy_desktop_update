import {Icon} from "../Icon";
					import { WhatsappIconSvg } from './WhatsappIconSvg';

					export const WhatsappIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {WhatsappIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
