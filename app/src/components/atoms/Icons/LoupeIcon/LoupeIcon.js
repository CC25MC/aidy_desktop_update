import {Icon} from "../Icon";
					import { LoupeIconSvg } from './LoupeIconSvg';

					export const LoupeIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {LoupeIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
