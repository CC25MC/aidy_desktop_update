import {Icon} from "../Icon";
					import { NotificationIconSvg } from './NotificationIconSvg';

					export const NotificationIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {NotificationIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
