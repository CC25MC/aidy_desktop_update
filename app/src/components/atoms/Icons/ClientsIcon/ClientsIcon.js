import {Icon} from "../Icon";
					import { ClientsIconSvg } from './ClientsIconSvg';

					export const ClientsIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {ClientsIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
