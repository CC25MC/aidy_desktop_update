import {Icon} from "../Icon";
					import { CannedIconSvg } from './CannedIconSvg';

					export const CannedIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {CannedIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
