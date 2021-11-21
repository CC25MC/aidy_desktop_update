import {Icon} from "../Icon";
					import { BoxIconSvg } from './BoxIconSvg';

					export const BoxIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {BoxIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
