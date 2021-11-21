import {Icon} from "../Icon";
					import { MenuIconSvg } from './MenuIconSvg';

					export const MenuIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {MenuIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
