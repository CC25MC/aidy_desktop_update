import {Icon} from "../Icon";
					import { PiggybankIconSvg } from './PiggybankIconSvg';

					export const PiggybankIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {PiggybankIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
