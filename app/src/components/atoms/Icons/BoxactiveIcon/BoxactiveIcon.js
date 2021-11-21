import {Icon} from "../Icon";
					import { BoxactiveIconSvg } from './BoxactiveIconSvg';

					export const BoxactiveIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {BoxactiveIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
