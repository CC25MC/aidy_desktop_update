import {Icon} from "../Icon";
					import { AlertIconSvg } from './AlertIconSvg';

					export const AlertIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {AlertIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
