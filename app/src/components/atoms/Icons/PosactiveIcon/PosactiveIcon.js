import {Icon} from "../Icon";
					import { PosactiveIconSvg } from './PosactiveIconSvg';

					export const PosactiveIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {PosactiveIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
