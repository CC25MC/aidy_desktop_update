import {Icon} from "../Icon";
					import { ClientsactiveIconSvg } from './ClientsactiveIconSvg';

					export const ClientsactiveIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {ClientsactiveIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
